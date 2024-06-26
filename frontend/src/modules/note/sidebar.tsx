"use client";
import { useCreatePage } from "@/modules/editor/hooks/useCreatePage";
import { useCurrentUserPages } from "@/modules/editor/hooks/useCurrentUserPages";
import { useMakeTrashPage } from "@/modules/editor/hooks/useMakeTrashPage";
import { useCurrentUser } from "@/modules/hooks";
import { removeCurrentUser } from "@/store/features/auth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import UserIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import UserProfileModal from "../user/profile/ProfileModal";
import TrashWindow from "./TrashWindow";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { pages } = useCurrentUserPages();

  const { user } = useCurrentUser();

  const { handleTrashPage } = useMakeTrashPage();

  const { handleCreatePage, isLoading } = useCreatePage();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const unTrashedPages = useMemo(() => {
    return pages?.filter((d: any) => !d?.isTrashed) || [];
  }, [pages]);

  const createPage = async () => {
    const page = await handleCreatePage(
      {
        name: "Untitled",
        document: "",
      },
      (createdPage: any) =>
        createdPage?.data && router.push(`/page/${createdPage?.data?._id}`)
    );
  };

  function handleLogout() {
    dispatch(removeCurrentUser());
    router.push("/");
  }

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex flex-col w-56">
        <div className="flex items-center justify-center bg-slate-950 h-14 shadow-md">
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
          <span className="text-sm font-medium pl-4 text-white">
            {!user?.username ? "User" : user?.username}
          </span>
        </div>

        <ul className="flex flex-col py-4 items-start">
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <SearchIcon className="ml-6 " />
              <input
                type="search"
                id="default-search"
                className="ext-sm font-medium p-1 w-32 h-7 m-4 rounded-lg bg-gray-100"
                placeholder="Search.."
                required
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <SettingsIcon className="ml-6" />
              <span className="text-sm font-medium pl-4">Setting</span>
            </a>
          </li>
          <ul className="flex flex-col my-2 w-full">
            {unTrashedPages &&
              unTrashedPages.map((page: any) => (
                <li
                  key={page._id}
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                >
                  <NoteAddIcon className="ml-6" />
                  <Link href={`/page/${page._id}`}>
                    <span className="text-sm font-medium pl-4">
                      {page.name}
                    </span>
                  </Link>
                  <div className="flex-grow" />{" "}
                  {/* This creates space to push the trash icon to the end */}
                  <BsTrash
                    className="mr-4"
                    onClick={() => handleTrashPage(page._id)}
                  />
                </li>
              ))}
          </ul>
          <li>
            <button
              // href="/page"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              onClick={createPage}
              disabled={isLoading}
            >
              <AddCircleOutlineIcon className="ml-6" />
              <span className="text-sm font-medium pl-4">Add Page</span>
            </button>
          </li>
          <li>
            <Link
              href="/routes/quickNote"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <AddCircleOutlineIcon className="ml-6" />
              <span className="text-sm font-medium pl-4">Quick Email</span>
            </Link>
          </li>
          <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <DeleteOutlineIcon className="ml-6" />
            <TrashWindow />
            <ToastContainer />
          </li>

          <li>
            <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 cursor-pointer">
              <UserIcon className="ml-6" />
              <span
                className="text-sm font-medium pl-4"
                onClick={() => setIsProfileModalOpen(true)}
              >
                Profile
              </span>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-bell"></i>
              </span>
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                5
              </span>
            </a>
          </li>
          <li>
            <LogoutIcon className="ml-6" />
            <span className="text-sm font-medium pl-4">
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </span>
          </li>
        </ul>

        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};
