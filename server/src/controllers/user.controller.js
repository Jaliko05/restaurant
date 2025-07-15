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
exports.updateRoleUserController = exports.loginController = exports.getUserController = exports.createUserController = exports.getUsersController = void 0;
const user_service_1 = require("../services/user.service");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getUsersController = getUsersController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const newUser = yield (0, user_service_1.createUser)({ name, email, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.createUserController = createUserController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    console.log("Email query parameter:", req.query);
    if (typeof email !== "string") {
        return res.status(400).json({ error: "Email query parameter is required and must be a string" });
    }
    try {
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
exports.getUserController = getUserController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, user } = yield (0, user_service_1.login)(email, password);
        res.json({ token, user });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid credentials" });
    }
});
exports.loginController = loginController;
const updateRoleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    try {
        const updatedUser = yield (0, user_service_1.updateRoleUser)(email, role);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user role" });
    }
});
exports.updateRoleUserController = updateRoleUserController;
