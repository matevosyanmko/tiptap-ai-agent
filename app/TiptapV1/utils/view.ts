import { ENTITY_SECTION_NODE } from "../constants/nodes";
import { findAllNodesWithName } from "./content";
import { EditorType } from "../types/editor";
import { ReactNodeViewProps } from "@tiptap/react";

/**
 * Updates the collapsed state of all entity sections in the editor
 * by finding all entity section nodes and setting their isCollapsed attribute
 */
export const toggleEntitySectionsCollapsed = (
  editor: EditorType,
  isCollapsed?: boolean
) => {
  if (!editor) return;
  const { state, view } = editor;
  const { tr } = state;
  const entitySectionNodes = findAllNodesWithName(editor, ENTITY_SECTION_NODE);

  entitySectionNodes.forEach(({ pos }) => {
    const node = state.doc.nodeAt(pos);
    const finalIsCollapsed = isCollapsed ?? !node?.attrs.isCollapsed;

    if (node) {
      tr.setNodeMarkup(pos, null, {
        ...node.attrs,
        isCollapsed: finalIsCollapsed,
      });
    }
  });
  view.dispatch(tr);
};

/**
 * Focuses the cursor on the last paragraph within an entity section node.
 * Takes ReactNodeViewProps and traverses the node's descendants to find
 * and focus the last paragraph element.
 */
export const focusLastParagraphOfEntitySection = (
  props: ReactNodeViewProps<HTMLLabelElement>
) => {
  const nodePos = props.getPos();
  if (typeof nodePos === "number") {
    const node = props.editor.state.doc.nodeAt(nodePos);

    if (node) {
      // Find last child paragraph
      let lastParagraphPos = -1;
      node.descendants((child, pos) => {
        if (child.type.name === "paragraph") {
          lastParagraphPos = nodePos + pos + child.nodeSize;
        }
      });

      if (lastParagraphPos >= 0) {
        props.editor.commands.focus(lastParagraphPos);
      }
    }
  }
};
