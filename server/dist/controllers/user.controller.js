var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllUsers, getUserByEmail, createUser, login, updateRoleUser } from "../services/user.service.js";
export const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
export const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const newUser = yield createUser({ name, email, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
export const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    console.log("Email query parameter:", req.query);
    if (typeof email !== "string") {
        return res.status(400).json({ error: "Email query parameter is required and must be a string" });
    }
    try {
        const user = yield getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
export const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, user } = yield login(email, password);
        res.json({ token, user });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid credentials" });
    }
});
export const updateRoleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    try {
        const updatedUser = yield updateRoleUser(email, role);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user role" });
    }
});
