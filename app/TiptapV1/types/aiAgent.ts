import {
  AiAgentProvider,
  AiAgentProviderState,
  ChatMessage,
} from "@tiptap-pro/extension-ai-agent";

export type ChatMessageStatusType = AiAgentProviderState["status"];
export type ChatMessageType = ChatMessage;
export type ChatMessageAutoAcceptType = AiAgentProviderState["autoAccept"];
export type AiAgentProviderType = AiAgentProvider | null;
