import PersonIcon from "@mui/icons-material/Person";
import BaseChatMessage, { BaseChatMessageProps } from "./BaseChatMessage";

const UserChatMessage = (props: BaseChatMessageProps) => {
  return (
    <BaseChatMessage
      {...props}
      className="bg-action-default"
      iconNode={<PersonIcon />}
    />
  );
};

export default UserChatMessage;
