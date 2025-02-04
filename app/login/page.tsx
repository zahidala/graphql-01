"use client";

import { SignInBody, useSignIn } from "@/api/endpoints/auth/useSignIn";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<SignInBody>();

	const { request, isLoading } = useSignIn();

	const onSubmit: SubmitHandler<SignInBody> = async data => {
		const response = await request(data);
		console.log(response);
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="p-8 dark:bg-blue-500 bg-blue-400 rounded-md w-96 shadow-lg">
				<h1 className="text-4xl text-white text-center">Login</h1>

				<form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
					<input className="w-full p-3 rounded-md" placeholder="Username or Email" {...register("username")} />
					<input
						className="w-full p-3 mt-4 rounded-md text-black"
						placeholder="Password"
						type="password"
						{...register("password")}
					/>

					<button className="w-full mt-4 bg-white text-blue-500 p-2 rounded-md" type="submit">
						{isLoading && <i className="fas fa-spinner fa-spin mr-2 text-blue-500" />}
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
