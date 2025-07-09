
const attendance=require('../models/attendanceModel')
// Assuming classesModel.js is the correct path

module.exports = {

    getallattendace: async (req, res) => {
        try {
             const { classId } = req.params;
            const attendanceData = await attendance.query().where({classes_id:classId,leave_time:null}).withGraphFetched('users');
            res.status(200).json(attendanceData);
        } catch (error) {
            console.error('Error getting rooms:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}