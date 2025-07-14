import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../generated/prisma';

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string | CustomJwtPayload;
    }
  }
}
