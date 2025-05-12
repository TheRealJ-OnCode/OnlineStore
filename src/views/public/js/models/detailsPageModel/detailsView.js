import { displayCartNotification } from "../helpers/displayCartNotification";
import { addToCart, updateCart } from "../utils/Cart.utils";
import { getAllElement, getElement } from "../utils/DOM.utils"

export class detailsView {
    constructor() {
        this.init()
    }
    init = () => {

        this.productCount = 1;
        this.selectedVariant;
        this.pid;
        this.productName;
        this.getProductInfo();
        this.handleImageClick();
        this.handleCounterBtnsClick();
        this.handleAddToCartClick();
        this.changeVariant()
    }

    getProductInfo = () => {
        const params = new URLSearchParams(window.location.search);
        this.productName = params.get("product_name");
        return this.pid = params.get('pid');
    }
    updateProductCount = () => {
        const productCartCount = getElement("#product-cart-count");
        productCartCount.textContent = this.productCount
    }
    handleImageClick = () => {
        const productImages = getAllElement("#product-other-imgs > img");
        const mainImg = getElement("#main-img > img")
        productImages.forEach(img => {
            img.addEventListener("click", () => {
                mainImg.src = img.src;
            })

        })
    }
    handleCounterBtnsClick = () => {
        const decreaseBtn = getElement("#decrease-btn");
        const increaseBtn = getElement("#increase-btn");
        decreaseBtn.addEventListener("click", e => {
            if (this.productCount <= 1) {
                return false
            }
            this.productCount--
            this.updateProductCount()
        })
        increaseBtn.addEventListener("click", e => {
            this.productCount++
            this.updateProductCount()
        })
    }
    handleAddToCartClick = () => {
        const addToCartBtn = getElement("#add-to-cart");
        addToCartBtn.addEventListener("click", e => {
            if (this.pid && this.productCount > 0) {
                addToCart(this.pid, this.productCount,this.selectedVariant)
                    .then(response => {
                        displayCartNotification(response.message, true);
                        updateCart()

                    })
                    .catch(error => {
                        displayCartNotification(error.message)
                    });
            }
            else {
                return false
            }
        })
    }

    
    changeVariant = () => {
        const variants = getAllElement(".variant");
        if(variants.length < 1) return false
        this.selectedVariant = variants[0].getAttribute("data-key");
        variants.forEach(variant => {
            variant.addEventListener("click", e => {
                const key = e.target.getAttribute("data-key")
                const price = e.target.getAttribute("data-price");
                this.selectedVariant = key;
                getElement("#product-price-text").textContent = price + " azn";
                getElement(".variant.selected").classList.remove("selected");
                getElement(`[data-key="${key}"]`).classList.add("selected")
            })
        })
    }
}
