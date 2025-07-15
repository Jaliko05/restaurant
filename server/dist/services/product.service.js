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
exports.updateProduct = exports.createProduct = exports.getProductById = exports.getManyProducts = void 0;
const prisma_1 = require("../config/prisma");
const getManyProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.product.findMany();
});
exports.getManyProducts = getManyProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.product.findUnique({
        where: { id: id.toString() },
    });
});
exports.getProductById = getProductById;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.product.create({
        data: productData,
    });
});
exports.createProduct = createProduct;
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.product.update({
        where: { id: id },
        data: productData,
    });
});
exports.updateProduct = updateProduct;
