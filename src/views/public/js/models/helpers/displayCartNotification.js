import { getElement } from "../utils/DOM.utils"

let timeoutId;  
export const displayCartNotification = (message, success = false) => {
    const cartNotification = getElement("#cart-notification");
    const messageParagraph = getElement("#cart-notification > p");
    
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    cartNotification.classList.remove("danger", "success");
    if (success) {
        cartNotification.classList.add("success");
    } else {
        cartNotification.classList.add("danger");
    }

    messageParagraph.textContent = message;
    cartNotification.classList.add("active");

    timeoutId = setTimeout(() => {
        removeCartNotification();
    }, 1000);
}

export const removeCartNotification = () => {
    const cartNotification = getElement("#cart-notification");
    
    cartNotification.classList.remove("active", "danger", "success");

    timeoutId = null;
};
