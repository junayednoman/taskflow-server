import * as z from "zod";

export const createMemberZod = z.object({
  teamId: z.string().uuid("Invalid team ID"), // must be a valid UUID
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  capacity: z.number().int().min(0, "Capacity must be at least 0"),
});

export type TCreateMember = z.infer<typeof createMemberZod>;
