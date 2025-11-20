import z from "zod";
export declare const teamZod: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type TCreateTeam = z.infer<typeof teamZod> & {
    userId: string;
};
//# sourceMappingURL=team.validation.d.ts.map