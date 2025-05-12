const express = require("express");
const Router = require("./routes");
const connectDB = require("./db/connect");
const path = require("path");
const cors = require("cors");
const session = require("express-session"); // Add this line
const Order = require("./db/Order.model");
const pageNotFound404 = require("./middlewares/404/404.middleware");
const restirictAccessibility = require("./middlewares/vpn/restirictAccessibility.middleware");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.locals.basedir = path.join(__dirname, 'views');
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
    session({
        secret: process.env.SECRET_KEY || 'ahdhiosa!@#9dqjdwddqwjdqw..d87qwhd9wq||||dyuqwbdiqw8hbdqh23791273912',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, 
    })
);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`);
    });

    app.use(restirictAccessibility);
    app.use(Router);
    app.use(pageNotFound404);

}).catch(err => {
    console.error('Database connection failed:', err);
});
