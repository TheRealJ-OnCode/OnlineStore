const { default: axios } = require("axios");
const Response = require("../../helpers/Response.class");

const removeFromCartController = async (req, res) => {
    try {
        const { productId, quantity, variant } = req.body;
        let cart = req.session.cart || [];
        const requestURI = process.env.STORE_URI + "/api/store/find/product?pid=" + productId;
        const product = ((await axios.get(requestURI)).data).data
        if (!product) return new Response(null, "Məhsul tapılmadı", false).error404(res);
        let existingItem;
        if (variant) {
            existingItem = cart.find(item => item.productId === productId && item.variant === variant);
            if (!existingItem) {
                return new Response(null, 'Bu varyant səbəttə yoxdur').error(res, 400);
            }

        } else {
            existingItem = cart.find(item => item.productId === productId);
            if (!existingItem) {
                return new Response(null, 'Bu məhsul səbəttə yoxdur').error(res, 400);
            }
        }
        if (existingItem.quantity <= quantity) {
            cart = cart.filter(item => !(item.productId === productId && (!variant || item.variant === variant)))

        } else {
            existingItem.quantity -= quantity
        }
        cart.forEach(cartItem => {
            cartItem.total = Number((cartItem.price * cartItem.quantity).toFixed(2));
        })
        req.session.cart = cart;
        return new Response(null, `Məhsul miqdarı azaldıldı: ${productId} (${existingItem.quantity} ədəd qaldı)`, true).success(res);
    }
    catch (error) {
        console.log(error);
        return new Response(null, "Internal Server ERROR", false).error500(res);
    }
};

module.exports = { removeFromCartController };
