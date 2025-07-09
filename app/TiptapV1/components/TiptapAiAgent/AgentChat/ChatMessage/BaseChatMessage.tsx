import { Box, Paper, Typography } from "@mui/material";
import classNames from "classnames";

export interface BaseChatMessageProps {
  message: string;
  align?: "left" | "right";
  className?: string;
  actionNode?: React.ReactNode;
  iconNode?: React.ReactNode;
}

const BaseChatMessage = (props: BaseChatMessageProps) => {
  const { message, className, align = "left", actionNode, iconNode } = props;

  return (
    <Box
      className={classNames("flex gap-1", {
        "justify-end": align === "right",
      })}
    >
      <Paper elevation={1} className="max-w-[80%] overflow-hidden">
        <Box
          className={classNames(
            "p-2 flex gap-3 items-center",
            className,
            align === "right" && "flex-row-reverse"
          )}
        >
          <Box className="flex justify-center items-center w-5 h-5">
            {iconNode}
          </Box>
          <Typography variant="body2" className="p-0 m-0">
            {message}
          </Typography>
          {actionNode}
        </Box>
      </Paper>
    </Box>
  );
};

export default BaseChatMessage;
