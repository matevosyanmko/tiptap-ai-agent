"use client";
import React, { forwardRef, useState } from "react";
import { Box, Paper } from "@mui/material";
import { UserMessageProvider } from "../../context/UserMessageContext";
import { AiAgentContextProvider } from "../../context/AiAgentContext";
import AgentChat, { AgentChatProps } from "./AgentChat";
import TiptapEditor, { TiptapEditorProps } from "../TiptapEditor";
import { EditorType, TiptapEditorRef } from "../../types/editor";
import { TIPTAP_AI_AGENT_EXTENSIONS } from "../../extensions/aiAgent";
import styles from "./tiptapAiAgent.module.css";

interface TiptapAiAgentProps {
  editorProps?: Omit<
    TiptapEditorProps,
    | "extensions"
    | "onCreate"
    | "onDestroy"
    | "onTransaction"
    | "containerClassName"
  >;
  agentChatProps?: AgentChatProps;
  height?: number | string;
}

const TiptapAiAgent = forwardRef<TiptapEditorRef, TiptapAiAgentProps>(
  (props, ref) => {
    const { editorProps, agentChatProps, height } = props;
    const [editor, setEditor] = useState<EditorType>(null);

    // dynamically create editor, provider and aiAgentExtension for each agent
    const onEditorCreate = (editor: NonNullable<EditorType>) => {
      setEditor(editor);
    };

    // destroy editor, provider and aiAgentExtension
    const onEditorDestroy = () => {
      setEditor(null);
    };

    return (
      <UserMessageProvider>
        <AiAgentContextProvider editor={editor}>
          <Box display="flex" gap={2} height={height || 400} p={4}>
            <Paper
              className="flex-shrink-0 overflow-hidden h-full"
              elevation={4}
            >
              <AgentChat {...agentChatProps} />
            </Paper>
            <Paper
              className="flex-shrink-0 overflow-hidden h-full flex-1"
              elevation={4}
            >
              <TiptapEditor
                {...editorProps}
                extensions={TIPTAP_AI_AGENT_EXTENSIONS}
                ref={ref}
                onCreate={(props) => onEditorCreate(props.editor)}
                onDestroy={() => onEditorDestroy()}
                editorClassName={styles.tiptapAiAgent}
              />
            </Paper>
          </Box>
        </AiAgentContextProvider>
      </UserMessageProvider>
    );
  }
);

TiptapAiAgent.displayName = "TiptapAiAgent";

export default TiptapAiAgent;
