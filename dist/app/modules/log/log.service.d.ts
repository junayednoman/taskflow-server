import { TPaginationOptions } from "../../utils/paginationCalculation";
export declare const LogService: {
    getLogs: (userId: string, options: TPaginationOptions) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        logs: {
            id: string;
            task: {
                title: string;
            };
            dateTime: Date;
            fromMember: {
                name: string;
            };
            toMember: {
                name: string;
            };
        }[];
    }>;
    deleteLog: (logId: string) => Promise<{
        id: string;
        userId: string;
        description: string;
        action: string;
        dateTime: Date;
        taskId: string;
        fromMemberId: string;
        toMemberId: string;
    }>;
};
//# sourceMappingURL=log.service.d.ts.map