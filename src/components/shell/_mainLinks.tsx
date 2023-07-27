import React from 'react';
import Link from 'next/link';
import {
	IconSearch,
	IconUser,
	IconBook,
} from '@tabler/icons-react';
import { ThemeIcon, Group, Text, UnstyledButton } from '@mantine/core';
import { useSession } from 'next-auth/react';

const links = [
	{ icon: <IconSearch size="1rem" />, color: 'blue', label: 'Search', href: '/' },
	{ icon: <IconUser size="1rem" />, color: 'teal', label: 'Profile', href: '/user-profile', showWhenLoggedIn: true },
	{ icon: <IconBook size="1rem" />, color: 'teal', label: 'Favorite Novels', href: '/favorite-novels', showWhenLoggedIn: true },
];

export function MainLinks() {
	const { data: session } = useSession();

	return (
		<>
			{links.map((link) => {
				// If the link should be shown only when logged in, and the user is not logged in, skip this link
				if (link.showWhenLoggedIn && !session) return null;

				// Render the link
				return (
					<UnstyledButton
						component={Link}
						href={link.href}
						key={link.href}
						sx={(theme) => ({
							display: 'block',
							width: '100%',
							padding: theme.spacing.xs,
							borderRadius: theme.radius.sm,
							color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black, '&:hover': {
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
							},
						})}
					>
						<Group>
							<ThemeIcon color={link.color} variant="light">
								{link.icon}
							</ThemeIcon>
							
							<Text size="sm">{link.label}</Text>
						</Group>
					</UnstyledButton>
				);
			})}
		</>
	);
}
