var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getManyProducts, getProductById, createProduct, updateProduct } from "../services/product.service.js";
export const getManyProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield getManyProducts();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
export const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
export const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description } = req.body;
    try {
        const newProduct = yield createProduct({ name, price, description });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
export const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = yield updateProduct(id, { name, price, description });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
});
