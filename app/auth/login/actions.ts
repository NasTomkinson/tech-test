"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type LoginFormState = {
  error: string | null;
};

export async function loginAction(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "The email or password you entered is incorrect.",
      };
    }

    throw error;
  }

  return { error: null };
}
