import { useContext } from "react";
import { AiAgentContext } from "../context/AiAgentContext";

/**
 * Custom hook to access the AiAgentContext value.
 *
 * @returns The context value containing the AiAgentProvider and Editor instances.
 * @throws {Error} If used outside of an AiAgentContextProvider.
 */
export function useAiAgentProvider() {
  const context = useContext(AiAgentContext);

  if (!context) {
    throw new Error(
      "useAiAgentProvider must be used within AiAgentContextProvider"
    );
  }
  return context;
}
