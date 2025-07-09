import { Box, Button, ButtonGroup, Dialog, Stack } from "@mui/material";
import classNames from "classnames";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import AutoAcceptToggle from "../AutoAcceptToggle";
import { ConfirmChanges } from "../ConfirmChanges";
import { useAiAgentProviderState } from "@/app/TiptapV1/hooks/useAiAgentProviderState";
import { useState } from "react";
import UpdateSystemPromptDialog from "../UpdateSystemPromptDialog";
import UpdateTokenDialog from "../UpdateTokenDialog";

export interface AgentChatProps {
  className?: string;
}

const AgentChat = (props: AgentChatProps) => {
  const { className } = props;
  const [systemPromptDialogOpen, setSystemPromptDialogOpen] = useState(false);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);

  const status = useAiAgentProviderState((state) => state.status);

  return (
    <Stack
      className={classNames(className, "flex flex-col flex-shrink-0 h-full")}
    >
      <Box className="sticky top-0 bg-white py-5 px-4 z-10 border-b-indigo-100 border-solid border-b-2 flex justify-between">
        <AutoAcceptToggle />
        <ButtonGroup size="small" variant="text" className="whitespace-nowrap">
          <Button
            onClick={() => setSystemPromptDialogOpen(true)}
            className="text-xs"
          >
            System Prompt
          </Button>
          <Button onClick={() => setTokenDialogOpen(true)} className="text-xs">
            Update Token
          </Button>
        </ButtonGroup>
      </Box>

      <Box className="h-full overflow-hidden">
        <ChatHistory />
      </Box>

      <Box className="sticky bottom-0 px-4 pb-2 z-10 bg-white">
        {status === "reviewingToolCall" && <ConfirmChanges />}
        <ChatInput />
      </Box>

      <UpdateSystemPromptDialog
        open={systemPromptDialogOpen}
        onClose={() => setSystemPromptDialogOpen(false)}
        onConfirm={(prompt) => {
          localStorage.setItem("systemPrompt", prompt);
          window.location.reload();
        }}
      />
      <UpdateTokenDialog
        open={tokenDialogOpen}
        onClose={() => setTokenDialogOpen(false)}
        onConfirm={(token) => {
          localStorage.setItem("tiptapToken", token);
          window.location.reload();
        }}
      />
    </Stack>
  );
};

export default AgentChat;
