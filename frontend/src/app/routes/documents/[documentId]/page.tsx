"use client";
import { Navbar } from "@/app/(dashboard)/_components/navbar";
import MainLayout from "@/app/(dashboard)/layout";
import { fetchNoteById } from "@/redux_store/slices/notesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { documentId: string } }) {
  const singleDocument = useSelector((state) => state.notes.note);
  const dispatch = useDispatch();
  const documentId = params.documentId;
  useEffect(() => {
    dispatch(fetchNoteById(documentId));
    console.log("singleDocument : ", singleDocument);
  }, [dispatch, documentId]);

  console.log("single -----,", singleDocument);
  return (
    <>
      <MainLayout>
        <Navbar documentId={documentId} />
        <div className="relative">
          {/* Share button in the header */}

          {/* Title and Icon */}
          <div className="flex items-center justify-center mt-8">
            <h2 className="mr-2">{singleDocument.title}</h2>
            <img
              src={singleDocument.iconImage}
              alt="Icon"
              className="h-8 w-8"
            />
          </div>
          {/* Cover Image */}
          <img
            src={singleDocument.coverImageUrl}
            alt="Cover Image"
            className="w-full"
          />
        </div>
        {/* Description */}
        <div className="px-4 mt-4">
          <p>{singleDocument.description}</p>
        </div>
      </MainLayout>
    </>
  );
}
