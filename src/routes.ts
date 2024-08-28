import { BillController } from "./controller/BillController"

export const Routes = [
{
    method: "post",
    route: "/upload",
    controller: BillController,
    action: "save"
}]