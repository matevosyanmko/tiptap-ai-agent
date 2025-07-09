import { ChatMessageType } from "@/app/TiptapV1/types/aiAgent";
import AiChatMessage from "./AiChatMessage";
import UserChatMessage from "./UserChatMessage";
import { CheckpointChatMessage } from "./CheckpointChatMessage";
import BaseChatMessage from "./BaseChatMessage";
import StickyNoteIcon from "@mui/icons-material/StickyNote2";
import ToolCallChatMessage from "./ToolCallChatMessage";
import ToolCallErrorChatMessage from "./ToolCallErrorChatMessage";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;

  switch (message.type) {
    case "ai":
      return <AiChatMessage message={message.text} align="left" />;
    case "user":
      return <UserChatMessage message={message.text} align="right" />;
    case "checkpoint":
      return <CheckpointChatMessage message={message} />;

    case "toolCall":
      switch (message.name) {
        case "plan":
          return (
            <BaseChatMessage
              message={`Plan: ${message.arguments.plan}`}
              align="left"
              iconNode={<StickyNoteIcon />}
            />
          );

        case "ask_user":
          return (
            <AiChatMessage
              message={`Ask User: ${message.arguments.question}`}
            />
          );
        case "finish_with_summary":
          return (
            <AiChatMessage message={`Summary: ${message.arguments.summary}`} />
          );

        default:
          return <ToolCallChatMessage name={message.name} />;
      }

    case "toolCallError":
      return <ToolCallErrorChatMessage name={message.name} />;

    default:
      return null;
  }
};

export default ChatMessage;
