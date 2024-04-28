import { useCreatePageMutation } from "@/store/features/page";
import { debounce } from "lodash";
import { useCurrentUser } from "./useCurrentUser";
import { useLazyCurrentUserPages } from "./useLazyPages";

export const useCreatePage = () => {
  const { currentUser } = useCurrentUser()

  const { handleFetchPages } = useLazyCurrentUserPages()

  const [createPage, { data, isLoading, error }] = useCreatePageMutation();

  const handleCreatePage = debounce(async (input: Record<string, any>, onComplete?: Function) => {
    const createdPage = await createPage({ ...input, userId: currentUser._id });

    await handleFetchPages();

    if (onComplete) {
      onComplete(createdPage);
    }

    return createdPage
  }, 200)

  return {
    page: data,
    isLoading,
    error,
    handleCreatePage,
  }
}