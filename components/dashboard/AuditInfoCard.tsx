"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchAuditInfo } from "@/api/endpoints/dashboard";

export const AuditInfoCard = () => {
	const { user } = useAuth();

	const { data, loading } = useFetchAuditInfo({ id: user?.id || 0 }, { skip: !user?.id });

	const audit = data?.user_by_pk;
	const totalUp = audit?.totalUp || 0;
	const totalDown = audit?.totalDown || 0;

	const done = Math.round(totalUp / 1000);
	const received = Math.round(totalDown / 1000);

	const auditRatio = Math.round(audit?.auditRatio || 0).toFixed(1);

	const chartData = [
		{ name: "Done", KB: done, fill: "var(--color-done)" },
		{ name: "Received", KB: received, fill: "var(--color-received)" },
	];

	const chartConfig = {
		done: {
			label: "Done",
			color: "hsl(var(--chart-1))",
		},
		received: {
			label: "Received",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader className="items-center">
				<CardTitle>Audits Ratio</CardTitle>
				<CardDescription> Done and received audits info including the ratio.</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart data={chartData} layout="vertical">
						<XAxis type="number" hide />
						<YAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
						<ChartTooltip content={<ChartTooltipContent />} cursor={false} />
						<Bar barSize={50} dataKey="KB" layout="vertical" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex justify-center items-center gap-4">
				<span className="font-weight-bold text-4xl">Ratio</span>
				<span className="text-4xl">{auditRatio}</span>
			</CardFooter>
		</Card>
	);
};
