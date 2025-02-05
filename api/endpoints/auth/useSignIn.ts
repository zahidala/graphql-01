import { useClient } from "@/api/hooks/useClient";
import { MutationOptions } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
export interface SignInBody {
	username: string;
	password: string;
}

export const useSignIn = (options?: MutationOptions<void, SignInBody>) => {
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
