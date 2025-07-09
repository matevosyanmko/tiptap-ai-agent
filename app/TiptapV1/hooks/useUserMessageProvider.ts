import { useContext } from "react";
import { UserMessageContext } from "../context/UserMessageContext";

/**
 * Custom hook to access the UserMessageContext value.
 *
 * @returns The context value containing the user message state and setter.
 * @throws {Error} If used outside of a UserMessageProvider.
 */
export function useUserMessageProvider() {
  const context = useContext(UserMessageContext);

  if (!context) {
    throw new Error(
      "useUserMessageProvider must be used within UserMessageProvider"
    );
  }
  return context;
}
