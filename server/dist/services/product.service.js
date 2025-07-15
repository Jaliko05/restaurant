var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../config/prisma.js";
export const getManyProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.findMany();
});
export const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.findUnique({
        where: { id: id.toString() },
    });
});
export const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.create({
        data: productData,
    });
});
export const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.update({
        where: { id: id },
        data: productData,
    });
});
