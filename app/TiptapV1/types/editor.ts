import { BoxProps } from "@mui/material";
import {
  Editor,
  AnyExtension,
  Content,
  useEditor,
  EditorEvents,
} from "@tiptap/react";

export type EditorType = Editor | null;
export type ExtensionType = AnyExtension;

export interface TiptapEditorRef {
  editor: ReturnType<typeof useEditor> | null;
}

export interface TiptapEditorLifecycleProps {
  onCreate?: (props: EditorEvents["create"]) => void;
  onDestroy?: (props: EditorEvents["destroy"]) => void;
  onTransaction?: (props: EditorEvents["transaction"]) => void;
}

export interface TiptapEditorContentProps {
  extensions?: ExtensionType[];
  initialContent?: Content;
  placeholder?: string;
  editable?: boolean;
}

export interface TiptapEditorStyleProps {
  containerClassName?: string;
  editorClassName?: string;
  height?: BoxProps["height"];
}
