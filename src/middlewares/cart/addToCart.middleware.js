const Response = require("../../helpers/Response.class");

const addToCartMiddleWare = (req,res,next) => {
    const { productId,  quantity } = req.body;

    if (!productId  || !quantity) {
        return new Response(null,'Əksik məlumatlar var',false).error(res,400)
    }

    if (isNaN(quantity)) {
        return new Response(null,'Miqdar və Qiymət rəqəm olmalıdır',false).error404(res)
    }

    next();
}

module.exports = addToCartMiddleWare
