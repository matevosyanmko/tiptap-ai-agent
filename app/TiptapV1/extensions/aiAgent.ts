import AiAgent from "@tiptap-pro/extension-ai-agent";
import { Decoration } from "@tiptap/pm/view";
import AiChanges from "@tiptap-pro/extension-ai-changes";
import Focus from "@tiptap/extension-focus";

import { aiAgentProvider } from "../context/AiAgentContext";
import EntitySectionNode from "../nodes/EntitySection";
import { ExtensionType } from "../types/editor";

const FocusExtension = Focus.configure({
  className: "bg-gray-200",
  mode: "deepest",
});

const AiAgentExtension = AiAgent.configure({
  provider: aiAgentProvider,
});

const AiChangesExtension = AiChanges.configure({
  getCustomDecorations({ getDefaultDecorations }) {
    const decorations = getDefaultDecorations();
    return decorations;
  },
});

export const TIPTAP_AI_AGENT_EXTENSIONS: ExtensionType[] = [
  AiChangesExtension,
  AiAgentExtension,
  FocusExtension,
  EntitySectionNode,
];
