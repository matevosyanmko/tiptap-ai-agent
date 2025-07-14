import { useAiAgentProvider } from "@/app/TiptapV1/hooks/useAiAgentProvider";
import { useToolCall } from "@/app/TiptapV1/hooks/useToolCall";
import { Button, Stack, Typography } from "@mui/material";

/**
 * A component that displays when the AI agent proposes an action (tool call) and requires user confirmation.
 * It shows what the AI agent wants to do and provides buttons to accept or reject the action.
 */

export function ConfirmChanges() {
  const { provider, editor } = useAiAgentProvider();
  const toolCall = useToolCall();

  const onAccept = () => {
    editor?.commands.setShowAiChanges(false);
    provider?.acceptToolCall();
    provider?.run();
  };

  const onReject = () => {
    editor?.commands.setShowAiChanges(false);
    provider?.rejectToolCall();
  };

  if (!provider) {
    return null;
  }

  if (!toolCall) {
    return (
      <div className="confirmation-chat-message">
        <div className="label">The AI Agent called an unknown tool.</div>
      </div>
    );
  }

  return (
    <Stack alignItems="center" bgcolor="action.selected" p={1}>
      <Typography variant="body2" mb={1}>
        💡 Changes suggested
      </Typography>

      <Stack direction="row" gap={1}>
        <Button
          size="small"
          color="error"
          className="button destructive"
          type="button"
          onClick={onReject}
        >
          Reject
        </Button>
        <Button
          size="small"
          color="primary"
          className="button primary"
          type="button"
          onClick={onAccept}
        >
          Accept all
        </Button>
      </Stack>
    </Stack>
  );
}
