import z from "zod";

export const projectZod = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  teamId: z.string().uuid("Invalid Team ID"),
});

export type TCreateProject = z.infer<typeof projectZod> & { userId: string };
