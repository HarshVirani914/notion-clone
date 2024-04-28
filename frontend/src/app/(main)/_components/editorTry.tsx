"use client";
import { useCreateDocumentMutation } from "@/store/features/document";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function EditorTry() {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const user = useSelector((state: any) => state?.auth.user.user);

  console.log("user", user);

  const [createDocuemnt, { data, error, isLoading }] =
    useCreateDocumentMutation();

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  const handleSubmit = async (payload: Block[]) => {
    await createDocuemnt({ id: user._id, document: payload });
  };

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToStorage(editor.document);
        handleSubmit(editor.document);
      }}
    />
  );
}
