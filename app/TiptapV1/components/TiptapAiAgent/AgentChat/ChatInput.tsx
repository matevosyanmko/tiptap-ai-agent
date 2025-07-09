import { Box, CircularProgress, IconButton, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useMemo } from "react";
import { UserMessageContext } from "../../../context/UserMessageContext";
import { useAiAgentProvider } from "../../../hooks/useAiAgentProvider";
import { useAiAgentProviderState } from "@/app/TiptapV1/hooks/useAiAgentProviderState";

const ChatInput = () => {
  const { message, setMessage } = useContext(UserMessageContext);
  const { provider } = useAiAgentProvider();
  const loading = useAiAgentProviderState(
    (state) => state.status === "loading"
  );

  const isValidMessage = useMemo(() => {
    return message.trim() !== "";
  }, [message]);

  const onSubmit = () => {
    setMessage("");
    provider?.addUserMessage(message);
    provider?.run();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValidMessage && !loading) {
      onSubmit();
    }
  };

  return (
    <Box flexShrink={0}>
      <Box
        display="flex"
        alignItems="center"
        borderRadius={1}
        border="1px solid"
        borderColor="divider"
        overflow="hidden"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disableUnderline
          fullWidth
          className="px-2 h-14"
          placeholder="Type your message here..."
          onKeyDown={handleKeyDown}
        />

        <IconButton
          sx={{ color: "primary.main" }}
          disabled={!isValidMessage}
          onClick={onSubmit}
        >
          {loading ? <CircularProgress size={20} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
