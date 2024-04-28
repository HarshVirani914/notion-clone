import { useGetPagesQuery } from "@/store/features/page";
import { useCurrentUser } from "./useCurrentUser";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

export const useCurrentUserPages = () => {
  const { currentUser } = useCurrentUser();

  const currentUserPages = useSelector((state: any) => state.page.pages);

  const { error, isLoading, refetch } = useGetPagesQuery(currentUser?._id, {
    skip: !currentUser?._id
  });

  const handleRefetch = debounce(refetch, 500)

  return {
    pages: currentUserPages,
    error,
    isLoading,
    handleRefetch
  }
}