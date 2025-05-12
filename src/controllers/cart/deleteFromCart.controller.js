const Response = require("../../helpers/Response.class");

const deleteFromCartController = (req, res) => {
    try {
        const { productId, variantKey } = req.body; 
        if (!req.session.cart || req.session.cart.length === 0)
            return new Response(null, "Səbət boşdur", false).error404(res);
        if (!productId) return new Response(null, "Product id əksikdir", false).error403(res);
        req.session.cart = req.session.cart.filter(item => {
            if (variantKey) {
                return !(item.productId === productId && item.variant === variantKey);
            }
            return item.productId !== productId;
        });
        if (req.session.cart.length === 0) {
            delete req.session.cart; 
        }
        return new Response(null, 'Məhsul səbəttən çıxarıldı', true).success(res);

    } catch (error) {
        console.log(error);
        return new Response(null, "Internal Server ERROR", false).error500(res);
    }
}

module.exports = deleteFromCartController;
