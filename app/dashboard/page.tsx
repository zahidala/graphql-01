"use client";

import { AuditInfoCard, TopSkillsCard, UserInformationCard, XPPerProjectCard } from "@/components/dashboard";

export default function Dashboard() {
	return (
		<div className="grid grid-cols-1 gap-4 pt-20 px-10 sm:grid-cols-2 lg:grid-cols-2 pb-20">
			<UserInformationCard />

			<XPPerProjectCard />

			<TopSkillsCard />

			<AuditInfoCard />
		</div>
	);
}
