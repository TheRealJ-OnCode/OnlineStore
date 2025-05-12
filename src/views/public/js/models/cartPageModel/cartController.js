import { cartModel } from "./cartModel";
import { cartView } from "./cartView";

export class cartController {
    
    constructor(model, view) {

        this.model = model;
        this.view = view;
    }
}


const cartMVC = new cartController(new cartModel(), new cartView());