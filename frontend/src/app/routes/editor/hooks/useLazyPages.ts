

import { useLazyGetPagesQuery } from "@/store/features/page";
import { useSelector } from "react-redux";
import { useCurrentUser } from "./useCurrentUser";

export const useLazyCurrentUserPages = () => {
  const { currentUser } = useCurrentUser();

  const currentUserPages = useSelector((state: any) => state.page.pages);

  const [fetchPages, { error, isLoading }] = useLazyGetPagesQuery();

  const handleFetchPages = () => {
    if (!currentUser?._id) return;

    return fetchPages(currentUser?._id, false);
  }

  return {
    pages: currentUserPages,
    error,
    isLoading,
    handleFetchPages
  }
}