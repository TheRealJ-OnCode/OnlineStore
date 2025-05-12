const Response = require("../../helpers/Response.class");

const clearCartController = (req, res) => {
    req.session.cart = [];
    return new Response([],`Səbət Təmziləndi ${req.session.cart}`,true).success(res)
    


}
module.exports = { clearCartController }