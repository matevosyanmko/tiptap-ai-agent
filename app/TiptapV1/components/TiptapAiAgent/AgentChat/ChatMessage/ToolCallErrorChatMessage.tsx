import BaseChatMessage from "./BaseChatMessage";
import CancelIcon from "@mui/icons-material/Cancel";

interface ToolCallErrorChatMessageProps {
  name: string;
}

const ToolCallErrorChatMessage = (props: ToolCallErrorChatMessageProps) => {
  const { name } = props;

  const toolErrorTextMap = {
    read_first_chunk: "Error reading document",
    read_next_chunk: "Error reading document",
    read_previous_chunk: "Error reading document",
    replace_document: "Error editing document",
    apply_diff: "Error editing document",
    plan: "Error updating action plan",
    finish_with_summary: "Error presenting final changes",
  };

  return (
    <BaseChatMessage
      iconNode={<CancelIcon />}
      message={toolErrorTextMap[name as keyof typeof toolErrorTextMap]}
      align="left"
    />
  );
};

export default ToolCallErrorChatMessage;
