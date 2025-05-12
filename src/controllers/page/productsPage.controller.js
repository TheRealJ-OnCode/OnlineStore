const { default: axios } = require("axios")

const productsPageController = async (req, res) => {
    try {
        const query = new URLSearchParams(req.query);
        const uri = `${process.env.STORE_URI}/api/store/get/products?${query.toString()}`;
        const result = (await axios.get(uri)).data;
        const { products, currentPage, totalPages, categories } = result.data;
        res.render("shop", { products, currentPage, totalPages, categories });
    } catch (error) {
        res.status(500).send("Error fetching products.");
    }
};
module.exports = productsPageController
