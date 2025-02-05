"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Pie, PieChart } from "recharts";
import { useFetchXPPerProject } from "@/api/endpoints/dashboard";

export const XPPerProjectCard = () => {
	const { data, loading } = useFetchXPPerProject();

	const chartData =
		data?.transaction
			.filter(item => item.amount >= 0)
			.map(item => ({
				project: item.object.name,
				xp: item.amount,
				fill: `var(--color-${item.object.name.toLowerCase()})`,
			})) || [];

	const chartConfig: ChartConfig = chartData.reduce<ChartConfig>((config, item) => {
		config[item.project.toLowerCase()] = {
			label: item.project,
			color: `hsl(var(--chart-${chartData.indexOf(item) + 1}))`,
		};
		return config;
	}, {});

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center">
				<CardTitle>XP Per Project</CardTitle>
				<CardDescription>XP distribution for the last 5 projects</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				{data?.transaction && !loading ? (
					<ChartContainer
						className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground w-full"
						config={chartConfig}
					>
						<PieChart>
							<ChartTooltip
								content={
									<ChartTooltipContent
										formatter={(value, name) => (
											<div className="flex gap-2 items-center">
												<div
													className="h-2 w-2 shrink-0 rounded-[2px]"
													style={{ backgroundColor: `var(--color-${name})` }}
												/>
												<span className="text-gray-500">{name}</span>
												<span className="font-medium">{value.toLocaleString()} B</span>
											</div>
										)}
										hideLabel
									/>
								}
								wrapperStyle={{ minWidth: 200 }}
							/>
							<Pie data={chartData} dataKey="xp" nameKey="project" />
							<ChartLegend className="flex-wrap" content={<ChartLegendContent nameKey="project" />} />
						</PieChart>
					</ChartContainer>
				) : (
					<div className="flex flex-col min-h-[200px] justify-center">
						<LoadingSpinner className="mx-auto" />
					</div>
				)}
			</CardContent>
		</Card>
	);
};
