import { Node, ResolvedPos } from "@tiptap/pm/model";
import { ENTITY_SECTION_NODE } from "../constants/nodes";
import { EditorType } from "../types/editor";

/**
 * Checks if the current cursor position ($anchor) is within an EntitySection node
 * by traversing up the node tree from the current depth
 */
export const isAnchorInEntitySelection = ($anchor: ResolvedPos) => {
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
 * Finds all nodes with the specified node type name in the editor document
 * Returns an array of positions and nodes where these nodes are located
 */
export const findAllNodesWithName = (
  editor: EditorType,
  nodeName: string
): { node: Node; pos: number }[] => {
  const results: { node: Node; pos: number }[] = [];

  editor?.state.doc.descendants((node, pos) => {
    if (node.type.name === nodeName) {
      results.push({ node, pos });
    }
  });

  return results;
};
