const cartPageController = require("../controllers/page/cartPage.controller");
const checkoutPageController = require("../controllers/page/checkoutPage.controller");
const indexPageController = require("../controllers/page/indexPage.controller");
const productsPageController = require("../controllers/page/productsPage.controller");
const trackOrderPageController = require("../controllers/page/trackOrderPage.controller");
const viewProductController = require("../controllers/page/viewProduct.controller");
const pageRoutes = require("express").Router();
pageRoutes.get("/", indexPageController);
pageRoutes.get("/products",productsPageController);
pageRoutes.get("/cart",cartPageController);
pageRoutes.get("/track-order",trackOrderPageController);
pageRoutes.get("/checkout",checkoutPageController);
pageRoutes.get("/product/view",viewProductController)


module.exports = pageRoutes