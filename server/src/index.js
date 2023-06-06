const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
const routes = require('./routes');
const db = require('./models/');
// db.sequelize.sync({ alter: true });

app.get('/', (req, res) => res.send('sequelize'));

app.use('/auth', routes.userRoutes);
app.use('/attendances', routes.attendanceRoutes);
app.use('/avatar', express.static(`${__dirname}/public/images`));
// localhost:2000/avatar/
// app.use('/attendance', routes.programRoutes);

app.listen(PORT, () => {
 console.log(`server is running on port ${PORT}`);
});
