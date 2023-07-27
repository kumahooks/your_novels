import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const novelRouter = createTRPCRouter({
	getNovelById: publicProcedure
		.input(z.object({ novelId: z.string() }))
		.query(({ctx, input}) => {
			return ctx.prisma.novel.findUnique({
				where: {
					id: input.novelId,
				},
			});
		}),

	getAllNovels: publicProcedure
		.query(({ctx}) => {
			return ctx.prisma.novel.findMany();
		}),

	getUserNovels: protectedProcedure
		.query(({ctx}) => {
			return ctx.prisma.novel.findMany({
				where: {
					userId: ctx.session.user.id,
				},
			});
		}),

	editNovel: protectedProcedure
		.input(z.object({ title: z.string(), image: z.string(), description: z.string(), novelId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const newNovel = await ctx.prisma.novel.updateMany({
				where: {
					id: input.novelId,
					userId,
				},
				data: {
					title: input.title,
					image: input.image,
					description: input.description,
					userId: userId,
				}
			});

			return { status: "updated"};
		}),

	createNovel: protectedProcedure
		.input(z.object({ title: z.string(), image: z.string(), description: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const newNovel = await ctx.prisma.novel.create({
				data: {
					title: input.title,
					image: input.image,
					description: input.description,
					userId: userId,
				}
			});

			return newNovel;
		}),
});
