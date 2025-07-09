"use client";
import TiptapAiAgent from "./TiptapV1/components/TiptapAiAgent";
import { Box } from "@mui/material";
import { INITIAL_CONTENT } from "./TiptapV1/constants/content";

export default function Home() {
  return (
    <Box className="w-full h-screen bg-gray-100">
      <TiptapAiAgent
        height="95vh"
        agentChatProps={{ className: "w-[500px] h-full " }}
        editorProps={{
          initialContent: INITIAL_CONTENT,
        }}
      />
    </Box>
  );
}
