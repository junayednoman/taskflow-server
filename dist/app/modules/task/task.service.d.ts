import { TCreateTask } from "./task.validation";
import { TPaginationOptions } from "../../utils/paginationCalculation";
export declare const TaskServices: {
    createTask: (authorId: string, payload: TCreateTask) => Promise<{
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        authorId: string;
        assignedMemberId: string;
        title: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
    }>;
    getTasks: (userId: string, options: TPaginationOptions, query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        tasks: {
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            project: {
                name: string;
                id: string;
            };
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedMember: {
                name: string;
                id: string;
            };
        }[];
    }>;
    editTask: (taskId: string, userId: string, payload: Partial<TCreateTask>) => Promise<{
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        authorId: string;
        assignedMemberId: string;
        title: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
    }>;
    deleteTask: (taskId: string, userId: string) => Promise<{
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        authorId: string;
        assignedMemberId: string;
        title: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
    }>;
    reAssignTask: (userId: string) => Promise<void>;
};
//# sourceMappingURL=task.service.d.ts.map