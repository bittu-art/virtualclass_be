const rooms = require('../models/class_roomModel');

module.exports = {

    getallRooms: async (req, res) => {
        try {
            // const { name, user_type } = req.body;
            const allRooms = await rooms.query();
            res.status(200).json(allRooms);
        } catch (error) {
            console.error('Error getting rooms:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getallHistroy: async (req, res) => {
        try {
           
            const allRooms = await rooms.query().withGraphFetched('classes.[attendance.[users]]');
            res.status(200).json(allRooms);
        } catch (error) {
            console.error('Error getting rooms:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}