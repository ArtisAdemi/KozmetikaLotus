const express = require('express');
const app = express();
const cors = require("cors");

const db = require("./models");// Getting models from ./models

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Creating a new router for the /api endpoint
const apiRouter = express.Router();

// Mounting Routes under /api endpoint

// UserRouter
const userRouter = require('./routes/users')
apiRouter.use("/users", userRouter);
// Auth Router
const authRouter = require('./routes/Auth');
apiRouter.use("/auth", authRouter);
// Product router
const productRouter = require('./routes/Products')
apiRouter.use("/products", productRouter);
// CategoryRouter
const categoryRouter = require('./routes/Categories');
apiRouter.use("/categories", categoryRouter)

// Mount the apiRouter under the /api endpoint
app.use("/api", apiRouter)

// Creating sequelize sync with db
db.sequelize.sync().then(() => {
    // After sync is complete we start server
    app.listen(3001, () => {
        console.log(`Server started on port: 3001`);
    });
});