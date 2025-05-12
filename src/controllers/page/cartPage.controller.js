const axios = require("axios");
const getCartTotal = require("../../helpers/cart/getCartTotal");

const cartPageController = (req, res) => {
    const { userCart, cartTotal } = getCartTotal(req);
    res.render("cart", { userCart, cartTotal });
};
module.exports = cartPageController;