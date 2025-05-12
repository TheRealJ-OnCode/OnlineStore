const { default: axios } = require("axios")

const indexPageController = async(req, res) => {
    const {randomProducts,newProducts} = (await axios.get(process.env.STORE_URI+"/api/store/get/homepageproducts")).data?.data
    


    res.render("index",{randomProducts,newProducts})
}
module.exports = indexPageController