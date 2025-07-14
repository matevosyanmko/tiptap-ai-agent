import { Box, Stack } from "@mui/material";
import classNames from "classnames";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import AutoAcceptToggle from "../AutoAcceptToggle";
import { ConfirmChanges } from "../ConfirmChanges";
import { useAiAgentProviderState } from "@/app/TiptapV1/hooks/useAiAgentProviderState";

export interface AgentChatProps {
  className?: string;
}

const AgentChat = (props: AgentChatProps) => {
  const { className } = props;
  const status = useAiAgentProviderState((state) => state.status);

  return (
    <Stack
      className={classNames(className, "flex flex-col flex-shrink-0 h-full")}
    >
      <Box className="sticky top-0 bg-white py-5 px-4 z-10 border-b-indigo-100 border-solid border-b-2 flex justify-between">
        <AutoAcceptToggle />
      </Box>

      <Box className="h-full overflow-hidden">
        <ChatHistory />
      </Box>

      <Box className="sticky bottom-0 px-4 pb-2 z-10 bg-white">
        {status === "reviewingToolCall" && <ConfirmChanges />}
        <ChatInput />
      </Box>
    </Stack>
  );
};

export default AgentChat;
