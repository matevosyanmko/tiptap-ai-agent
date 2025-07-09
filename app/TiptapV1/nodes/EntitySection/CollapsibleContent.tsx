import {
  Box,
  Button,
  Collapse,
  CollapseProps,
  Typography,
} from "@mui/material";
import { UnfoldLess } from "@mui/icons-material";
import { MouseEvent, PropsWithChildren } from "react";

interface CollapsibleContentProps extends PropsWithChildren {
  title: string;
  collapseProps?: CollapseProps & {
    onCollapseToggle?: (value?: boolean) => void;
  };
}

const CollapsibleContent = (props: CollapsibleContentProps) => {
  const { title, children, collapseProps } = props;

  const { onCollapseToggle, ...restCollapseProps } = collapseProps || {};

  const handleCollapseToggle = (e: MouseEvent) => {
    onCollapseToggle?.();
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Box
      sx={{ border: "1px solid black", borderRadius: 2, overflow: "hidden" }}
      className="p-2 bg-gray-100"
    >
      <div
        onMouseDown={handleCollapseToggle}
        className="cursor-pointer flex justify-between"
        contentEditable={false}
      >
        <Typography>{title}</Typography>
        <Button
          endIcon={<UnfoldLess />}
          size="small"
          onMouseDown={handleCollapseToggle}
        />
      </div>
      <Collapse {...restCollapseProps}>{children}</Collapse>
    </Box>
  );
};

export default CollapsibleContent;
