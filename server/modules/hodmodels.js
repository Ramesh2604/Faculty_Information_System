const mongoose = require('mongoose');

const hodDataSchema = new mongoose.Schema({
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

const hodSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  age: Number,
  password: String,
  role: String,
  hodData: hodDataSchema
});

const HodModel = mongoose.model('Hod', hodSchema);

module.exports = HodModel;
