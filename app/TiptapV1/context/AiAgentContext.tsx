import { createContext, PropsWithChildren } from "react";
import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { AiAgentProviderType } from "../types/aiAgent";
import { EditorType } from "../types/editor";
import { AI_AGENT_SYSTEM_PROMPT } from "../constants/prompt";

// initialize the ai agent provider
export const aiAgentProvider = new AiAgentProvider({
  appId: process.env.NEXT_PUBLIC_TIPTAP_APP_ID!,
  token: process.env.NEXT_PUBLIC_TIPTAP_TOKEN!,
  autoAccept: "onlyRead",
  useAiChangesExtension: true,
  systemPrompt: AI_AGENT_SYSTEM_PROMPT,
  // resolver: async (options) => {
  //   const messages = options.llmMessages;
  //   const response =
  //     await proxyClientTrpc.tiptap.aiAgentSendMessage.mutate(messages);
  //   const result = openaiChatCompletionsAdapter.parseResponse(response.data);
  //   return result;
  // },
});

/**
 * Context for providing the AiAgentProvider and Editor instances.
 */
export const AiAgentContext = createContext<{
  provider: AiAgentProviderType;
  editor: EditorType;
}>({
  provider: null,
  editor: null,
});

interface AiAgentContextProviderProps extends PropsWithChildren {
  editor: EditorType;
}

/**
 * Provides access to the AiAgentProvider instance and Editor instance throughout the React component tree.
 *
 * @param props - The component props.
 * @param props.children - The child components.
 * @param props.provider - The AiAgentProvider instance.
 * @param props.editor - The Tiptap Editor instance.
 */
export function AiAgentContextProvider(props: AiAgentContextProviderProps) {
  const { children, editor } = props;

  return (
    <AiAgentContext.Provider value={{ provider: aiAgentProvider, editor }}>
      {children}
    </AiAgentContext.Provider>
  );
}
