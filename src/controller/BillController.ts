import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Bill } from "../entity/Bill"

export class BillController {

    private billRepository = AppDataSource.getRepository(Bill)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.billRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const measure_uuid = request.params.measure_uuid


        const bill = await this.billRepository.findOne({
            where: { measure_uuid }
        })

        if (!bill) {
            return "unregistered bill"
        }
        return bill
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { measure_uuid, measure_datetime, measure_type, has_confirmed, image_url, customer_code } = request.body;

        const bill = Object.assign(new Bill(), {
            measure_uuid,
            measure_datetime,       
            measure_type,
            has_confirmed,
            image_url,
            customer_code
        })

        return this.billRepository.save(bill)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const measure_uuid = request.params.measure_uuid

        let billToRemove = await this.billRepository.findOneBy({ measure_uuid })

        if (!billToRemove) {
            return "this bill not exist"
        }

        await this.billRepository.remove(billToRemove)

        return "bill has been removed"
    }

}