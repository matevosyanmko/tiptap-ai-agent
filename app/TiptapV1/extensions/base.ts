import { StarterKit } from "@tiptap/starter-kit";
import { ExtensionType } from "../types/editor";

const StarterKitExtension = StarterKit.configure({
  heading: false,
  bold: false,
  italic: false,
  strike: false,
  code: false,
  blockquote: false,
  codeBlock: false,
  horizontalRule: false,
  gapcursor: false,
});

export const TIPTAP_BASE_EXTENSIONS: ExtensionType[] = [StarterKitExtension];
