const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./database/database");

const apiRoutes = require('./routes/api');


dotenv.config();
const app = express();

db.sequelize.sync({ force: false})
  .then(async () => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Error syncing db: ", err.message);
  });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ message: 'Hello World! 🌈🌈' });
});
app.use('/api/v1', apiRoutes);



app.listen(process.env.PORT, () =>
  console.log(`App listening on http://localhost:${process.env.PORT} ! 🚀🚀`)
);