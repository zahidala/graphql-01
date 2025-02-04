import { useAxiosClient } from "@/api/hooks/useAxiosClient";
import { useState } from "react";

export interface SignInBody {
	username: string;
	password: string;
}

export const useSignIn = () => {
	const client = useAxiosClient();
	const [isLoading, setIsLoading] = useState(false);

	const request = async (body: SignInBody) => {
		setIsLoading(true);
		try {
			const authHeader = `Basic ${btoa(`${body?.username}:${body?.password}`)}`;
			const response = await client.post("/auth/signin", null, {
				headers: {
					Authorization: authHeader,
				},
			});
			return response;
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, request };
};
