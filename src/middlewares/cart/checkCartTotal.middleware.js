const Response = require("../../helpers/Response.class");

const checkCartTotalMiddleware = (req,res,next) =>{
    const cart = req.session.cart;
    if (cart && Array.isArray(cart)) {
        const totalCartPrice = cart.reduce((sum, item) => sum + item.total, 0);
        if (totalCartPrice < 22) {
            return new Response(cart,"Minimum səbət miqdarı 22 azn təşkil etməlidir.",false).error(res,422)
        }
    }
    next()
};

module.exports = checkCartTotalMiddleware
