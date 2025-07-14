import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import EntitySection from "./EntitySection";
import { ENTITY_SECTION_NODE } from "../../constants/nodes";
import { EditorType } from "../../types/editor";
import { handleCommandAShortcut } from "../../utils/keyboardCommands";

/**
 * Prevents deletion of EntitySection nodes
 * Returns true to prevent default deletion behavior
 */
const preventDeletion = (editor: EditorType) => {
  if (!editor) return false;
  const isNodeActive = editor.isActive(ENTITY_SECTION_NODE);

  const isSelectionActive =
    editor.state.selection.$anchor.node().type.name === "doc";

  return isNodeActive && isSelectionActive;
};

const EntitySectionNode = Node.create({
  name: ENTITY_SECTION_NODE,
  group: "block",
  content: "block+",
  isolating: true,
  atom: true,
  selectable: true,
  defining: true,

  addAttributes() {
    return {
      title: {
        default: "",
        isRequired: true,
        keepOnSplit: true,
      },
      isCollapsed: {
        default: true,
        isRequired: true,
        keepOnSplit: true,
      },
    };
  },

  parseHTML() {
    return [{ tag: ENTITY_SECTION_NODE }];
  },

  renderHTML({ HTMLAttributes }) {
    return [ENTITY_SECTION_NODE, mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EntitySection);
  },

  addKeyboardShortcuts() {
    return {
      "Mod-a": () => handleCommandAShortcut(this.editor),
      Backspace: () => preventDeletion(this.editor),
      Delete: () => preventDeletion(this.editor),
      "Mod-Delete": () => preventDeletion(this.editor),
      "Mod-Backspace": () => preventDeletion(this.editor),
    };
  },
});

export default EntitySectionNode;
