import { Grid } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { NovelCard } from "~/components/novel-card";
import UserDashboardLayout from "~/components/layouts/user-dashboard-layout";
import { api } from "~/utils/api"

const Home: NextPage = () => {
	const novels = api.novel.getAllNovels.useQuery();

	return (
		<>
			<Head>
				<title>Your Novels! :)</title>
				<meta name="description" content="What novel are we reading today?" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<UserDashboardLayout>
					<h1 style={{ userSelect: 'none' }}>Search</h1>

					<Grid>
						{novels.data?.map((novel) => (
							<Grid.Col key={novel.id} span={4}>
								<NovelCard novel={novel}/>
							</Grid.Col>			
						))}
					</Grid>
				</UserDashboardLayout>
			</main>
		</>
	);
}

export default Home;
