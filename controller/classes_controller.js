const classes = require('../models/classesModel'); // Assuming classesModel.js is the correct path

module.exports = {

    getallclasses: async (req, res) => {
        try {
             const { room_id } = req.params;
            const classesList = await classes.query().where('class_room_id', room_id)
            res.status(200).json(classesList);
        } catch (error) {
            console.error('Error getting rooms:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
   getClassandAttendance : async (req, res) => {
        try {
            const { classId } = req.params;
            const classData = await classes.query().findById(classId).withGraphFetched('attendance');
            if (!classData) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.status(200).json(classData);
        } catch (error) {
            console.error('Error getting class and attendance:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

   }

