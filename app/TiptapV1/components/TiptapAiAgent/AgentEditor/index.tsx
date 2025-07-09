import TiptapEditor, {
  TiptapEditorProps,
} from "../../TiptapEditor";
import { TiptapEditorRef } from "../../../types/editor";
import { Paper } from "@mui/material";
import { forwardRef } from "react";
import { TIPTAP_AI_AGENT_EXTENSIONS } from "../../../extensions/aiAgent";

interface AgentEditorProps extends TiptapEditorProps {
  ref?: React.RefObject<TiptapEditorRef>;
  index: number;
}

const AgentEditor = forwardRef<TiptapEditorRef, AgentEditorProps>(
  (props, ref) => {
    return (
      <Paper className="flex-1" elevation={3} sx={{ border: "1px solid red" }}>
        <TiptapEditor
          ref={ref}
          containerClassName="h-full"
          {...props}
          extensions={TIPTAP_AI_AGENT_EXTENSIONS}
        />
      </Paper>
    );
  }
);

AgentEditor.displayName = "AgentEditor";

export default AgentEditor;
