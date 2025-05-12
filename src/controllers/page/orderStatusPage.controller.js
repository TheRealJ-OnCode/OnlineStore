const orderStatusPageController = (req, res) => {
    const { status , orderID} = req.query;
    if (!status || !orderID) return res.redirect("/");
    const pageTitle = status === "success" && orderID ? "Uğurlu Sifariş" : "Uğursuz Sifariş";
    const message =  status === "success" && orderID ? `
    Sifarişiniz qəbul olundu , əməkdaşlarımız sizinlə qısa zamanda əlaqə saxlayacaq.
    <br>
    <span> Sifariş Nömrəsi : ${orderID}</span>
    ` : ` 
    Sifariş Qəbul Olunmadı.Bir müddət sonra yenidən cəhd edin...
    <br>
    Bundan başqa siz <span>mobil nömrə</span> ilə əlaqə saxlayaraq da sifariş verə bilərsiniz.
    `;
    const img = status === "success" && orderID ? "orderStatus.png" :  "orderStatus-2.png"
    res.render("order-status",{pageTitle,message,img});


}

module.exports = orderStatusPageController