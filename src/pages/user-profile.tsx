import { type NextPage } from "next";
import Head from "next/head";
import { Modal, Button, Flex, Group, useMantineTheme, TextInput, Textarea, Box, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { NovelCard } from "~/components/novel-card";
import UserDashboardLayout from "~/components/layouts/user-dashboard-layout";
import { api } from "~/utils/api"
import { useSession } from "next-auth/react";

const UserProfile: NextPage = () => {
	const [isCreateNovelOpened, { open, close }] = useDisclosure(false);
	const theme = useMantineTheme();
	const createNovelForm = useForm({
		initialValues: {
			title: "",
			image: "",
			description: "",
		},
	});

	const createNovelMutation = api.novel.createNovel.useMutation();
	const novels = api.novel.getUserNovels.useQuery();

	const { data: session } = useSession();
	const user = session?.user;

	return (
		<>
			<Modal 
				opened={isCreateNovelOpened} 
				onClose={close} 
				title="Create Novel"
				overlayProps={{
					color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
					opacity: 0.55,
					blur: 3,
				}}
			>
			
				<form 
					onSubmit={createNovelForm.onSubmit(async (values) => {
						await createNovelMutation.mutateAsync(values);
						close();
						createNovelForm.reset();
						await novels.refetch();
					})}
				>

					<TextInput
						withAsterisk
						required
						label="Title"
						placeholder="Your novel title :)"
						{...createNovelForm.getInputProps('title')}
					/>

					<TextInput
						withAsterisk
						required
						label="Image URL"
						placeholder="Enter a valid image URL!"
						{...createNovelForm.getInputProps('image')}
					/>

					<Textarea 
						withAsterisk
						required
						autosize
						minRows={2}
						maxRows={6}
						label="Novel Description" 
						placeholder="What is your novel about?"
						{...createNovelForm.getInputProps('description')}
					/>

					<Group position="right" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</form>
			</Modal>

			<Head>
				<title>Your Novels! :)</title>
				<meta name="description" content="What novel are we reading today?" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<UserDashboardLayout>
					<h1 style={{ userSelect: 'none' }}>User Profile</h1>
					@@User Info Here!@@

					<Flex justify="space-between" align="center" direction="row">
						<h1 style={{ userSelect: 'none' }}>Published Novels</h1>

						<Button onClick={open}>Create Novel</Button>
					</Flex>

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

export default UserProfile;
