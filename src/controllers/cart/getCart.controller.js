const Response = require("../../helpers/Response.class");

const getCartController = (req, res) => {
    const cart = req.session.cart || [];
    
    return new Response(cart,"OK",true).success(res)

}
module.exports = { getCartController }