const express = require("express");
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/create', auth, admin, categoryController.createCategory);
router.put('/update', auth, admin, categoryController.updateCategory);
router.get('/all', categoryController.getAllCategory);
router.delete('/delete/:id', auth, admin, categoryController.deleteCategory);

module.exports = router;