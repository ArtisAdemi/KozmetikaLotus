const express = require('express');
const app = express();
const cors = require("cors");

const db = require("./models");// Getting models from ./models

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Mounting Routes

// UserRouter
const userRouter = require('./routes/users')
app.use("/users", userRouter);
// Auth Router
const authRouter = require('./routes/Auth');
app.use("/auth", authRouter);
// CategoryRouter
const categoryRouter = require('./routes/Categories');
app.use("/categories", categoryRouter)



// Creating sequelize sync with db
db.sequelize.sync().then(() => {
    // After sync is complete we start server
    app.listen(3001, () => {
        console.log(`Server started on port: 3001`);
    });
});