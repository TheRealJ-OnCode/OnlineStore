import { navModel } from "./navModel";
import { navView } from "./navView";

export class navController {
    constructor(model,view) {
        this.model = model;
        this.view = view;
    }
}
const navMVC = new navController(new navModel(),new navView());