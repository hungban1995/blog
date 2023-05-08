import { Request, Response, NextFunction } from "express";

export type functionType = (req: Request, res: Response, next: NextFunction) => void;
export type catchError = (error: any, req: Request, res: Response, next: NextFunction) => void;
export type UserType =
    {
        id?: number,
        username?: string,
        email?: string,
        password?: string,
        avatar?: string,
        role?: string,
        retypePassword?: string
    }