import { capitalizeFirstLetter } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "../LoadingSpinner";
import { useFetchUserInfo } from "@/api/endpoints/dashboard/useFetchUserInfo";

export const UserInformationCard = () => {
	const { data, loading } = useFetchUserInfo();

	const user = data?.user[0];

	const fullName = `${user?.firstName} ${user?.lastName}`;

	return (
		<Card className="p-3">
			<CardHeader>
				<CardTitle>User Information</CardTitle>
			</CardHeader>
			<CardContent>
				{user && !loading ? (
					<div className="flex flex-col gap-4">
						<div className="border-b-[1px] py-1 border-blue-300 flex justify-between">
							<span className="text-center text-gray-300">Name</span>
							<span className="text-center">{fullName}</span>
						</div>

						<div className="border-b-[1px] py-1 border-blue-300 flex justify-between">
							<span className="text-center text-gray-300">First Name</span>
							<span className="text-center">{user?.firstName}</span>
						</div>

						<div className="border-b-[1px] py-1 border-blue-300 flex justify-between">
							<span className="text-center text-gray-300">Last Name</span>
							<span className="text-center">{user?.lastName}</span>
						</div>

						<div className="border-b-[1px] py-1 border-blue-300 flex justify-between">
							<span className="text-center text-gray-300">Email</span>
							<span className="text-center">{user?.email}</span>
						</div>

						<div className="border-b-[1px] py-1 border-blue-300 flex justify-between">
							<span className="text-center text-gray-300">Campus</span>
							<span className="text-center">{user?.campus && capitalizeFirstLetter(user.campus)}</span>
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
