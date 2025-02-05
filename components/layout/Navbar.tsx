import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
	const { logout, isLoggedIn } = useAuth();

	return (
		<div className="p-4 bg-gray-800 text-white flex justify-between items-center">
			<i className="fa-solid fa-chart-line fa-2xl"></i>

			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				{isLoggedIn && (
					<Button type="submit" onClick={() => logout()}>
						Logout
					</Button>
				)}
			</div>
		</div>
	);
};
