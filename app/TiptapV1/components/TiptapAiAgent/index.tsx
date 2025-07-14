"use client";
import React, { forwardRef, useLayoutEffect, useState } from "react";
import { Box, Button, ButtonGroup, Divider, Paper } from "@mui/material";
import { UserMessageProvider } from "../../context/UserMessageContext";
import { AiAgentContextProvider } from "../../context/AiAgentContext";
import AgentChat, { AgentChatProps } from "./AgentChat";
import TiptapEditor, { TiptapEditorProps } from "../TiptapEditor";
import { EditorType, TiptapEditorRef } from "../../types/editor";
import { TIPTAP_AI_AGENT_EXTENSIONS } from "../../extensions/aiAgent";
import styles from "./tiptapAiAgent.module.css";
import UpdateTokenDialog from "./UpdateTokenDialog";
import UpdateSystemPromptDialog from "./UpdateSystemPromptDialog";
import { toggleEntitySectionsCollapsed } from "../../utils/view";
import { useAiAgentProvider } from "../../hooks/useAiAgentProvider";
import { useAiAgentProviderState } from "../../hooks/useAiAgentProviderState";
import classNames from "classnames";
import { JSONContent } from "@tiptap/core";
import EntitySectionNode from "../../nodes/EntitySection";

interface TiptapAiAgentProps {
  editorProps?: Omit<
    TiptapEditorProps,
    "extensions" | "onTransaction" | "containerClassName"
  >;
  agentChatProps?: AgentChatProps;
  height?: number | string;
}

const TiptapAiAgent = forwardRef<TiptapEditorRef, TiptapAiAgentProps>(
  (props, ref) => {
    const { editorProps, agentChatProps, height } = props;
    const { editor } = useAiAgentProvider();
    const status = useAiAgentProviderState((state) => state.status);
    const storage = editor?.extensionStorage.aiChanges;
    const aiChanges = storage?.getChanges();
    const previousDoc = storage?.getPreviousDoc();

    const showSplitView =
      status === "reviewingToolCall" && aiChanges?.length > 0;

    const [oldContent, setOldContent] = useState<JSONContent | null>(null);
    const [systemPromptDialogOpen, setSystemPromptDialogOpen] = useState(false);
    const [tokenDialogOpen, setTokenDialogOpen] = useState(false);

    // When transitioning from loading to reviewing tool call state,
    // expand all entity sections to show the changes
    useLayoutEffect(() => {
      if (!editor) {
        return;
      }

      if (showSplitView) {
        window.requestAnimationFrame(() => {
          toggleEntitySectionsCollapsed(editor, false);
        });

        const prevContent = previousDoc?.toJSON();
        if (prevContent?.content) {
          prevContent.content.forEach((node: JSONContent) => {
            if (node.type === EntitySectionNode.name) {
              node.attrs = { ...node.attrs, isCollapsed: false };
            }
          });
        }

        setOldContent(prevContent);
      }
    }, [showSplitView, editor, previousDoc]);

    console.group("TiptapAiAgent");
    console.log("previousDoc", previousDoc?.toJSON());
    console.groupEnd();

    return (
      <>
        <Box display="flex" gap={2} height={height || 400} p={4}>
          <Paper className="flex-shrink-0 overflow-hidden h-full" elevation={4}>
            <AgentChat {...agentChatProps} />
          </Paper>
          <Paper
            className="flex-shrink-0 overflow-hidden h-full flex-1 flex flex-col"
            elevation={4}
          >
            <Box className="p-4">
              <ButtonGroup variant="text" className="whitespace-nowrap">
                <Button
                  onClick={() => setSystemPromptDialogOpen(true)}
                  className="text-xs"
                >
                  Update System Prompt
                </Button>
                <Button
                  onClick={() => setTokenDialogOpen(true)}
                  className="text-xs"
                >
                  Update Token
                </Button>
                <Button
                  onClick={() => toggleEntitySectionsCollapsed(editor)}
                  className="text-xs"
                >
                  Toggle Sections
                </Button>
                <Button
                  onClick={() => {
                    editor?.commands.setShowAiChanges(true);
                  }}
                >
                  Show AI changes
                </Button>
                <Button
                  onClick={() => {
                    editor?.commands.setShowAiChanges(false);
                  }}
                >
                  Hide AI changes
                </Button>
              </ButtonGroup>
            </Box>
            <Divider />
            <Box className="flex-1 overflow-hidden flex">
              <Box
                className={classNames(
                  "w-0 overflow-hidden transition-all duration-300",
                  { "flex-1 overflow-auto bg-red-100": showSplitView }
                )}
              >
                {showSplitView && oldContent ? (
                  <TiptapEditor
                    editorClassName={styles.tiptapAiAgent}
                    initialContent={oldContent}
                    extensions={[EntitySectionNode]}
                    editable={false}
                  />
                ) : null}
              </Box>

              <Box
                className={classNames("flex-1 transition-all", {
                  "bg-green-100": showSplitView,
                })}
              >
                <TiptapEditor
                  {...editorProps}
                  extensions={TIPTAP_AI_AGENT_EXTENSIONS}
                  ref={ref}
                  editorClassName={styles.tiptapAiAgent}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
        <UpdateSystemPromptDialog
          open={systemPromptDialogOpen}
          onClose={() => setSystemPromptDialogOpen(false)}
          onConfirm={(prompt) => {
            localStorage.setItem("systemPrompt", prompt);
            window.location.reload();
          }}
        />
        <UpdateTokenDialog
          open={tokenDialogOpen}
          onClose={() => setTokenDialogOpen(false)}
          onConfirm={(token) => {
            localStorage.setItem("tiptapToken", token);
            window.location.reload();
          }}
        />
      </>
    );
  }
);

const TiptapAiAgentWrapper = (props: TiptapAiAgentProps) => {
  const [editor, setEditor] = useState<EditorType>(null);

  const onEditorCreate = (editor: EditorType) => {
    setEditor(editor);
  };

  const onEditorDestroy = () => {
    setEditor(null);
  };

  return (
    <UserMessageProvider>
      <AiAgentContextProvider editor={editor}>
        <TiptapAiAgent
          {...props}
          editorProps={{
            ...props.editorProps,
            onCreate: (props) => onEditorCreate(props.editor),
            onDestroy: onEditorDestroy,
          }}
        />
      </AiAgentContextProvider>
    </UserMessageProvider>
  );
};
TiptapAiAgent.displayName = "TiptapAiAgent";
TiptapAiAgentWrapper.displayName = "TiptapAiAgentWrapper";

export default TiptapAiAgentWrapper;
