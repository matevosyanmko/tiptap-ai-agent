"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { AI_AGENT_SYSTEM_PROMPT } from "@/app/TiptapV1/constants/prompt";

interface UpdateSystemPromptDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (prompt: string) => void;
}

const UpdateSystemPromptDialog = (props: UpdateSystemPromptDialogProps) => {
  const { open, onClose, onConfirm } = props;

  const [prompt, setPrompt] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("systemPrompt") || AI_AGENT_SYSTEM_PROMPT;
    }
    return "";
  });

  const handleConfirm = () => {
    onConfirm(prompt);
    onClose();
  };

  const handleReset = () => {
    onConfirm(AI_AGENT_SYSTEM_PROMPT);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update System Prompt</DialogTitle>
      <DialogContent>
        <TextField
          minRows={20}
          autoFocus
          margin="dense"
          label="System Prompt"
          fullWidth
          multiline
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Box className="flex gap-2 justify-between w-full">
          <Box>
            <Button onClick={handleReset}>Reset To Default</Button>
          </Box>

          <Box>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleConfirm} variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSystemPromptDialog;
