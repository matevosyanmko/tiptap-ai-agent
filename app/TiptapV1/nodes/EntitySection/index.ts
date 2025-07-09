import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import EntitySection from "./EntitySection";
import { ENTITY_SECTION_NODE } from "../../constants/nodes";
import { EditorType } from "../../types/editor";
import { ResolvedPos } from "@tiptap/pm/model";

/**
 * Checks if the current cursor position ($anchor) is within an EntitySection node
 * by traversing up the node tree from the current depth
 */
const isAnchorInEntitySelection = ($anchor: ResolvedPos) => {
  const depth = $anchor.depth;
  let isInEntitySection = false;

  for (let d = depth; d > 0; d--) {
    const node = $anchor.node(d);
    if (node.type.name === ENTITY_SECTION_NODE) {
      isInEntitySection = true;
      break;
    }
  }

  return isInEntitySection;
};

/**
 * Handles Cmd/Ctrl+A shortcut within entity sections
 * If cursor is inside an entity section, selects the entire section
 * Returns true to prevent default behavior
 */
const handleCommandAShortcut = (editor: EditorType) => {
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

  addAttributes() {
    return {
      title: {
        default: "",
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
