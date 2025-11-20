import { TPaginationOptions } from "../../utils/paginationCalculation";
import { TCreateProject } from "./project.validation";
export declare const ProjectServices: {
    createProject: (userId: string, payload: TCreateProject) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        teamId: string;
    }>;
    getProjects: (userId: string, options: TPaginationOptions) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        projects: {
            name: string;
            id: string;
            createdAt: Date;
            tasks: {
                id: string;
            }[];
            team: {
                name: string;
                id: string;
            };
        }[];
    }>;
    updateProject: (userId: string, projectId: string, payload: Partial<TCreateProject>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        teamId: string;
    }>;
};
//# sourceMappingURL=project.service.d.ts.map