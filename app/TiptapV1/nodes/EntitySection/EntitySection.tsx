import type { ReactNodeViewProps } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { useState } from "react";
import CollapsibleContent from "./CollapsibleContent";

const EntitySection = (props: ReactNodeViewProps<HTMLLabelElement>) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapseToggle = (value?: boolean) => {
    const newValue = value || !collapsed;
    setCollapsed(newValue);

    if (newValue) {
      props.editor.commands.blur();
    } else {
      // Find and focus the last paragraph inside this entity section
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
    }
  };

  return (
    <NodeViewWrapper>
      <CollapsibleContent
        title={props.node.attrs.title}
        collapseProps={{ in: !collapsed, onCollapseToggle }}
      >
        <NodeViewContent />
      </CollapsibleContent>
    </NodeViewWrapper>
  );
};

export default EntitySection;
