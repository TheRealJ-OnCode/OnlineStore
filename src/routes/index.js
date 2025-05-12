const Router = require("express").Router();

Router.use(require("./page.routes"));
Router.use(require("./cart.routes"));
Router.use(require("./order.routes"));
Router.use(require("./script.routes"));
// Router.use(require("./test.routes"));

module.exports = Router;