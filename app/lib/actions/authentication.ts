"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { ILoginParams } from "../definitions/users";

export async function authenticate(
  prevState: string | undefined,
  formData: ILoginParams
) {
  try {
    const res = await signIn("credentials", formData);
    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
