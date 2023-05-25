import { Request, Response, NextFunction } from "express";

export type functionType = (req: Request, res: Response, next: NextFunction) => void;
export type catchError = (error: any, req: Request, res: Response, next: NextFunction) => void;
export type UserType =
    {
        id?: string,
        username?: string,
        email?: string,
        password?: string,
        avatar?: string,
        role?: string,
        retypePassword?: string
    }
export type decodeType = { id: string, role: string, iat: number, exp: number }
export type ImageType = {
    id?: string,
    uploadBy?: number,
    alt?: string
    url?: string

}