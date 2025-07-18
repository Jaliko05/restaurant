import { Request, Response } from "express";
import { getManyProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../services/product.service";

export const getManyProductsController = async (req: Request, res: Response) => {
    try {
        const users = await getManyProducts();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

export const createProductController = async (req: Request, res: Response) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = await createProduct({ name, price, description });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = await updateProduct(id, { name, price, description });
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}