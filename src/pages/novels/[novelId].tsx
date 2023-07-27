import { useEffect } from 'react';
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import UserDashboardLayout from "~/components/layouts/user-dashboard-layout";
import { api } from "~/utils/api";
import { Grid, Image, Text, ActionIcon, Flex, useMantineTheme, Modal, TextInput, Textarea, Group, Button  } from '@mantine/core';
import {
	IconEdit,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useSession } from "next-auth/react";

const Novels: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const novelId = router.query.novelId as string;
	
	const novelQuery = api.novel.getNovelById.useQuery(
	{
		novelId,
	},
	{
		enabled: !!novelId,
	});

	const authorQuery = api.user.getUserById.useQuery(
	{
		userId: novelQuery.data?.userId,
	},
	{
		enabled: !!novelQuery.data?.userId,
	});

	// Use useEffect to fetch the author data after the component has mounted
	useEffect(() => {
		if (novelQuery.data?.userId) {
			authorQuery.refetch();
		}
	}, [novelQuery.data?.userId]);

	const [isEditNovelOpened, { open, close }] = useDisclosure(false);
	const theme = useMantineTheme();
	const editNovelForm = useForm({
		initialValues: {
			title: "",
			image: "",
			description: "",
		},
	});

	const editNovelMutation = api.novel.editNovel.useMutation();
	const isOwner = authorQuery.data?.id === session?.user?.id;

	return (
		<>
			<Modal 
				opened={isEditNovelOpened} 
				onClose={close} 
				title="Edit Novel"
				overlayProps={{
					color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
					opacity: 0.55,
					blur: 3,
				}}
			>

				<form 
					onSubmit={editNovelForm.onSubmit(async (values) => {
						await editNovelMutation.mutateAsync({
							...values,
							novelId: novelQuery.data?.id,
						});
						close();
						editNovelForm.reset();
						await novelQuery.refetch();
					})}
				>

					<TextInput
						withAsterisk
						required
						label="Title"
						placeholder={novelQuery.data?.title}
						{...editNovelForm.getInputProps('title')}
					/>

					<TextInput
						withAsterisk
						required
						label="Image URL"
						placeholder={novelQuery.data?.image}
						{...editNovelForm.getInputProps('image')}
					/>

					<Textarea 
						withAsterisk
						required
						autosize
						minRows={2}
						maxRows={6}
						label="Novel Description" 
						placeholder={novelQuery.data?.description}
						{...editNovelForm.getInputProps('description')}
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
					<Grid columns="min-content 1fr" gap="md" align="left" mb={"2rem"}>
						<Grid.Col span={4}>
							<Image
								src={novelQuery.data?.image}
								alt={novelQuery.data?.title}
								height={240}
								width={180}
								radius="md"
								fit="fill"
							/>
						</Grid.Col>

						<Grid.Col span={4}>
							<Flex>
								<Text fw={700} size="2rem">
									{novelQuery.data?.title}
								</Text>

								{isOwner && (
									<ActionIcon variant="transparent" onClick={open}>
										<IconEdit/>
									</ActionIcon>
								)}
							</Flex>

							<Text c="teal.4" fz="xs" mt={"-0.5rem"} mb={"1rem"}>
								{authorQuery.data?.name}
							</Text>

							<Text fz="md">
								{novelQuery.data?.description}
							</Text>
						</Grid.Col>
					</Grid>

					<Text fw={700} size="1.5rem">
						Chapters:
					</Text>
				</UserDashboardLayout>
			</main>
		</>
	);
}

export default Novels;
