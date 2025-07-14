import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            // Type guard to ensure decoded is an object with our expected properties
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                req.user = decoded as CustomJwtPayload;
            } else {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
