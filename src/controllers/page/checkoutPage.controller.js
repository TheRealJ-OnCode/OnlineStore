const getcartTotal = require("../../helpers/cart/getCartTotal")
const checkoutPageController = (req,res) =>{
    const {cartTotal,userCart} = getcartTotal(req)
   
      
    if(!userCart || !userCart.length)
        return res.redirect("/");
    
    res.render("checkout",{userCart,cartTotal})
};
module.exports = checkoutPageController;