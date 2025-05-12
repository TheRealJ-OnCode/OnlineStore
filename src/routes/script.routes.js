const scriptRoutes = require("express").Router();
const path = require("path");



// ! details MVC
scriptRoutes.get("/js/models/detailsPageModel/detailsView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/detailsPageModel/detailsView.js"))
})
scriptRoutes.get("/js/models/detailsPageModel/detailsModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/detailsPageModel/detailsModel.js"))
})
// ! checkout MVC
scriptRoutes.get("/js/models/checkoutPageModel/checkoutView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/checkoutPageModel/checkoutView.js"))
})
scriptRoutes.get("/js/models/checkoutPageModel/checkoutModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/checkoutPageModel/checkoutModel.js"))
})
//  ! nav MVC
scriptRoutes.get("/js/models/navModel/navView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/navModel/navView.js"))
})
scriptRoutes.get("/js/models/navModel/navModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/navModel/navModel.js"))
})
// ! product mvc;

scriptRoutes.get("/js/models/cartPageModel/cartView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/cartPageModel/cartView.js"))
})
scriptRoutes.get("/js/models/cartPageModel/cartModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/cartPageModel/cartModel.js"))
})
// ! shop mvc;
scriptRoutes.get("/js/models/shopPageModel/shopView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/shopPageModel/shopView.js"))
})
scriptRoutes.get("/js/models/shopPageModel/shopModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/shopPageModel/shopModel.js"))
})
// ! track Order MVC
scriptRoutes.get("/js/models/trackOrderPageModel/trackOrderView",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/trackOrderPageModel/trackOrderView.js"))
})
scriptRoutes.get("/js/models/trackOrderPageModel/trackOrderModel",(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/public/js/models/trackOrderPageModel/trackOrderModel.js"))
})

// ! Dom Utils

scriptRoutes.get("/js/models/utils/DOM.utils", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/public/js/models/utils/DOM.utils.js"))
})

// ! Cart Utils
scriptRoutes.get("/js/models/utils/Cart.utils", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/public/js/models/utils/Cart.utils.js"))
})



// ! notifaction helpers


scriptRoutes.get("/js/models/helpers/displayCartNotification", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/public/js/models/helpers/displayCartNotification.js"))
})
module.exports = scriptRoutes