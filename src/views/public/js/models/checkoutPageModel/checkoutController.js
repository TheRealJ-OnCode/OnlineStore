import { checkoutModel } from "./checkoutModel";
import { checkoutView } from "./checkoutView";

class checkoutController {
    constructor(model,view){
        this.model = model;
        this.view  = view;

    }
}

const checkoutPageMVC = new checkoutController(new checkoutModel(),new checkoutView());