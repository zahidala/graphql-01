import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchUserInfo } from "@/api/endpoints/dashboard/useFetchUserInfo";

export const Navbar = () => {
	const { logout, isLoggedIn } = useAuth();

	const { data, loading } = useFetchUserInfo();

	const user = data?.user[0];

	return (
		<div className="p-4 bg-gray-800 text-white flex justify-between items-center">
			<h1>Reboot Stats Dashboard</h1>

			{isLoggedIn && !loading && (
				<div className="flex items-center gap-4">
					<span>Welcome {user?.firstName}!</span>
					<Button type="submit" onClick={() => logout()}>
						Logout
					</Button>
				</div>
			)}
		</div>
	);
};
