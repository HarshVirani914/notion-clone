"use client";
import { redirect } from "next/navigation";
import { useCurrentUser } from "../../modules/hooks/useCurrentUser";
import Sidebar from "./_components/sidebar";
import { useAuthenticated } from "./page/hooks/useIsauthenticate";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthenticated();
  const { user } = useCurrentUser();
  console.log(user);

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-screen flex dark:bg-[#1F1F1F]">
      <Sidebar />
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  );
};
export default MainLayout;
