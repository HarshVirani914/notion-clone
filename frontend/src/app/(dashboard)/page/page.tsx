"use client";

import { useCurrentUser } from "@/modules/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import Link from "next/link";
import { useCreatePage } from "../../../modules/editor/hooks/useCreatePage";

const page = () => {
  const { user } = useCurrentUser();

  const { handleCreatePage } = useCreatePage();

  const handleClick = () => {
    handleCreatePage({
      name: "Untitled",
      document: "",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <img src="/empty.png" className="dark:hidden" alt="Documents" />
        <span className="text-sm font-medium pl-4 text-black">
          Welcome to {user.username}'s Notion
        </span>
        <br />
        <Button
          className="mt-2 bg-black text-white !important"
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleClick}
        >
          {" "}
          <Link href={`/page`}>Create Note</Link>
        </Button>
      </div>
    </>
  );
};

export default page;
