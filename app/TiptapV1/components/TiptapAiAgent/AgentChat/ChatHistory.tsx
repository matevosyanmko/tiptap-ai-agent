import { Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAiAgentProviderState } from "@/app/TiptapV1/hooks/useAiAgentProviderState";
import ChatMessage from "./ChatMessage";

const ChatHistory = () => {
  const chatMessages = useAiAgentProviderState((state) => state.chatMessages);
  const status = useAiAgentProviderState((state) => state.status);
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Scrolls the chat messages to the bottom when new messages are added or the status changes.
   */
  useEffect(() => {
    if (scrollRef.current && chatMessages?.length > 0) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, status]);

  return (
    <Stack
      gap={2}
      flex={1}
      ref={scrollRef}
      className="overflow-y-auto py-2 h-full px-4"
    >
      {chatMessages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </Stack>
  );
};

export default ChatHistory;
