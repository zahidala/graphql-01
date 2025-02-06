"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LoadingSpinner } from "../LoadingSpinner";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { useFetchSkills } from "@/api/endpoints/dashboard";

export const TopSkillsCard = () => {
	const { data, loading } = useFetchSkills();

	const filteredSkills = ["skill_prog", "skill_go", "skill_back-end", "skill_html", "skill_js", "skill_front-end"];

	const formatSkillName = (skill: string) => {
		const skillMap: { [key: string]: string } = {
			skill_prog: "Prog",
			skill_go: "Go",
			"skill_back-end": "Back-End",
			skill_html: "HTML",
			skill_js: "JS",
			"skill_front-end": "Front-End",
		};
		return skillMap[skill] || skill.replace("skill_", "").replace("-", " ");
	};

	const chartData = filteredSkills.map(skill => {
		const highestTransaction = data?.user[0].transactions
			.filter(transaction => transaction.type === skill)
			.reduce((max, transaction) => (transaction.amount > max.amount ? transaction : max), { amount: 0 });
		return { name: formatSkillName(skill), Skill: highestTransaction?.amount || 0 };
	});

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader className="items-center pb-4">
				<CardTitle>Top Skills</CardTitle>
				<CardDescription>Here are your skills with the highest completion rate among all categories.</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				{data?.user && !loading ? (
					<ChartContainer className="mx-auto aspect-square max-h-[250px] w-full" config={chartConfig}>
						<RadarChart data={chartData}>
							<ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
							<PolarGrid gridType="circle" />
							<PolarAngleAxis dataKey="name" />
							<Radar
								dataKey="Skill"
								dot={{
									r: 4,
									fillOpacity: 1,
								}}
								fill="var(--color-desktop)"
								fillOpacity={0.6}
							/>
						</RadarChart>
					</ChartContainer>
				) : (
					<div className="flex flex-col min-h-[250px] justify-center">
						<LoadingSpinner className="mx-auto" />
					</div>
				)}
			</CardContent>
		</Card>
	);
};
