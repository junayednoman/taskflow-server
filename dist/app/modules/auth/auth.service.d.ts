import { TLogin, TSignUp } from "./auth.validation";
export declare const AuthService: {
    signUp: (payload: TSignUp) => Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login: (payload: TLogin) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map