"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface UpdateTokenDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (token: string) => void;
}

const UpdateTokenDialog = (props: UpdateTokenDialogProps) => {
  const { open, onClose, onConfirm } = props;

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tiptapToken") || "";
    }
    return "";
  });

  const handleConfirm = () => {
    onConfirm(token);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Token</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Token"
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTokenDialog;
