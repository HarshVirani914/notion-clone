"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Share } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Cover } from "../note/Cover";
import { Publish } from "../note/Publish";
import { useUpdatePage } from "./hooks/useUpdatePage";
import Modal from "@/components/modals/Modal";
import { SharePage } from "../note";

interface EditorProps {
  pageId: string;
}

const Editor: React.FC<EditorProps> = ({ pageId }) => {
  const coverImage = useCoverImage();

  useEffect(() => {
    coverImage.setPageId(pageId);
  }, [pageId]);

  const { page, handleUpdatePage } = useUpdatePage(pageId || "");

  const [pageName, setPageName] = useState(page?.name || "");

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });

    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }

  const handleSubmit = async (payload: Block[]) => {
    return handleUpdatePage({
      id: page?._id,
      name: pageName,
      document: JSON.stringify(payload),
    });
  };

  const editor = useCreateBlockNote(
    {
      uploadFile,
      domAttributes: {
        // Adds a class to all `blockContainer` elements.
        block: {
          class: "hello-world-block",
        },
      },
      initialContent: page?.document
        ? JSON.parse(page?.document)
        : [
            {
              id: "1",
              type: "heading",
              content: "",
              props: { level: 1 },
            },
          ],
    },
    [page?.document]
  );

  useEffect(() => {
    if (page && pageName !== page.name) {
      handleUpdatePage({
        name: pageName,
      });
    }
  }, [pageName]);

  useEffect(() => {
    if (!pageName && page?.name) {
      setPageName(page.name);
    }
  }, [page?.name]);

  if (!page) {
    return "Page not found in your library. Please create a new page.";
  }

  function handleShare(event: any): void {
    event.preventDefault();
    setIsShareModalOpen(true);
  }

  return (
    <>
      <div className="editor-container w-full h-screen">
        <div className="flex flex-row justify-between items-center sticky w-full h-14 border border-b-gray-400">
          <div className="flex text-center content-center self-center">
            <p className="align-middle text-justify p-2">{pageName}</p>
          </div>
          <div className="flex gap-2">
            <Publish id={page._id} />
            <IconButton onClick={handleShare}>
              <Share />
            </IconButton>
          </div>
        </div>
        <Cover pageId={pageId!} preview url={page?.coverImage} />
        <div>
          <input
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="Untitled Page"
            className="w-10% p-2 rounded-md border-none focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <Button type="button" variant="contained" onClick={coverImage.onOpen}>
            add cover
          </Button>
        </div>
        <div className="">
          <BlockNoteView
            editor={editor}
            onChange={() => handleSubmit(editor.document)}
            data-changing-font-demo
          />
        </div>

        <Modal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        >
          <SharePage />
        </Modal>
      </div>
    </>
  );
};

export default Editor;
