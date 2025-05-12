import { createElement, getElement } from "./DOM.utils";

export const addToCart = (productId, quantity,variant) => {
    return new Promise((resolve, reject) => {
        fetch("/cart/add", {
            method: "POST",
            body: JSON.stringify({ productId, quantity,variant }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(({ success, ...data }) => {
                success ? resolve(data) : reject(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const clearCart = () => {

}
export const removeFromCart = (productId,quantity,variantKey) =>{
    return new Promise((resolve, reject) => {
        fetch("/cart/remove", {
            method: "POST",
            body: JSON.stringify({ productId, quantity,variant:variantKey }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(({ success, ...data }) => {
                success ? resolve(data) : reject(data);
            })
            .catch(err => {
                reject(err);
            });
    });

}


const placeProductToCard = (products) => {
    getElement("#cart-count").textContent = products.length ;
    let cartTotalAmount = 0;

    const productsWrapper = getElement("#cart-content>#products-wrapper");
    productsWrapper.innerHTML = ``;
    getElement("#cart-is-empty").style.display = "none"

    if (!products.length) {
        getElement("#cart-price").textContent = cartTotalAmount.toFixed(2) + " azn"
        getElement("#go-to-basket").style.display = "none"
        return getElement("#cart-is-empty").style.display = "block"
    }
    getElement("#go-to-basket").style.display = "block"

    products.forEach(product => {
        cartTotalAmount += product.total;
        
        const cartProduct = createElement("div", null, "cart-product");
        const cartImg = createElement("div", "cart-img");
        const img = createElement("img");
        const aTag = createElement("a");
        aTag.href = "/product/view?product_name="+product.name + "&pid="+product.productId;

        img.src = product.img;
        img.alt = product.name;
        cartImg.append(aTag);
        aTag.append(img)
        const cartProductDetails = createElement("div", "cart-product-details");
        const cartProductName = createElement("div", "cart-product-name");
        cartProductName.textContent = product.name
        const cartProductPrice = createElement("div", "cart-product-price");
        cartProductPrice.textContent = "Qiyməti : " + product.price;
        const cartProductCount = createElement("div", "cart-product-count");
        cartProductCount.textContent = "Sayı:"
        const span = createElement("span");
        span.textContent = product.quantity;
        cartProductCount.append(span)
        cartProductDetails.append(cartProductName, cartProductPrice, cartProductCount);
        const cartProductDelete = createElement("div", "#cart-product-delete");
        const button = createElement("button", "delete-btn");
        button.textContent = "x"
        button.onclick = (() => {
            deleteFromCart(product.productId);

        })
        cartProductDelete.append(button)
        cartProduct.append(cartImg, cartProductDetails, cartProductDelete);
        productsWrapper.append(cartProduct)
    })

    getElement("#cart-price").textContent = cartTotalAmount + " azn"

}


export const updateCart = () => {
    fetch("/cart/get")
        .then(res => res.json())
        .then(res => {
            
            placeProductToCard(res.data)
        })
        .catch(err => {
            console.log(err);
        });
}
export const getCart = () =>{
    return new Promise((resolve,reject)=>{
        fetch("/cart/get/total")
        .then(res => res.json())
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        });
    })
}

export const deleteFromCart = (pid, variantKey) => {
    return new Promise((resolve, reject) => {
        fetch("/cart/delete", {
            method: "DELETE",
            body: JSON.stringify({ productId: pid, variantKey }), // variantKey'yi ekliyoruz
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            updateCart();
            resolve(res);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}