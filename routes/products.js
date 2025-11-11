import express from 'express';
import { Product, getProducts, addProduct, getProductById, updateProduct, deleteProduct } from '../models/product.js';
import auth from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const router = express.Router();

// GET all products (filter, search, pagination)
router.get('/', (req, res) => {
    let products = getProducts();
    const { category, page = 1, limit = 10, search } = req.query;

    if (category) products = products.filter(p => p.category === category);
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginated = products.slice(start, end);

    res.json(paginated);
});

// GET product by ID
router.get('/:id', (req, res, next) => {
    const product = getProductById(req.params.id);
    if (!product) return next(new NotFoundError('Product not found'));
    res.json(product);
});

// POST create product
router.post('/', auth, validateProduct, (req, res) => {
    const newProduct = new Product(req.body);
    addProduct(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', auth, validateProduct, (req, res, next) => {
    const updated = updateProduct(req.params.id, req.body);
    if (!updated) return next(new NotFoundError('Product not found'));
    res.json(updated);
});

// DELETE product
router.delete('/:id', auth, (req, res, next) => {
    const deleted = deleteProduct(req.params.id);
    if (!deleted) return next(new NotFoundError('Product not found'));
    res.json(deleted);
});

// Product stats by category
router.get('/stats/category', (req, res) => {
    const products = getProducts();
    const stats = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    res.json(stats);
});

export default router;
