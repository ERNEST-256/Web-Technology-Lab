const express = require('express');
const {
  listProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', fetchProductById);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

module.exports = router;
