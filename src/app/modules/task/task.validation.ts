import z from "zod";

export const taskZod = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  assignedMemberId: z.string().uuid("Invalid member ID"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export type TCreateTask = z.infer<typeof taskZod>;
