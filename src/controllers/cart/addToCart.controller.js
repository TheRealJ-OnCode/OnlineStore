const { default: axios } = require("axios");
const Response = require("../../helpers/Response.class");

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, variant } = req.body;
        let cart = req.session.cart || [];
        const requestURI = process.env.STORE_URI + "/api/store/find/product?pid=" + productId;

        const product = ((await axios.get(requestURI)).data).data
        
        if (!product) return new Response(null, "Məhsul tapılmadı", false).error404(res);

        if (variant) {
            const productVariant = product.product_alternatives.find(alt => alt.key === variant);
            if (!productVariant) {
                return new Response(null, "Seçilen varyant mövcud deyil", false).error404(res);
            }
            const existingItem = cart.find(item => item.productId === productId && item.variant === variant);
            const totalInCart = existingItem ? existingItem.quantity : 0;
            if (totalInCart + quantity > productVariant.count) {
                return new Response(null, `Stokda bu qədər yoxdur.`, false).error404(res);

            }
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ productId, name: product.product_name, price: Number(productVariant.price), quantity: Number(quantity), img: product.product_images[0], category: product.product_category, variant })
            }
        } else {
            const existingItem = cart.find(item => item.productId === productId);
            const totalInCart = existingItem ? existingItem.quantity : 0

            if (totalInCart + quantity > product.product_count) {
                return new Response(null, `Stokda bu qədər yoxdur.`, false).error404(res);
            }
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                cart.push({ productId, name: product.product_name, price: Number(product.product_sales_price), quantity: Number(quantity), img: product.product_images[0], category: product.product_category, variant })
            }
        }
        cart.forEach(cartItem => {
            cartItem.total = Number((cartItem.price * cartItem.quantity).toFixed(2));
        })



        req.session.cart = cart;
        return new Response(req.session.cart, "Məhsul əlavə edildi", true).success(res);
    } catch (error) {
        console.log(error);
        return new Response(null, "Internal Server ERROR", false).error500(res);
    }
};

module.exports = { addToCartController };
