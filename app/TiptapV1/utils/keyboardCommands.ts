import { EditorType } from "../types/editor";
import { isAnchorInEntitySelection } from "./content";

/**
 * Handles Cmd/Ctrl+A shortcut within entity sections
 * If cursor is inside an entity section, selects the entire section
 * Returns true to prevent default behavior
 */
export const handleCommandAShortcut = (editor: EditorType) => {
    if (!editor) return false;
  
    const $anchor = editor.state.selection.$anchor;
  
    if (isAnchorInEntitySelection($anchor)) {
      const pos = $anchor.pos;
      const resolvedPos = editor.state.doc.resolve(pos);
  
      editor.commands.setTextSelection({
        from: resolvedPos.start(),
        to: resolvedPos.end(),
      });
    }
    return true;
  };