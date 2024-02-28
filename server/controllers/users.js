const db = require("../models");
const Users = db.Users;
// Getting Sequelize Users model
// const Users = require('../models/Users');
const bcrypt = require('bcrypt')

// Controller functions

// Get users
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// Get UserById
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await Users.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found"})
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Register User

const registerUser = async (req, res) => {
    console.log("--------------------------------------")
    const { email, username, role, password} = req.body;
    try{
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user in database
        const newUser = await Users.create({
            email: email,
            username: username,
            role: role,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// export controller functions
module.exports = {
    getUsers,
    getUserById,
    registerUser
};