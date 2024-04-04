// app.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const hodRoutes = require("./routes/hodroutes")
const facultyRoutes = require("./routes/facultyRoutes");
const dailyUpdateRoutes= require('./routes/dailyupdateroutes')
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://erameshmca40:FISystem@cluster0.kuzpea5.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api/hod', hodRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/dailyupdate',dailyUpdateRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
