import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { router } from "./route";

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/", router);

export default app;
