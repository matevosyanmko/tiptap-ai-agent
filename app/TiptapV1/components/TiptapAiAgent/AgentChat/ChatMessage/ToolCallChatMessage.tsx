import BaseChatMessage from "./BaseChatMessage";
import MessageIcon from "@mui/icons-material/Message";

interface ToolCallChatMessageProps {
  name: string;
}

const ToolCallChatMessage = (props: ToolCallChatMessageProps) => {
  const { name } = props;

  const toolTextMap = {
    read_first_chunk: "Document read",
    read_next_chunk: "Document read",
    read_previous_chunk: "Document read",
    replace_document: "Document edited",
    apply_diff: "Document edited",
    plan: "Action plan updated",
    finish_with_summary: "Final changes ready for review",
  };

  return (
    <BaseChatMessage
      iconNode={<MessageIcon />}
      message={toolTextMap[name as keyof typeof toolTextMap]}
      align="left"
    />
  );
};

export default ToolCallChatMessage;
