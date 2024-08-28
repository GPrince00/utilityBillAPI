import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as morgan from "morgan";
import { Routes } from "./routes";

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    async (req: Request, res: Response, next: Function) => {
      try {
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );
});

export default app;
