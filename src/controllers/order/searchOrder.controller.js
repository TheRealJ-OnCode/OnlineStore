const Order = require("../../db/Order.model");
const Response = require("../../helpers/Response.class");

const searchOrderController = async (req, res) => {
    try {
        const {orderId} = req.body;

        
        const order = await Order.findOne({ orderCode: orderId });
        if(!order) return new Response(null,"Order not found",false).error404(res)
        const {orderCode,customerInfo,totalAmount,status} = order
        return new Response({orderCode,customerInfo,totalAmount,status}, "OK", true).success(res);
    } catch (error) {
        console.log("ERROR IN SEARCHORDER.CONTROLLER.JS");
        console.log(error)
        return new Response(null, "INTERNAL SERVER ERROR", false).error500(res);

    }


};
module.exports = searchOrderController