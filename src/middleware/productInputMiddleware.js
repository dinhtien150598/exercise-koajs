const yup = require("yup");

async function productInputMiddleware(ctx, next) {
  try {
    const products = ctx.request.body;

    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().integer(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      image: yup.string(),
    });

    await schema.validate(products);

    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = productInputMiddleware;
