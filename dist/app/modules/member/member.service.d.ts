import { TPaginationOptions } from "../../utils/paginationCalculation";
import { TCreateMember } from "./member.validation";
export declare const MemberServices: {
    addMember: (userId: string, payload: TCreateMember) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        teamId: string;
        role: string;
        capacity: number;
    }>;
    getMembers: (query: Record<string, any>, options: TPaginationOptions, userId: string) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        members: {
            name: string;
            id: string;
            _count: {
                tasks: number;
            };
            role: string;
            capacity: number;
        }[];
    }>;
    checkCapacity: (memberId: string) => Promise<void>;
    getLeastLoadedMember: (projectId: string) => Promise<{
        member: {
            name: string;
            id: string;
        };
    }>;
};
//# sourceMappingURL=member.service.d.ts.map