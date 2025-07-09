
const classes = require('../models/classesModel');
const attendance = require('../models/attendanceModel')
module.exports = (socket, io) => {

    socket.on('joinclass', async ({ roomId, userData }) => {

        const classdata = await classes.query().where({ class_room_id: roomId, is_started: true }).first();

        if (userData?.user_type == 'student') {
            console.log(classdata)
            if (classdata) {

                socket.currentClassId = classdata.id;
                socket.currentUserId = userData.userId;
                socket.currentUserType = userData.user_type;

                try {
                    const data = {
                        classes_id: classdata.id,
                        user_id: userData.userId,
                        join_time: (new Date()).toISOString(),

                    }
                    await attendance.query().insert(data)
                    socket.join(classdata.id);
                   
                    io.to(classdata.id).emit('newuserjoined', userData)
                } catch (err) {
                    console.log(err)
                }



                socket.emit('allowed', classdata.id);
                // socket.to(classId).emit('message', `User ${socket.id.substring(0, 4)}... has joined ${classId}.`);
            } else {
                socket.emit('notallowed', roomId)
            }

        } else {
            const classExists = await classes.query().where({ class_room_id: roomId, is_started: true })
            socket.currentUserId = userData.userId;
                socket.currentUserType = userData.user_type;
            if (classExists.length) {
                socket.join(classExists[0].id);
                socket.emit('allowed', classExists[0].id);
                socket.currentClassId = classExists[0].id;
                
                // socket.emit('alreadyexistclass', classExists.id)
            } else {
                const newclass = await classes.query().insert({ class_room_id: roomId });
                const data = {
                    classes_id: newclass.id,
                    user_id: userData.userId,
                    join_time: (new Date()).toISOString(),

                }
                await attendance.query().insert(data)
                socket.join(newclass.id);
                socket.emit('allowed', newclass.id);
                socket.currentClassId = newclass.id;

            }





        }



    });

    socket.on('startclass', async ({ classId, room_id, userData }) => {
        if (userData.user_type == 'teacher') {
            const classExists = await classes.query().where({ class_room_id: room_id, is_started: true })
            if (!classExists.length) {

                await classes.query().update({ start_time: (new Date()).toISOString(), is_started: true }).where({ id: classId })
                socket.emit('classstarted', classId)
            } else {
                socket.emit('classexists', room_id)
            }

        }
    })
    socket.on('endclass', async ({ classId, userData }) => {

        classId = parseInt(classId)

        const classdata = await classes.query().findById(classId)
        console.log('classdata', classdata, classdata.is_started)

        if (classdata.is_started) {
            if (userData.user_type == 'teacher') {
                await classes.query().update({ end_time: (new Date()).toISOString(), is_started: false }).where({ id: classId })
                await attendance.query().update({ leave_time: (new Date()).toISOString() }).where({ classes_id: classId })
                io.to(classId).emit('classended', classId)
                console.log('class ended')
            }
        } else {
            io.to(classId).emit('classended', classId)
        }




    })

    socket.on('getattendance', async ({ classId }) => {
        const attendanceData = await attendance.query().where({ classes_id: classId }).withGraphFetched('users');
        socket.emit('attendance', attendanceData)
    })
    socket.on('joinclassbyId', async (id) => {
        console.log('joining by id', id)
        socket.join(id);
    })


    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
        if (socket.currentClassId && socket.currentUserId) {
            if (socket.currentUserType === 'teacher') {
                const classId = parseInt(socket.currentClassId);
                const classdata = await classes.query().findById(classId)
                console.log('classdata', classdata, classdata.is_started)

                if (classdata.is_started) {
                   
                        await classes.query().update({ end_time: (new Date()).toISOString(), is_started: false }).where({ id: classId })
                        await attendance.query().update({ leave_time: (new Date()).toISOString() }).where({ classes_id: classId })
                        io.to(classId).emit('classended', classId)
                        console.log('class ended')
                    
                } else {
                    io.to(classId).emit('classended', classId)
                }
            }
            await attendance.query()
                .update({ leave_time: new Date().toISOString() })
                .where({
                    classes_id: socket.currentClassId,
                    user_id: socket.currentUserId,
                    leave_time: null // Only update if not already set
                });

                 io.to(socket.currentClassId).emit('userremoved', socket.currentUserId)
            console.log(`Marked leave_time for user ${socket.currentUserId} in class ${socket.currentClassId}`);
        }
    });
}