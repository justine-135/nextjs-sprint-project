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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { z, ZodFormattedError } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { INVALID_CREDENTIALS } from "@/app/lib/constants/auth";
import useLoading from "@/app/lib/hooks/useLoading";
import ActionButton from "../common/button";

interface IFormParams {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters",
  }),
});

export default function LoginForm() {
  const [fieldErrors, setFieldErrors] =
    useState<ZodFormattedError<IFormParams, string>>();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IFormParams) => {
    const parsedCredentials = formSchema.safeParse(data);

    if (parsedCredentials.success === false) {
      const formattedError = parsedCredentials.error.format();
      setFieldErrors(formattedError);
      return;
    }

    try {
      startLoading();
      const res = await authenticate(data);

      if (res === INVALID_CREDENTIALS) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please double check your credentials.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was an error fetching your request.",
      });
    } finally {
      stopLoading();
    }
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
            <ActionButton title="Login" loading={isLoading} type="submit" />
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
