import { shopModel } from "./shopModel";
import { shopView } from "./shopView";

class shopController {
    constructor(model,view){
        this.model = model;
        this.view = view;
    }
}

const shopMVC = new shopController(new shopModel(),new shopView())