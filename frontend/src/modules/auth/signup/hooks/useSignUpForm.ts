import { useSignUpMutation } from "@/store/features/auth";
import { signUpSchema } from "../schema/signUpSchema";

export const useSingUp = () => {
  const [signUp, { isLoading, error }] = useSignUpMutation({});

  const handleSubmit = async (input: Record<string, string>) => {
    try {
      const sanitizeInput = signUpSchema.cast(input, {
        assert: false,
        stripUnknown: true,
      });

      const response = await signUp(sanitizeInput);

      // TODO: Redirect to dashboard on successful signUp

      // TODO: Set token

      console.log("[SingUp User] [Response]:", response);
    } catch (error: any) {
      console.log(`[SingUp User] [Error]: ${error?.message}`);
    }
  };

  return {
    initialValues: signUpSchema.cast(
      {},
      { assert: false, stripUnknown: false }
    ),
    validationSchema: signUpSchema,
    isLoading,
    error,
    handleSubmit,
  };
};
