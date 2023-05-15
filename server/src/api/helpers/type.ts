import { Request, Response, NextFunction } from "express";
import { type } from "os";

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
export type decodeType = { id: number, role: string, iat: number, exp: number }
export type ImageType = {
    id?: number,
    uploadBy?: number,
    alt?: string
    url?: string

}