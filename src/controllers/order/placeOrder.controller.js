const axios = require("axios");
const Cart = require("../../db/Cart.model");
const Order = require("../../db/Order.model");
const generateOrderCode = require("../../helpers/generateOrderCode");
const Response = require("../../helpers/Response.class");
require("dotenv").config()
const adminServer = process.env.STORE_URI;

const placeOrderController = async (req, res) => {
    const userId = req.user ? req.user._id : null;
    const { address, name, surname, phone } = req.body

    let customerInfo = { name, surname, phone }
    let cartItems;

    if (req.user) {
        const cartData = await Cart.findOne({ userId })
        cartItems = cartData ? cartData.items : [];
    } else {
        cartItems = req.session.cart
    }
    if (!cartItems || !cartItems.length) {
        return new Response(cartItems, "Səbət boşdur", false).error(res, 400);
    }
    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const orderCode = generateOrderCode();


    const newOrder = new Order({
        address, customerInfo,
        orderCode, userId, items: cartItems, totalAmount, status: 'Pending'
    });
    try {
        await newOrder.save();
        axios.post(`${adminServer}/notify-order`, {
            orderCode,
            totalAmount
        })
            .then(response => {
                console.log('Admin notified:', response.data);
            })
            .catch(error => {
                console.error('Error notifying admin:', error.message);
            });

        // ! reduce stock 
        fetch(process.env.STORE_URI + "/api/store/reduce/stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.session.cart)
        })
            .then(response => response.json())
            .then(async response => {
                console.log(response);
                if (req.user) {
                    await Cart.findOneAndDelete({ userId });
                } else {
                    req.session.cart = [];
                    req.session.save();
                }
                new Response(newOrder, `Sifariş qəbul edildi, sifariş kodu : ${orderCode}`, true).success(res);
            })
            .catch(err => {
                console.log(err)
                new Response({ newOrder, cartItems, err }, "Sifariş qəbul edilmədi.", false).error500(res)
            })












    } catch (error) {
        console.log("WE HAVE ERROR IN PLACEORDER.CONTROLLER.JS");

        console.log(error)
        new Response({ newOrder, cartItems }, "Sifariş qəbul edilmədi.", false).error500(res)
    }


};
module.exports = placeOrderController