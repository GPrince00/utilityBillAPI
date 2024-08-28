import { Request, Response } from "express"

export class BillController {

    async save(request: Request, response: Response) {
        return response.status(200).end();
    }
}