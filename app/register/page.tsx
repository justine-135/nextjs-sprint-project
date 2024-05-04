import React from "react";
import LoginForm from "../ui/login/login-form";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  return (
    <div className="flex justify-center mt-52">
      <LoginForm />
      <Toaster />
    </div>
  );
}
