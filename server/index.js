require('dotenv').config();
const seedCategories = require("./seed/categoriesSeed")
const seedBrands = require("./seed/brandsSeed")
const express = require('express');
const cors = require("cors");

const app = express();
const db = require("./models");

// Middleware to parse JSON
app.use(express.json());
// CORS config
app.use(cors({
    origin: ['http://localhost:3000', 'https://kozmetika-lotus.vercel.app', 'https://kozmetika-lotus-3ng8.vercel.app'],
    credentials: true,
}));

// Creating a new router for the /api endpoint
const apiRouter = express.Router();

// Mounting Routes under /api endpoint

// UserRouter
const userRouter = require('./routes/Users');
apiRouter.use("/users", userRouter);
// Auth Router
const authRouter = require('./routes/Auth');
apiRouter.use("/auth", authRouter);
// Product router
const productRouter = require('./routes/Products');
apiRouter.use("/products", productRouter);
// CategoryRouter
const categoryRouter = require('./routes/Categories');
apiRouter.use("/categories", categoryRouter);
// OrderRouter
const orderRouter = require('./routes/Orders');
apiRouter.use("/orders", orderRouter);
// Mailer Routes
const mailerRouter = require("./routes/Mailer");
apiRouter.use("/mailer", mailerRouter);

const clientsRouter = require("./routes/Clients");
apiRouter.use("/clients", clientsRouter);

// Mount the apiRouter under the /api endpoint
app.use("/api", apiRouter);

// Creating sequelize sync with db
db.sequelize.sync().then(() => {
    seedCategories();
    seedBrands();
    // After sync is complete we start server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
});