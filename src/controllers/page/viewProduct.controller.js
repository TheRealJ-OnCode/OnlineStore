const { default: axios } = require("axios");
const Response = require("../../helpers/Response.class");

const viewProductController = async (req, res) => {
    try {
        const { pid, product_name } = req.query
        if (!pid || !product_name) return new Response().redirect(res, "/")
        const link = process.env.STORE_URI + "/api/store/get/product/details?pid=" + pid + "&product_name=" + product_name
       
        const response = (await axios.get(link)).data
        if(!response.data) return new Response().redirect(res,"/")
        const link2 = process.env.STORE_URI + "/api/store/search/products?product_category="+response.data.product_category+"&limit=6"
        const productsInSameCategory = (await axios.get(link2)).data;
        
        const data = {
            uri:req.originalUrl,
            product:response.data,
            categoryProducts:productsInSameCategory.data
        }
        res.render("product-details",data)
    } catch (error) {   
        console.log(error);
        new Response(null,"Server Error",false).error500(res);
        
    }


};



module.exports = viewProductController;