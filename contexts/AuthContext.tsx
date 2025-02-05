"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect, usePathname } from "next/navigation";

type TokenPayload = {
	sub: string;
	iat: number;
	ip: string;
	exp: number;
	"https://hasura.io/jwt/claims": {
		"x-hasura-allowed-roles": string[];
		"x-hasura-campuses": string;
		"x-hasura-default-role": string;
		"x-hasura-user-id": string;
		"x-hasura-token-id": string;
	};
};

interface User {
	id: string;
}

interface Auth {
	user: User;
	token: string;
}

interface AuthContextType {
	token?: string;
	login: (token: string) => void;
	logout: () => void;
	user?: User;
	isLoggedIn: boolean;
	isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<Auth>();
	const [isLoading, setIsLoading] = useState(true);

	const pathname = usePathname();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = jwtDecode(token) as TokenPayload;
			setAuth({
				user: {
					id: payload["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
				},
				token,
			});
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading && !auth?.token && !pathname.includes("login")) {
			redirect("/login");
		}
	}, [pathname, isLoading, auth?.token]);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		const payload = jwtDecode(token) as TokenPayload;
		setAuth({
			user: {
				id: payload["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
			},
			token,
		});
	};

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(undefined);
	};

	return (
		<AuthContext.Provider
			value={{
				token: auth?.token,
				user: auth?.user,
				isLoggedIn: !!auth?.token,
				isLoading,
				login,
				logout,
			}}
		>
			{isLoading ? null : children}
		</AuthContext.Provider>
	);
};
