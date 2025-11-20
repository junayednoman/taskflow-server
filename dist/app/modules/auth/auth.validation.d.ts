import { z } from "zod";
export declare const signUpZod: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type TSignUp = z.infer<typeof signUpZod>;
export declare const loginZod: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type TLogin = z.infer<typeof loginZod>;
//# sourceMappingURL=auth.validation.d.ts.map