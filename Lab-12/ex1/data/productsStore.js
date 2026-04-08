const products = [
  { id: 1, name: 'Laptop', price: 55000, category: 'Electronics' },
  { id: 2, name: 'Notebook', price: 120, category: 'Stationery' }
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function createProduct(name, price, category) {
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    category
  };

  products.push(newProduct);
  return newProduct;
}

function updateProduct(id, updates) {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  if (updates.name !== undefined) {
    product.name = updates.name;
  }

  if (updates.price !== undefined) {
    product.price = updates.price;
  }

  if (updates.category !== undefined) {
    product.category = updates.category;
  }

  return product;
}

function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const deleted = products[index];
  products.splice(index, 1);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
