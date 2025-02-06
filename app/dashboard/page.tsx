"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopSkillsCard, UserInformationCard, XPPerProjectCard } from "@/components/dashboard";

export default function Dashboard() {
	return (
		<div className="grid grid-cols-1 gap-4 pt-20 px-10 sm:grid-cols-2 lg:grid-cols-2 pb-20">
			<UserInformationCard />

			<XPPerProjectCard />

			<TopSkillsCard />

			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
}
