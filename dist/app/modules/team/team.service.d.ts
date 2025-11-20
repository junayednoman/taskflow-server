import { TCreateTeam } from "./team.validation";
export declare const TeamServices: {
    createTeam: (userId: string, payload: TCreateTeam) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getTeams: (userId: string) => Promise<{
        totalTasks: number;
        totalCapacity: number;
        name: string;
        id: string;
        createdAt: Date;
        projects: {
            _count: {
                tasks: number;
            };
        }[];
        members: {
            capacity: number;
        }[];
        _count: {
            projects: number;
            members: number;
        };
    }[]>;
    updateTeam: (userId: string, teamId: string, payload: Partial<TCreateTeam>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
};
//# sourceMappingURL=team.service.d.ts.map