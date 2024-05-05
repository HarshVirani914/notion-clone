import { useLoginMutation } from "@/store/features/auth";
import { loginSchema } from "../schema/loginSchema";

export const useLogin = () => {
  const [login, { isLoading, error }] = useLoginMutation({});

  const handleSubmit = async (input: Record<string, string>) => {
    try {
      const sanitizeInput = loginSchema.cast(input, {
        assert: false,
        stripUnknown: true,
      });

      const response = await login(sanitizeInput);

      // TODO: Redirect to dashboard on successful login

      // TODO: Set token

      console.log("[Login User] [Response]:", response);
    } catch (error: any) {
      console.log(`[Login User] [Error]: ${error?.message}`);
    }
  };

  return {
    initialValues: loginSchema.cast({}, { assert: false, stripUnknown: false }),
    validationSchema: loginSchema,
    isLoading,
    error,
    handleSubmit,
  };
};
