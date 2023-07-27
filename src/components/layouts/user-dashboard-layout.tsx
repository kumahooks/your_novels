import { ActionIcon, AppShell, Group, Header, Navbar, useMantineColorScheme, toggleColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { ReactNode } from "react";
import { MainLinks } from "../shell/_mainLinks";
import { User } from "../shell/_user";

export default function UserDashboardLayout({ 
	children, 
}: {
	children: ReactNode;
}) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AppShell
			padding = "md"
			navbar = {
				<Navbar p="xs" width={{ base: 300 }}>
					<Navbar.Section grow mt="md">
						<MainLinks />
					</Navbar.Section>
					<Navbar.Section>
						<User />
					</Navbar.Section>
				</Navbar>
			}
			header = {
				<Header height={60} p="xs">
					<Group sx={{ height: '100%' }} px={20} position="apart">
						<div style={{ userSelect: 'none' }}>Your Minimalistic Novels Hub</div>
						<ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
							{
								colorScheme === 'dark' ? <IconSun size="16" /> : <IconMoonStars size="16" />
							}
						</ActionIcon>
					</Group>
				</Header>
			}
			styles={(theme) => ({
			main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
			})}
		>
			{ children }
		</AppShell>
	);
}