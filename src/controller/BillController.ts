import { NextFunction, Request, Response } from "express"

export class BillController {

    async save(request: Request, response: Response, next: NextFunction) {
        return response.status(200).end();
    }
}