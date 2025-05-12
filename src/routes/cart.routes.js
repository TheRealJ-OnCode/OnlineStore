const { addToCartController } = require("../controllers/cart/addToCart.controller");
const { clearCartController } = require("../controllers/cart/clearCart.controller");
const deleteFromCartController = require("../controllers/cart/deleteFromCart.controller");
const { getCartController } = require("../controllers/cart/getCart.controller");
const { getCartTotalController } = require("../controllers/cart/getCartTotal.controller");
const { removeFromCartController } = require("../controllers/cart/removeFromCart.controller");
const addToCartMiddleWare = require("../middlewares/cart/addToCart.middleware");
const removeFromCartMiddleware = require("../middlewares/cart/removeFromCartMiddleware");

const cartRoutes = require("express").Router();

cartRoutes.get("/cart/get", getCartController);
cartRoutes.get("/cart/get/total", getCartTotalController);
cartRoutes.post("/cart/add",addToCartMiddleWare, addToCartController);
cartRoutes.post("/cart/remove",removeFromCartMiddleware, removeFromCartController);
cartRoutes.post("/cart/clear", clearCartController);
cartRoutes.delete("/cart/delete",deleteFromCartController)


module.exports = cartRoutes