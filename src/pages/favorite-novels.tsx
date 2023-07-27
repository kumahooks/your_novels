import { type NextPage } from "next";
import Head from "next/head";
import UserDashboardLayout from "~/components/layouts/user-dashboard-layout";

const FavoriteNovels: NextPage = () => {
	return (
		<>
			<Head>
				<title>Your Novels! :)</title>
				<meta name="description" content="What novel are we reading today?" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<UserDashboardLayout>Favorite Novels:</UserDashboardLayout>
			</main>
		</>
	);
}

export default FavoriteNovels;
