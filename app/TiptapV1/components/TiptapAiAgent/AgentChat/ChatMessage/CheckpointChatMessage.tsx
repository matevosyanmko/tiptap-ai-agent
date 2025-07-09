import { useAiAgentProvider } from "@/app/TiptapV1/hooks/useAiAgentProvider";
import { ChatMessageType } from "@/app/TiptapV1/types/aiAgent";
import BaseChatMessage from "./BaseChatMessage";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CheckpointChatMessage as CheckpointChatMessageType } from "@tiptap-pro/extension-ai-agent";

interface CheckpointChatMessageProps {
  message: Extract<ChatMessageType, CheckpointChatMessageType>;
}

export function CheckpointChatMessage({ message }: CheckpointChatMessageProps) {
  const { provider } = useAiAgentProvider();

  return (
    <BaseChatMessage
      message="Checkpoint set"
      align="left"
      className="bg-primary-lighter"
      iconNode={<CheckCircleIcon />}
      actionNode={
        <Button
          size="small"
          onClick={() => provider?.restoreCheckpoint(message.checkpoint)}
        >
          Restore
        </Button>
      }
    />
  );
}
