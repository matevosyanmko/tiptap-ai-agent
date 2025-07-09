/**
 * Custom hook to find the last tool call message in the chat messages.
 *
 * @returns The last tool call message, or undefined if none is found.
 */

import { useAiAgentProviderState } from "./useAiAgentProviderState";

export function useToolCall() {
  return useAiAgentProviderState((state) =>
    state.chatMessages.findLast((message) => message.type === "toolCall")
  );
}
