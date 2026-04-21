require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongooseConnection = require('./src/config/mongoose.config');

const userRouter = require('./src/routes/userRoutes');
const productRouter = require('./src/routes/productRoutes');

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});