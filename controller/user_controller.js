const userModel = require('../models/userModel');

module.exports = {

    createUser: async (req, res) => {
        try {
            const { name, user_type } = req.body;
            const newUser = await userModel.query().insert({
                name,
                user_type
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}