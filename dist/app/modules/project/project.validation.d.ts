import z from "zod";
export declare const projectZod: z.ZodObject<{
    name: z.ZodString;
    teamId: z.ZodString;
}, z.core.$strip>;
export type TCreateProject = z.infer<typeof projectZod> & {
    userId: string;
};
//# sourceMappingURL=project.validation.d.ts.map