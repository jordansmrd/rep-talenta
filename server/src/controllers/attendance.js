const db = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');
const attendanceController = {
 getByMonthAndUser: async (req, res) => {
  try {
   const { month, year, UserId } = req.body;
   const Attendance = await db.Attendance.findAll({
    // where: {
    //  createdAt: month,
    //  UserId: 1
    // }

    where: {
     [Sequelize.Op.and]: [
      Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month),
      Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year),
      { UserId }
     ]
    }
   });

   return res.send({
    value: Attendance
   });
  } catch (err) {
   console.log(err.message);
   return res.status(500).send(err.message);
  }
 },
 getToday: async (req, res) => {
  try {
   const { date, UserId } = req.query;
   //    date = moment(date).add(1, 'd').format('yyyy-MM-DD');
   const Attendance = await db.Attendance.findOne({
    where: {
     UserId,
     createdAt: {
      [Sequelize.Op.gt]: date,
      [Sequelize.Op.lte]: moment(date).add(1, 'd').format('yyyy-MM-DD')
     }
    }
   });
   console.log(Attendance);

   return res.send(Attendance);
  } catch (err) {
   console.log(err.message);
   return res.status(500).send(err.message);
  }
 },
 createAttendance: async (req, res) => {
  try {
   const { UserId, clock_in, clock_out } = req.body;
   const now = moment().format('yyyy-MM-DD');
   console.log(req.body);
   await db.sequelize.transaction(async () => {
    const cek = await db.Attendance.findOne({
     where: {
      UserId,
      createdAt: {
       [Sequelize.Op.gt]: now,
       [Sequelize.Op.lte]: moment(now).add(1, 'd').format('yyyy-MM-DD')
      }
     }
    });
    console.log(cek);

    if (cek && clock_out)
     await db.Attendance.update(
      {
       clock_out
      },
      {
       where: {
        id: cek.dataValues.id
       }
      }
     );
    else if (!cek && clock_in)
     await db.Attendance.create({
      clock_in,
      UserId
     });

    await db.Attendance.findOne({
     where: {
      createdAt: {
       [Sequelize.Op.gt]: now,
       [Sequelize.Op.lte]: moment(now).add(1, 'd').format('yyyy-MM-DD')
      },
      UserId
     }
    }).then((result) => res.send(result));
   });
  } catch (err) {
   console.log(err.message);
   res.status(500).send({
    message: err.message
   });
  }
 }
};

module.exports = attendanceController;
