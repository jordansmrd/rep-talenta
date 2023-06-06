module.exports = (sequelize, Sequelize) => {
 const Attendance = sequelize.define('Attendances', {
  clock_in: {
   type: Sequelize.STRING
  },
  clock_out: {
   type: Sequelize.STRING
  }
 });

 return Attendance;
};
