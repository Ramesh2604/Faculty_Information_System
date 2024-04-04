const mongoose = require('mongoose');

const homeDataSchema = new mongoose.Schema({
  
  panNumber: String,
  qualification: String,
  experience: String,
  dateOfJoining: String,
  aadharNumber: String,
  bloodGroup: String,
  address: String,
  subjectExpertise: String,
  certificates: String,
  basicSalary: String,
});

const facultySchema = new mongoose.Schema({
  name: String,
  department: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  age: Number,
  password: String,
  role: String,
  homeData: homeDataSchema
});

const FacultyModel = mongoose.model('Faculty', facultySchema);



module.exports = FacultyModel;
