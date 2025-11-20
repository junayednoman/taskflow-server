import z from "zod";
export declare const taskZod: z.ZodObject<{
    projectId: z.ZodString;
    assignedMemberId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        IN_PROGRESS: "IN_PROGRESS";
        DONE: "DONE";
    }>>;
}, z.core.$strip>;
export type TCreateTask = z.infer<typeof taskZod>;
//# sourceMappingURL=task.validation.d.ts.map