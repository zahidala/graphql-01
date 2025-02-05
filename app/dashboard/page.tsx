"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
	const { user } = useAuth();

	return null;
}
