import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	const handleSetTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div>
			<Button className="rounded-full" onClick={handleSetTheme}>
				<i className={`fa-regular ${theme === "light" ? "fa-moon" : "fa-sun"} fa-xl`}></i>
			</Button>
		</div>
	);
};
