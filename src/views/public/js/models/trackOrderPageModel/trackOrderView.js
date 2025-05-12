import { createElement, getElement } from "../utils/DOM.utils"

export class trackOrderPageView {
    constructor() {
        this.init()
    }

    init = () => {
        this.handleSearchButton()
    }
    getOrderId = () => {
        const id = getElement("input#order-id").value.trim();
        return id ? id : false
    }

    playLoading = () => {

    }
    stopLoading = () => {

    }
    throwERROR = (message, type) => {
        swal({
            title: "Xəta",
            text: message,
            icon: type,
            button: "OK",
        });
    }
    clearOrderInfo = () => {
        const orderContent = getElement("#order-content")
        orderContent.innerHTML = ``;

    }

    placeOrderInfo = (data) => {
        this.clearOrderInfo();
        const statusMap = {
            Pending: "Gözləyir",
            Rejected: "Ləğv edildi",
            Confirmed: "Təsdiqləndi",
        };

        const orderContent = getElement("#order-content")
        orderContent.innerHTML = ``;
        orderContent.style.display = "flex";
        const { orderCode, customerInfo, totalAmount, status } = data;
        const { name, surname, phone } = customerInfo;
        const ul = createElement("ul", "order-info-list");
        const localizedStatus = statusMap[status] || "Bilinməyən";

        [orderCode, name, surname, phone, localizedStatus].forEach((item, index) => {

            const li = createElement("li", null, "order-info-item");
            let textContent = item
            if (index === 4) {
                textContent = "Status : " + item;
            }
            li.textContent = textContent;

            ul.append(li);
        })
        orderContent.append(ul);



    }
    handleSearchButton = () => {
        const searchButton = getElement("button#search-order-btn");

        searchButton.addEventListener("click", e => {
            const orderId = this.getOrderId();
            if (orderId) {
                this.playLoading()
                fetch("/order/search/", {
                    method: "POST",
                    body: JSON.stringify({ orderId }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => {
                        this.clearOrderInfo()

                        return res.json()
                    })
                    .then(res => {
                        if (!res.success) {
                            this.throwERROR("Sifariş tapılmadı", "error")

                        } else {
                            this.placeOrderInfo(res.data)
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        this.throwERROR("Server Error", "error")
                        
                    }
                    )
                    .finally(() => this.stopLoading());



            } else {
                this.throwERROR("Sifariş nömrəsi əksikdir", "warning")
            }
        })
    }
}