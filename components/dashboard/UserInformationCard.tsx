import { capitalizeFirstLetter } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "../LoadingSpinner";
import { TrendingUp } from "lucide-react";
import { useFetchUserInfo } from "@/api/endpoints/dashboard";

export const UserInformationCard = () => {
	const { data, loading } = useFetchUserInfo();

	const user = data?.user[0];

	const fullName = `${user?.firstName} ${user?.lastName}`;

	const level = data?.level[0].amount || 0;

	const totalXP = user?.xps.reduce((acc, curr) => acc + curr.amount, 0) || 0;

	return (
		<Card className="p-3">
			<CardHeader>
				<CardTitle>User Information</CardTitle>
			</CardHeader>
			<CardContent>
				{user && !loading ? (
					<div className="flex flex-col space-y-10">
						<div className="flex gap-4 items-center">
							<i className="fas fa-user-circle text-5xl text-blue-300"></i>

							<div className="flex flex-col">
								<span className="text-xl">{fullName}</span>
								<span className="text-gray-300">{user?.login}</span>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-key text-blue-300"></i>
									<span>ID:</span>
								</div>

								<span>{user?.id}</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<i className="fas fa-envelope text-blue-300"></i>
									<span>Email:</span>
								</div>

								<span>{user?.email}</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-location-dot text-blue-300"></i>
									<span>Campus:</span>
								</div>

								<span>{user?.campus && capitalizeFirstLetter(user.campus)}</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<TrendingUp className="text-blue-300" size={18} />
									<span>Level:</span>
								</div>

								<span>{level}</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-sparkles text-blue-300"></i>
									<span>XP:</span>
								</div>

								<span>{totalXP} Bytes</span>
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col min-h-[200px] justify-center">
						<LoadingSpinner className="mx-auto" />
					</div>
				)}
			</CardContent>
		</Card>
	);
};
