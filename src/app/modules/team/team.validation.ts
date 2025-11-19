import z from "zod";

export const teamZod = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type TCreateTeam = z.infer<typeof teamZod> & { userId: string };
