import { BillController } from "./controller/BillController"

export const Routes = [{
    method: "get",
    route: "/bill",
    controller: BillController,
    action: "all"
}, {
    method: "get",
    route: "/bill/:id",
    controller: BillController,
    action: "one"
}, {
    method: "post",
    route: "/bill",
    controller: BillController,
    action: "save"
}, {
    method: "delete",
    route: "/bill/:id",
    controller: BillController,
    action: "remove"
}]