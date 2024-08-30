import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { BillController } from "../controller/BillController";
import { Bill } from "../entity/Bill";

export const router = Router();
const billCtrl = new BillController();

router.post(
  "/upload",
  body("image").notEmpty().isBase64(),
  body("customer_code").notEmpty().isString(),
  body("measure_datetime").notEmpty().isDate(),
  body("measure_type").notEmpty().isIn(["WATER", "GAS"]),
  async (req: Request, res: Response) => {
    const { customer_code, measure_datetime, measure_type, image } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: errors.mapped(),
      });
    }

    const bill = Object.assign(new Bill(), {
      measure_datetime,
      measure_type,
      has_confirmed: false,
      image_url: "",
      customer_code,
    });
    const savedBill = await billCtrl.save(bill);
    const measure = await billCtrl.measure(image);

    res.json({
      image_url: savedBill.image_url,
      measure_value: parseInt(measure),
      measure_uuid: savedBill.measure_uuid,
    });
  }
);

router.patch(
  "/confirm",
  body("measure_uuid").notEmpty().isUUID(),
  body("confirmed_value").notEmpty().isInt(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: errors.mapped(),
      });
    }

    res.send({ success: true }).end();
  }
);
