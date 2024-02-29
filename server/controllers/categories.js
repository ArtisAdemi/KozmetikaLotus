const db = require("../models");
const Categories = db.Categories;

 
// Controller functions

// Get categories
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


// Post Category

const registerCategory = async (req, res) => {
    const { name } = req.body;
    try{
        
        // Create a new category in database
        const newCategory = await Categories.create({
            name: name
        });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}



// export controller functions
module.exports = {
    getCategories,
    registerCategory
};