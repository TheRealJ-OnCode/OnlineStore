const placeOrderController = require("../controllers/order/placeOrder.controller");
const searchOrderController = require("../controllers/order/searchOrder.controller");
const orderStatusPageController = require("../controllers/page/orderStatusPage.controller");
const checkCartTotalMiddleware = require("../middlewares/cart/checkCartTotal.middleware.js");
const validateOrder = require("../middlewares/order/validate.order");

const orderRoutes = require("express").Router();

orderRoutes.post("/order/place",[validateOrder,checkCartTotalMiddleware], placeOrderController);
orderRoutes.get("/orderStatus",orderStatusPageController);
orderRoutes.post("/order/search/",searchOrderController)
module.exports = orderRoutes