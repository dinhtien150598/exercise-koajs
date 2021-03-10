const {
  getAllProducts,
  getLimit,
  sort,
  getField,
  getOneProduct,
  updateProduct,
  addProduct,
  delProduct
} = require("../../database/productRepository");
const faker = require("faker");

/**
 *
 * @param ctx
 * @returns {Promise<{status: string, products: {}}|{status: string, products}|{status: string}|{SortProduct: *, status: string}>}
 */
async function getProducts(ctx) {
  try {
    const limit = parseInt(ctx.query.limit)
    const sortKey = ctx.query.sort
    const fieldKey = ctx.query.fields
    if(ctx.query.limit || ctx.query.sort || ctx.query.fields) {
      if(fieldKey) {
        const keyField = fieldKey.split(',')
        const productField = getField(keyField)
        return (ctx.body = {
          status: 'success',
          products: productField
        })
      }
      if(limit) {
        const items = getLimit(limit)
        return (ctx.body = {
          status: 'success',
          products: items
        })
      }
      if(sort) {
         const items = sort(sortKey)
          return (ctx.body = {
            status: 'success',
            sortProduct: items
          })
      }
    }

    const products = getAllProducts();
    return (
      ctx.body = {
        status: 'success',
        products
      }
    )
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: *}|{success: boolean, error}>}
 */
async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        status: 'success',
        data: getCurrentProduct,
      });
    }

    throw new Error( `Product Not Found with id = ${id} !`)
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{product: {cancel(reason?: any): Promise<void>, pipeTo(dest: WritableStream<Uint8Array>, options?: PipeOptions): Promise<void>, pipeThrough<T>({writable, readable}: {writable: WritableStream<Uint8Array>, readable: ReadableStream<T>}, options?: PipeOptions): ReadableStream<T>, getReader: {(options: {mode: "byob"}): ReadableStreamBYOBReader, (): ReadableStreamDefaultReader<Uint8Array>}, tee(): [ReadableStream<Uint8Array>, ReadableStream<Uint8Array>], id: *, readonly locked: boolean, createAt: Date}, status: string}|{success: boolean, error}>}
 */
async function createProduct(ctx) {
  try {
    const data = ctx.request.body;
    const createData = {
      id: faker.random.uuid(),
      createAt: new Date(),
      ...data
    }
    addProduct(createData);

    ctx.status = 201
    return (
      ctx.body = {
      status: "success",
      product: createData,
    });
  } catch (e) {
    ctx.status = 400;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error}|{updateProduct: {[p: string]: *}, status: string}|{message: string, status: string}>}
 */
async function updateProductHandler(ctx) {
  try {
    const { id } = ctx.params
    const data = ctx.request.body
    const product = getOneProduct(id);
    if (product) {
      const updateInfo = {
        ...product,
        ...data
      }
      updateProduct(updateInfo)
      return (ctx.body = {
        status: 'success',
        updateProduct: updateInfo,
      })
    }

    return (ctx.body = {
      status: "error!",
      message: "Product Not Found !",
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error}|{message: string, status: string}>}
 */
async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if(getCurrentProduct) {
      delProduct(getCurrentProduct)

      ctx.status = 200
      return (ctx.body = {
        status: 'success',
        message: `Delete product : ${getCurrentProduct}`
      })
    }

    ctx.status = 404;
    return (ctx.body = {
      status: "error!",
      message: "Product Not Found!",
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProductHandler,
  deleteProduct
};
