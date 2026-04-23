require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongooseConnection = require('./src/config/mongoose.config');

const userRouter = require('./src/routes/userRoutes');
const productRouter = require('./src/routes/productRoutes');
const categoryRouter = require('./src/routes/categoryRoutes');

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);

app.get('/', (req, res) => {
    res.send("The server is running..");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});