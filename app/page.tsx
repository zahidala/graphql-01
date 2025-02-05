"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
	const { isLoggedIn } = useAuth();
	return isLoggedIn ? redirect("/dashboard") : redirect("/login");
}
