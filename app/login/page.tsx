export default function Login() {
	return (
		<div className="h-screen flex justify-center items-center">
			<div className="p-8 dark:bg-blue-500 bg-blue-400 rounded-md w-96">
				<h1 className="text-4xl text-white text-center">Login</h1>

				<form className="mt-10">
					<input className="w-full p-3 rounded-md" placeholder="Username or Email" />
					<input className="w-full p-3 mt-4 rounded-md" placeholder="Password" type="password" />

					<button className="w-full mt-4 bg-white text-blue-500 p-2 rounded-md" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
