import { addToCart, deleteFromCart, removeFromCart, updateCart } from "../utils/Cart.utils";
import { createElement, getAllElement } from "../utils/DOM.utils"

export class cartView {
    constructor() {

        this.init();
    }
    init = () => {
        this.handleCountButtonsClicked();
    }



    handleDecreaseProduct = (pid,variantKey) => {
        removeFromCart(pid, 1,variantKey)
            .then(r => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    handleIncreaseProduct = (pid,variantKey) => {
        addToCart(pid, 1,variantKey)
            .then(r => {
                window.location.reload()
            })
            .catch(err => console.log(err))

    }
    handleDeleteProduct = (pid, variantKey) => {
        deleteFromCart(pid, variantKey)
            .then(r => {
                window.location.reload()
            })
            .catch(err => console.log(err));
    }
    handleCountButtonsClicked = () => {
        const decreaseButtons = getAllElement(".item-actions>button.decrease");
        const increaseButtons = getAllElement(".item-actions>button.increase");
        const deleteButtons = getAllElement(".item-delete");
    
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", x => {
              
                const pid = btn.getAttribute("data-pid");
                const variantKey = btn.getAttribute("data-variant") || null; 
                this.handleDeleteProduct(pid, variantKey); 
            });
        });
        
    
        decreaseButtons.forEach(btn => {
            btn.addEventListener("click", x => {
                const parentNode = btn.parentNode;
                const pid = parentNode.getAttribute("data-pid");
                const variantKey = parentNode.getAttribute("data-variant") || null;
                this.handleDecreaseProduct(pid, variantKey);
            });
        });
    
        increaseButtons.forEach(btn => {
            btn.addEventListener("click", x => {
                const parentNode = btn.parentNode;
                const pid = parentNode.getAttribute("data-pid");
                const variantKey = parentNode.getAttribute("data-variant") || null;
                this.handleIncreaseProduct(pid, variantKey);
            });
        });
    }
    
    



}