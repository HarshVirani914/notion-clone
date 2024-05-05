import { useUpdateUserMutation } from "@/store/features/user";

export const useUpdateUser = () => {
  const [updateUser, { error, isLoading }] = useUpdateUserMutation();

  const handleUpdateUser = ({ id, user }: { id: string; user: Record<string, any> }) => {
    return updateUser({
      variables: {
        id: id,
        user: user,
      },
    });
  };

  return {
    handleUpdateUser,
    error,
    isLoading,
  };
};
