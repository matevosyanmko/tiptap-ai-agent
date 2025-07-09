import { useAiAgentProviderState } from "@/app/TiptapV1/hooks/useAiAgentProviderState";
import { useAiAgentProvider } from "@/app/TiptapV1/hooks/useAiAgentProvider";
import { FormControlLabel, Switch, Typography } from "@mui/material";

const AutoAcceptToggle = () => {
  const autoAccept = useAiAgentProviderState((state) => state.autoAccept);
  const { provider } = useAiAgentProvider();

  const onToggle = () => {
    if (!provider) return;

    if (provider.state.autoAccept === "always") {
      provider.setAutoAccept("onlyRead");
    } else {
      provider.setAutoAccept("always");
      if (provider.state.status === "reviewingToolCall") {
        provider.acceptToolCall();
        provider.run();
      }
    }
  };

  return (
    <FormControlLabel
      className="px-2 whitespace-nowrap"
      control={
        <Switch
          size="small"
          checked={autoAccept === "always"}
          onChange={onToggle}
        />
      }
      label={<Typography variant="body2">Auto Accept Changes</Typography>}
    />
  );
};

export default AutoAcceptToggle;
