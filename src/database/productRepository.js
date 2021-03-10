const fs = require("fs");
const products = require("./products.json");

/**
 * Get all products
 * @returns [...{}]
 */
const getAllProducts = () => {
  return products;
};

/**
 * Get limit products by key input
 * @param {number} limit
 * @returns {*}
 */
const getLimit = (limit) => {
  const limitProduct = products.slice(0, limit)
  return limitProduct
}

/**
 * Sort products by key input
 * @param {string} key
 * @returns {*}
 */
const sort = (key) => {
  if(key === 'asc') {
    const ascSort = products.sort((a, b) => (Number(a.createAt) - Number(b.createAt)))
    return ascSort
  } else if(key === 'desc') {
    const descSort = products.sort((a, b) => (Number(b.createAt) - Number(a.createAt)))
    return descSort
  } else throw new Error('Key sort invalid')
}

/**
 * Get fields product from fields param
 * @param [] fields
 * @returns {*}
 */
const getField = (fields) => {
  const result = products.map(item => {
    let a = {}
    for(let i = 0; i < fields.length; i++) {
      a[fields[i]] = item[fields[i]]
    }

    return {
      ...a,
      id: item.id
    }
  })
  return result
}

/**
 * Get single product
 * @param {string} id
 * @returns {*}
 */
const getOneProduct = (id) => {
  const product = products.find((product) => product.id === id);
  return product;
};

/**
 * Add product to products.json
 * @param {obj} product
 */
function addProduct(product) {
  const updateProduct = [...products, product];

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify(updateProduct)
  );
}

/**
 * Update product
 * @param {obj} product
 */
const updateProduct = (product) => {
  const newProduct = products.map((item) => {
    if (item.id === product.id)
      return {
        ...item,
        ...product,
      };
    return item;
  });

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify(newProduct)
  );
};

/**
 * Delete product
 * @param {obj} product
 */
const delProduct = (product) => {
  const result = products.filter(item => item.id !== product.id)

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify(result)
  )
}

module.exports = {
  getAllProducts,
  getLimit,
  sort,
  getField,
  getOneProduct,
  updateProduct,
  addProduct,
  delProduct
};
