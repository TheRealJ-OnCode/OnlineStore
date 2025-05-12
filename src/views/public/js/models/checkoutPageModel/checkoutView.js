import { getElement } from "../utils/DOM.utils"
import { getCart } from "../utils/Cart.utils";

export class checkoutView {
    constructor() {
        this.init();
    }
    init = () => {
        this.handleConfirmOrderBtnClicked();
    }

    collectUserInfo = () => {
        const name = getElement("#name").value.trim();
        const surname = getElement("#surname").value.trim();
        const prefix = getElement("#prefix").value;
        const phone = getElement("#phone").value.trim();
        const address = getElement("#address").value.trim();
        return { name, surname, phone: prefix + phone, address };
    }
    placeError = (errorMessages) => {
        const errorMessage = Array.isArray(errorMessages)
            ? errorMessages.join('\n')
            : errorMessages;
        console.log({errorMessage});
        
        swal({
            title: "Validasiya Xətası",
            text: errorMessage,
            icon: "error",
            button: "OK",
        });
    }

    handleOrder = () => {
        const userInfo = this.collectUserInfo();
        fetch("/order/place", {
            "method": "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    
                    window.location.href = `/orderStatus?status=success&orderID=${res.data.orderCode}`;
                } else {
                    this.placeError(res.message)
                }
                console.log(res)
                // if(res.data.success){
                //     window.location.href = `/orderStatus?status=success&orderID=${res.data.newOrder.orderCode}`;

                // }else{
                //     console.log(res);
                //     console.log(res.status)
                //     // window.location.href = `/orderStatus?status=false&orderID=${undefined}`;

                // }
            })
            .catch(err => {
                console.log("err", err)
            })
    }
    handleConfirmOrderBtnClicked = () => {
        const confirmOrderBtn = getElement("#confirm-order");
        confirmOrderBtn.addEventListener("click", this.handleOrder);
    }
}