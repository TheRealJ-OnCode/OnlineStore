import { getAllElement, getElement } from "../utils/DOM.utils";
import { detailsModel } from "./detailsModel";
import { detailsView } from "./detailsView";

export class detailsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
  

  
}

const app = new detailsController(new detailsModel(),new detailsView());