module.exports = (sequelize, Sequelize) => {
 const User = sequelize.define(
  'Users',
  {
   name: {
    type: Sequelize.STRING
   },
   address: {
    type: Sequelize.STRING
   },
   password: {
    type: Sequelize.STRING
   },
   email: {
    type: Sequelize.STRING
   },
   avatar_url: {
    type: Sequelize.STRING
   },
   avatar_blob: {
    type: Sequelize.BLOB('long')
   }
  },
  {
   paranoid: true
  }
 );

 return User;
};
