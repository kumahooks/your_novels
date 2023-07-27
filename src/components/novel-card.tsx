import { type Novel } from "@prisma/client";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {
	IconEdit,
} from '@tabler/icons-react';
import Link from 'next/link';
import { api } from "~/utils/api"

export function NovelCard({ novel }: { novel: Novel }) {
	return (
		<div>
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Card.Section>
					<Image
						src={novel.image}
						style={{ objectFit: "cover", width: "100%", height: "100%" }}
					/>
				</Card.Section>

				<Group position="center" mt="md" mb="xs">
					<Text weight={500}>{novel.title}</Text>
					<Badge color="pink" variant="light">
						Chapters: {novel.chapters?.length ?? 0}
					</Badge>
				</Group>

				<Button 
					component={Link}
					href={`/novels/${novel.id}`}
					variant="light" 
					color="blue" 
					fullWidth mt="md" 
					radius="md"
				>
					Read
				</Button>
			</Card>
		</div>
	);
}
