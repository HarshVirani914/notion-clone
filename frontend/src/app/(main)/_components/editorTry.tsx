"use client";

import { useUpdatePage } from "@/app/routes/editor/hooks/useUpdatePage";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useSearchParams } from "next/navigation";

function EditorTry() {
  const searchParams = useSearchParams();

  const { page, handleCreatePage, isPageLoading } = useUpdatePage(
    searchParams.get("id") || ""
  );

  const handleSubmit = async (payload: Block[]) => {
    return handleCreatePage({
      id: page?._id,
      document: JSON.stringify(payload),
    });
  };

  const editor = useCreateBlockNote(
    {
      initialContent: page?.document
        ? JSON.parse(page?.document)
        : [
            {
              id: "1",
              type: "heading",
              content: "Untitled Page",
              props: { level: 1 },
            },
          ],
    },
    [page]
  );

  if (isPageLoading) {
    return "Loading content...";
  }

  if (!page) {
    return "Page not found in your library. Please create a new page.";
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => handleSubmit(editor.document)}
    />
  );
}

export default EditorTry;
