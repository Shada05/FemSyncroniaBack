import { Request, Response } from "express";

export const handleError = (res: Response, ex: any) => {
    console.log(ex);
    const data = {
        errorMessage: ex.Message,
        errorData: ex
    }
    res.status(500).send(data);
}