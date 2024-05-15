const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Clients = db.Clients
const Users = db.Users
 
const createClient = async (userId) => {
    try{
        const [client, created] = await Clients.findOrCreate({
            where: {userId: userId},
            default: {userId: userId}
        });

        return client;
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error("Error finding or creating client");
    }
}
// Get all clients
const getClients = async (req, res) => {
    try {
        const clients = await Clients.findAll({
            include: [{
                model: Users,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'role'] }
            }]
        });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createClient,
    getClients
};