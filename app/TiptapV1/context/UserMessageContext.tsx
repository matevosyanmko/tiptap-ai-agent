import { createContext, useState, PropsWithChildren } from "react";

type UserMessageProviderProps = PropsWithChildren;

/**
 * Context for providing the user message state and setter function.
 */
export const UserMessageContext = createContext<{
  message: string;
  setMessage: (message: string) => void;
}>({
  message: "",
  setMessage: () => {},
});

/**
 * Provides the state and setter function for the user's chat message throughout the React component tree.
 *
 * @param props - The component props.
 * @param props.children - The child components.
 */
export function UserMessageProvider({ children }: UserMessageProviderProps) {
  const [message, setMessage] = useState("");

  return (
    <UserMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </UserMessageContext.Provider>
  );
}
