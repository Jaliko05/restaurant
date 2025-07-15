import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: "Sin autenticación" });
    const token = header.split(" ")[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch (_a) {
        res.status(401).json({ message: "Token inválido" });
    }
}
