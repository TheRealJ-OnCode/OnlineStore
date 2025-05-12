const getCartTotal = (req) => {
    if (!req.session.cart || !req.session.cart.length > 0)
        return { userCart: [], cartTotal: 0 }

    const userCart = req.session.cart;
    let cartTotal = 0
    userCart.forEach(product => {
        cartTotal += Number(product.total.toFixed(2))
    });

    return {
        userCart,
        cartTotal: cartTotal.toFixed(2)
    }
}
module.exports = getCartTotal