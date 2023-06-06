module.exports = (sequelize, Sequelize) => {
 const Company = sequelize.define(
  'Companies',
  {
   name: {
    type: Sequelize.STRING
   },
   address: {
    type: Sequelize.STRING
   }
  },
  {
   paranoid: true
  }
 );

 return Company;
};
