const Response = require("../../helpers/Response.class");

const getCartTotalController = (req, res) => {
    try {
        if (!req.session.cart || !req.session.cart.length > 0)
            return new Response([], "Səbətiniz boşdur", false).error404(res)

        const userCart = req.session.cart;
        let cartTotal = 0

        let result = userCart.forEach(product => {
            cartTotal += Number(product.total.toFixed(2))
        });
        return new Response({
            result,
            userCart,
            cartTotal: cartTotal.toFixed(2)
        }, "OK", true).success(res)

    } catch (error) {
        return new Response(null, "Internal Server ERROR", false).error500(res)
    }
};
module.exports = { getCartTotalController }