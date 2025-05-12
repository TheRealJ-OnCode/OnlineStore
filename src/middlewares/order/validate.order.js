const yup = require("yup");
const Response = require("../../helpers/Response.class");
const schema = yup.object().shape({
    name: yup.string()
        .required("Ad boş ola bilməz"),
    surname: yup.string()
        .required("Soyad boş ola bilməz"),
        phone: yup.string()  
        .matches(/^\d+$/, "Telefon nömrəsi rəqəm olmalıdır")  // Ensure it's all digits
        .length(10, "Telefon nömrəsi düzgün deyil, 10 rəqəm olmalıdır")  // Exactly 10 digits
        .required("Telefon nömrəsi boş ola bilməz"),
    address: yup.string()
        .required("Adres boş ola bilməz")
})
const validateOrder = (req, res, next) => {
    const { name, surname, phone, address } = req.body;
    schema.validate({ name, surname, phone, address }, { abortEarly: false })
        .then(() => {
            next()
        })
        .catch(err => {
            console.log("Validasya xətası", err.errors.join(","));
            return new Response(req.body,err.errors.join(","),false).error429(res);

        })
}
module.exports = validateOrder