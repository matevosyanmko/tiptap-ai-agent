import BoltIcon from "@mui/icons-material/Bolt";
import BaseChatMessage, { BaseChatMessageProps } from "./BaseChatMessage";

const AiChatMessage = (props: BaseChatMessageProps) => {
  return (
    <BaseChatMessage
      {...props}
      className="bg-action-background"
      iconNode={<BoltIcon />}
    />
  );
};

export default AiChatMessage;
