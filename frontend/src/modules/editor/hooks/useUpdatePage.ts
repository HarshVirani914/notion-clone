import { useGetPageQuery, useUpdatePageMutation } from "@/store/features/page";
import { debounce } from "lodash";
import { usePage } from "./usePage";

export const useUpdatePage = (id?: string) => {
  const { page, isLoading: isPageLoading, error: isPageError } = usePage(id);

  const [updatePage, { data, isLoading, error }] = useUpdatePageMutation();

  const handleUpdatePage = debounce(
    async (input: Record<string, any>, onComplete?: Function) => {
      const updatedPage = await updatePage({
        ...page,
        ...input,
        id: page?._id,
      });

      if (onComplete) {
        onComplete(updatedPage);
      }

      return updatedPage;
    },
    300
  );

  console.log("page in useUpdatePage", page);

  return {
    page: page,
    updatedPage: data,
    isLoading,
    error,
    handleUpdatePage,
    isPageLoading,
    isPageError,
  };
};
