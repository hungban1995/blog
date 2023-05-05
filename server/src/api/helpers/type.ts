import { Request, Response, NextFunction } from "express";

export type functionType = (req: Request, res: Response, next: NextFunction) => void;
export type catchError = (error: any, req: Request, res: Response, next: NextFunction) => void;
