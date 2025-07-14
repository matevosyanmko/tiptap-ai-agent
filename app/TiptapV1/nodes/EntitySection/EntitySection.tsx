import type { ReactNodeViewProps } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import CollapsibleContent from "./CollapsibleContent";
import { focusLastParagraphOfEntitySection } from "../../utils/view";

const EntitySection = (props: ReactNodeViewProps<HTMLLabelElement>) => {
  const { node, updateAttributes } = props;
  const { attrs } = node;
  const isCollapsed = attrs.isCollapsed;
  const title = attrs.title;

  const onCollapseToggle = (value?: boolean) => {
    const newValue = value || !isCollapsed;
    updateAttributes({ isCollapsed: newValue });

    if (newValue) {
      props.editor.commands.blur();
    } else {
      focusLastParagraphOfEntitySection(props);
    }
  };

  return (
    <NodeViewWrapper>
      <CollapsibleContent
        title={title}
        collapseProps={{ in: !isCollapsed, onCollapseToggle }}
      >
        <NodeViewContent />
      </CollapsibleContent>
    </NodeViewWrapper>
  );
};

export default EntitySection;
