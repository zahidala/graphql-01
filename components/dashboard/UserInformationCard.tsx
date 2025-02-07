import { capitalizeFirstLetter } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "../LoadingSpinner";
import { TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchUserInfo } from "@/api/endpoints/dashboard";

export const UserInformationCard = () => {
	const { user: userContext } = useAuth();

	const { data, loading } = useFetchUserInfo({ id: userContext?.id || 0 }, { skip: !userContext?.id });

	const user = data?.user_by_pk;

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
							<i className="fas fa-user-circle text-3xl sm:text-4xl md:text-5xl text-blue-300"></i>

							<div className="flex flex-col flex-wrap">
								<span className="text-lg sm:text-xl md:text-2xl">{fullName}</span>
								<span className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">{user?.login}</span>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex gap-2 items-center flex-wrap">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-key text-sm sm:text-base md:text-lg text-blue-300"></i>
									<span className="text-sm sm:text-base md:text-lg">ID:</span>
								</div>

								<span className="text-sm sm:text-base md:text-lg">{user?.id}</span>
							</div>

							<div className="flex gap-2 items-center flex-wrap">
								<div className="flex gap-2 items-center">
									<i className="fas fa-envelope text-sm sm:text-base md:text-lg text-blue-300"></i>
									<span className="text-sm sm:text-base md:text-lg">Email:</span>
								</div>

								<span className="text-sm sm:text-base md:text-lg">{user?.email}</span>
							</div>

							<div className="flex gap-2 items-center flex-wrap">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-location-dot text-sm sm:text-base md:text-lg text-blue-300"></i>
									<span className="text-sm sm:text-base md:text-lg">Campus:</span>
								</div>

								<span className="text-sm sm:text-base md:text-lg">
									{user?.campus && capitalizeFirstLetter(user.campus)}
								</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<TrendingUp className="text-sm sm:text-base md:text-lg text-blue-300" size={18} />
									<span className="text-sm sm:text-base md:text-lg">Level:</span>
								</div>

								<span className="text-sm sm:text-base md:text-lg">{level}</span>
							</div>

							<div className="flex gap-2 items-center">
								<div className="flex gap-2 items-center">
									<i className="fa-solid fa-sparkles text-sm sm:text-base md:text-lg text-blue-300"></i>
									<span className="text-sm sm:text-base md:text-lg">XP:</span>
								</div>

								<span className="text-sm sm:text-base md:text-lg">{totalXP} Bytes</span>
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
