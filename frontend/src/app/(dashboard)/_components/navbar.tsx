import { useEffect } from "react";

import { fetchNoteById } from "@/redux_store/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import ShareDocument from "./shareDocument";

export const Navbar = ({ documentId }: { documentId: string }) => {
  const singleDocument = useSelector((state) => state.notes.note);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNoteById(documentId));
  }, [dispatch, documentId]);

  return (
    <>
      <nav className="bg-white ml-9 justify-end dark:bg-gray-900 fixed w-[1310px] top-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex  flex-wrap justify-between mx-auto p-4">
          <img src={singleDocument.iconImage} alt="Icon" className="h-8 w-8" />
          <span className=" text-2xl font-semibold whitespace-nowrap dark:text-white">
            {singleDocument.title}
          </span>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* <ShareDocument documentId={singleDocument._id} /> */}
          </div>
        </div>
      </nav>
    </>
  );
};
