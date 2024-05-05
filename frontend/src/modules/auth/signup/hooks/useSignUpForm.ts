import { setCurrentUser, useSignUpMutation } from "@/store/features/auth";
import { signUpSchema } from "../schema/signUpSchema";
import AuthToken from "@/lib/AuthToken";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export const useSignUp = () => {

  const dispatch = useDispatch();
  const rourter = useRouter();

  const [signUp, { isLoading, error }] = useSignUpMutation({});

  const handleSubmit = async (input: Record<string, string>) => {
    try {
      const sanitizeInput = signUpSchema.cast(input, {
        assert: false,
        stripUnknown: true,
      });

      const response: any = await signUp(sanitizeInput);

      if (response?.data) {
        AuthToken.set(response?.data?.token);

        dispatch(setCurrentUser(response?.data?.user));

        rourter.push("/page");

      }

      console.log("[SingUp User] [Response]:", response);
    } catch (error: any) {
      console.log(`[SingUp User] [Error]: ${error?.message}`);
    }
  };

  return {
    initialValues: signUpSchema.cast(
      {},
      { assert: false, stripUnknown: true }
    ),
    validationSchema: signUpSchema,
    isLoading,
    error,
    handleSubmit,
  };
};
