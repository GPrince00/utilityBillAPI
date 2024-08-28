import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

export const router = Router();

router.post(
  "/upload",
  body("image").notEmpty().isBase64(),
  body("customer_code").notEmpty().isString(),
  body("measure_datetime").notEmpty().isDate(),
  body("measure_type").notEmpty().isIn(["WATER", "GAS"]),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: errors.mapped(),
      });
    }
    res.status(200).end();
  }
);
