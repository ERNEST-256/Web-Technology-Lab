const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../data/productsStore');

function listProducts(req, res) {
  res.json(getAllProducts());
}

function fetchProductById(req, res) {
  const id = Number(req.params.id);
  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(product);
}

function addProduct(req, res) {
  const { name, price, category } = req.body || {};

  if (!name || price === undefined || !category) {
    return res.status(400).json({
      message: 'name, price and category are required'
    });
  }

  const product = createProduct(name, Number(price), category);
  return res.status(201).json(product);
}

function editProduct(req, res) {
  const id = Number(req.params.id);
  const product = updateProduct(id, req.body || {});

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json({ message: 'Product updated', product });
}

function removeProduct(req, res) {
  const id = Number(req.params.id);
  const deletedProduct = deleteProduct(id);

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json({ message: 'Product deleted', deletedProduct });
}

module.exports = {
  listProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct
};
