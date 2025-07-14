import express from 'express';
import userRouter from './routes/user.route.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/users', userRouter);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});