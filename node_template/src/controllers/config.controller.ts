import { Request, Response } from "express";
import { handleError} from '../helpers/securityFunctions';
import User from "../models/User";


export const syncDB = async (req: Request, res: Response) => {
    try {

        await User.sync();

        res.json({
            status: true
        });
    } catch (ex) {
        handleError(res, ex)
    }
}
