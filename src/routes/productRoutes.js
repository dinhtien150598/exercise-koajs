const Router = require("koa-router");
const productHandle = require("../handlers/products/productHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware");

const productRoute = new Router({
  prefix: "/api",
});

/**
 * Get all products route - /api/products
 * - filter by limit/sort param,
 */
productRoute.get("/products", productHandle.getProducts);

/**
 * Get single product route - /api/products/:id
 */
productRoute.get("/products/:id", productHandle.getProduct);

/**
 * Create product route - /api/products
 */
productRoute.post(
  "/products",
  productInputMiddleware,
  productHandle.createProduct
);

/**
 * Update info product route - /api/products/:id
 */
productRoute.put(
  "/products/:id",
  productInputMiddleware,
  productHandle.updateProductHandler
);

/**
 * Delete product route - /api/products/:id
 */
productRoute.delete("/products/:id", productHandle.deleteProduct);

module.exports = productRoute;
