import { MutationOptions } from "@/api/types";
import { useClient } from "@/api/hooks/useClient";
import { useMutation } from "@tanstack/react-query";
export interface SignInBody {
	username: string;
	password: string;
}

type SignInResponse = string;

export const useSignIn = (options?: MutationOptions<SignInResponse, SignInBody>) => {
	const client = useClient();
	const mutationKey = ["sign-in"];

	const mutationFn = async (body: SignInBody) => {
		const authHeader = `Basic ${btoa(`${body?.username}:${body?.password}`)}`;
		const response = await client.post("/auth/signin", null, {
			headers: {
				Authorization: authHeader,
			},
		});

		return response?.data;
	};

	return useMutation({
		mutationFn,
		mutationKey,
		...options,
	});
};
