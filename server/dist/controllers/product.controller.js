"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getManyProductsController = void 0;
const product_service_1 = require("../services/product.service");
const getManyProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, product_service_1.getManyProducts)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getManyProductsController = getManyProductsController;
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, product_service_1.getProductById)(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
exports.getProductByIdController = getProductByIdController;
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description } = req.body;
    try {
        const newProduct = yield (0, product_service_1.createProduct)({ name, price, description });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
exports.createProductController = createProductController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = yield (0, product_service_1.updateProduct)(id, { name, price, description });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
});
exports.updateProductController = updateProductController;
