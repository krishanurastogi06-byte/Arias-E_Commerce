const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, admin, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);
router.put('/:id', auth, admin, productController.updateProduct);

module.exports = router;