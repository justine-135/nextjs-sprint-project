"use client";

import { authenticate } from "@/app/lib/actions/authentication";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { SafeParseReturnType, ZodFormattedError } from "zod";
import Link from "next/link";
import { signIn } from "@/auth";

interface IFormParams {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [fieldErrors, setFieldErrors] = useState();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IFormParams) => {
    const res = authenticate(undefined, data);

    console.log(res);

    // if (result.success === false) {
    //   const formattedError = result.error.format();
    //   setFieldErrors(formattedError);
    // }
    // return;
  };

  return (
    <div className="w-54">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage>{fieldErrors?.email?._errors[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage>{fieldErrors?.password?._errors[0]}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mt-5">
            <Button type="submit">Login</Button>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/register"
            >
              Click here to register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
