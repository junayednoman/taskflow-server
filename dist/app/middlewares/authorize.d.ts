import { NextFunction, Response } from "express";
import { TRequest } from "../interface/global.interface";
declare const authorize: () => (req: TRequest, _res: Response, next: NextFunction) => Promise<void>;
export default authorize;
//# sourceMappingURL=authorize.d.ts.map