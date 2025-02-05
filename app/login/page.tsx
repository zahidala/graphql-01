"use client";

import { SignInBody, useSignIn } from "@/api/endpoints/auth/useSignIn";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function Login() {
  const form = useForm<SignInBody>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignIn();

  const onSubmit: SubmitHandler<SignInBody> = async (data) => {
    mutate(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username or email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isPending && (
                  <i className="fas fa-spinner fa-spin mr-2 text-blue-500" />
                )}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
