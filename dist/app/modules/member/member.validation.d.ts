import * as z from "zod";
export declare const createMemberZod: z.ZodObject<{
    teamId: z.ZodString;
    name: z.ZodString;
    role: z.ZodString;
    capacity: z.ZodNumber;
}, z.core.$strip>;
export type TCreateMember = z.infer<typeof createMemberZod>;
//# sourceMappingURL=member.validation.d.ts.map