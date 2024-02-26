const db = require("./models");// Getting models from ./models

// Creating sequelize sync with db
db.sequelize.sync().then(() => {
    // After sync is complete we start server
    app.listen(3001, () => {
        console.log(`Server started on port: 3001`);
    });
});