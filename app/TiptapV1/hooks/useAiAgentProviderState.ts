import { useCallback, useEffect, useRef, useState } from "react";
import { useAiAgentProvider } from "./useAiAgentProvider";
import { AiAgentProviderState } from "@tiptap-pro/extension-ai-agent";

/**
 * Custom hook to access the state of the AiAgentProvider.
 *
 * @template T - The type of the selected state value
 * @param selector - A selector function to extract a specific part of the state.
 * @returns The selected part of the state or null if provider is not available.
 */

export function useAiAgentProviderState<T = AiAgentProviderState>(
  selector?: (state: AiAgentProviderState) => T
): T {
  const selectorRef = useRef(selector);
  const { provider } = useAiAgentProvider();

  const getValue = useCallback((): T | AiAgentProviderState | null => {
    if (!provider) {
      return null;
    }

    return selectorRef.current
      ? selectorRef.current(provider.state)
      : provider.state;
  }, [provider]);

  const [state, setState] = useState<T | AiAgentProviderState | null>(getValue);

  useEffect(() => {
    const callback = () => {
      setState(getValue());
    };

    if (provider) {
      provider.on("stateChange", callback);
      return () => provider.off("stateChange", callback);
    }
  }, [provider, getValue]);

  return state as T;
}
