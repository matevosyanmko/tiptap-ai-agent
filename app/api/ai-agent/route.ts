"use server";

import {
  AiAgentToolkit,
  openaiChatCompletionsAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chatMessages, schemaAwarenessData, systemPrompt } = body;

    const toolkit = new AiAgentToolkit({
      adapter: openaiChatCompletionsAdapter,
      schemaAwarenessData,
    });

    const formatter = new ChatMessagesFormatter({
      // Get the chat messages from the request body
      initialMessages: chatMessages,
      adapter: openaiChatCompletionsAdapter,
    });

    console.log("toolkit.getSystemPrompt()", toolkit.getSystemPrompt());

    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call the OpenAI Chat Completions API
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
        },
        ...formatter.format(),
      ],
      // Provide the tools that the AI model can call
      tools: toolkit.format(),
    });
    // Convert the response to the format expected by the AI Agent extension
    formatter.addAiResponse(response);

    return NextResponse.json(formatter.getResolverResponse());
  } catch (error) {
    console.error("AI Agent API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "AI Agent API is running" });
}
