"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className="flex flex-col min-h-screen justify-center">
				<LoadingSpinner className="h-19 w-19 mx-auto" />
			</div>
		);

	return isLoggedIn ? redirect("/dashboard") : redirect("/login");
}
