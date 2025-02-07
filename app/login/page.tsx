"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInBody, useSignIn } from "@/api/endpoints/auth/useSignIn";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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

	const { toast } = useToast();
	const { login } = useAuth();

	const router = useRouter();

	const { mutate, isPending } = useSignIn({
		onSuccess: token => {
			toast({
				title: "Success",
				description: "Logged in successfully",
				duration: 2000,
			});
			login(token);
			router.push("/");
		},
		onError: error => {
			return error.status === 403
				? toast({
						title: "Error",
						description: "Invalid username or password",
						duration: 2000,
						variant: "destructive",
					})
				: toast({
						title: "Error",
						description: "An error occurred while logging in",
						duration: 2000,
						variant: "destructive",
					});
		},
	});

	const onSubmit: SubmitHandler<SignInBody> = async data => {
		mutate(data);
	};

	return (
		<>
			<title>GraphQL 01 - Login</title>
			<div className="h-screen flex justify-center items-center p-4">
				<Card className="w-96">
					<CardHeader>
						<CardTitle>Login</CardTitle>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username/Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter your username or email" {...field} />
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
												<Input placeholder="Enter your password" type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">
									{isPending && <i className="fas fa-spinner fa-spin mr-2 text-blue-500" />}
									Login
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
