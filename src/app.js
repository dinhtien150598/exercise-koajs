const Koa = require("koa");
const koaBody = require("koa-body");
const products = require("./routes/productRoutes.js");

const app = new Koa();

app.use(koaBody());
app.use(products.allowedMethods());
app.use(products.routes());

app.listen(5000);
