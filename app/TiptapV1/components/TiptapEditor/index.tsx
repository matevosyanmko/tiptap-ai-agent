"use client";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import classNames from "classnames";
import {
  TiptapEditorRef,
  TiptapEditorContentProps,
  TiptapEditorStyleProps,
  TiptapEditorLifecycleProps,
} from "../../types/editor";
import Placeholder from "@tiptap/extension-placeholder";
import styles from "./tiptap.module.css";
import { TIPTAP_BASE_EXTENSIONS } from "../../extensions/base";

export type TiptapEditorProps = TiptapEditorContentProps &
  TiptapEditorStyleProps &
  TiptapEditorLifecycleProps;

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  function TiptapEditor(props, ref) {
    const {
      extensions = [],
      initialContent = "",
      containerClassName,
      editorClassName,
      placeholder,
      onCreate,
      onDestroy,
      onTransaction,
    } = props;

    // Expose editor instance to parent component through ref
    useImperativeHandle(ref, () => ({ editor }));

    const combinedExtensions = useMemo(() => {
      const placeholderExtension = Placeholder.configure({
        placeholder,
        emptyEditorClass: styles.tiptapPlaceholder,
      });

      return [...TIPTAP_BASE_EXTENSIONS, ...extensions, placeholderExtension];
    }, [extensions, placeholder]);

    const editor = useEditor({
      extensions: combinedExtensions,
      content: initialContent,
      onCreate,
      onDestroy,
      onTransaction,
      immediatelyRender: false,
      enableContentCheck: true,
      onContentError: (editor) => {
        console.error("onContentError", editor.error);
      },
      onUpdate: ({ editor }) => {
        console.log("onUpdate", editor.getJSON());
      },
    });

    // on container mouse down, focus the editor
    const handleContainerMouseDown = (
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      event.stopPropagation();
      editor?.commands.focus();
    };

    // console.group("TiptapEditor");
    // console.log("extensions", extensions);
    // console.log("combinedExtensions", combinedExtensions);
    // console.log("editor", editor?.extensionManager.extensions);
    // console.groupEnd();

    return (
      <Box
        className={classNames(
          "cursor-text p-4 overflow-y-auto h-full",
          containerClassName
        )}
        onMouseDown={handleContainerMouseDown}
      >
        <EditorContent
          editor={editor}
          className={classNames(styles.tiptapEditor, editorClassName)}
        />
      </Box>
    );
  }
);

export default TiptapEditor;
