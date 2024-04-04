const express = require('express');
const router = express.Router();
const FacultyModel = require('../modules/facultymodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create a new faculty
router.post('/addfaculty', async (req, res) => {
  try {
    const { name, department, email, mobileNumber, age, password, role } = req.body;
    const exist = await FacultyModel.findOne({ email });
    if (exist) {
        return res.status(409).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = new FacultyModel({
      name,
      department,
      email,
      mobileNumber,
      age,
      password: hashedPassword,
      role
    });

    await newFaculty.save();

    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all faculties
router.get('/getfaculty', async (req, res) => {
  try {
    const faculties = await FacultyModel.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get faculty by ID
router.get('/getfaculty/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await FacultyModel.findById(id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.status(200).json(faculty);
  } catch (error) {
    console.error('Error fetching faculty by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update faculty by ID
router.put('/updatefaculty/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department, email, mobileNumber, age, password } = req.body;

  try {
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, {
      name,
      department,
      email,
      mobileNumber,
      age,
      password,
    }, { new: true });

    if (!updatedFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.status(200).json(updatedFaculty);
  } catch (error) {
    console.error('Error updating faculty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete faculty by ID
router.delete('/deletefaculty/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFaculty = await FacultyModel.findByIdAndDelete(id);
    if (!deletedFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await FacultyModel.findOne({ email });
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }
    
    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Verify token route
router.post('/verifyToken', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user based on token information
    const user = await FacultyModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user details
    return res.status(200).json(user);
  } catch (error) {
    console.log('Error verifying token: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token route
router.post('/verifytoken', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user based on token information
    const user = await FacultyModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user details
    return res.status(200).json(user);
  } catch (error) {
    console.log('Error verifying token: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/homedata/all', async (req, res) => {
  try {
    const facultyList = await FacultyModel.find().select('name email department homeData');
    res.status(200).json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty home data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/faculties/homedata/all', async (req, res) => {
  try {
    const faculties = await FacultyModel.find().select('name email homeData');
    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error fetching faculty home data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/savehomedata', async (req, res) => {
  const { email, homeData } = req.body;

  try {
    const faculty = await FacultyModel.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Save home data to the subdocument
    faculty.homeData = homeData;

    await faculty.save();

    res.status(200).json({ message: 'Home data saved successfully' });
  } catch (error) {
    console.error('Error saving home data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit Faculty Route
router.put('/editfaculty/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department, email, mobileNumber, age, password, role } = req.body;

  try {
    const faculty = await FacultyModel.findById(id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Update faculty information
    faculty.name = name;
    faculty.department = department;
    faculty.email = email;
    faculty.mobileNumber = mobileNumber;
    faculty.age = age;
    faculty.password = password; // You may want to handle password hashing here
    faculty.role = role;

    await faculty.save();

    res.status(200).json({ message: 'Faculty details updated successfully' });
  } catch (error) {
    console.error('Error updating faculty details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/fetchVoluntier", async(req,res)=>{
  try {
      const token = req.body.storedToken ;
      
      if (!token) {
          return res.status(401).json({ error: 'JWT must be provided' });
      }

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await FacultyModel.findOne({ email: verifyToken.email });
      if (!user) {
          return res.status(404).json({ error: 'No user found' });
      }

      return res.status(200).json({ message: 'User fetch successful', user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Verify token route
router.post('/verifytokens', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user based on token information
    const user = await FacultyModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user details
    return res.status(200).json(user);
  } catch (error) {
    console.log('Error verifying token: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// Export the router
module.exports = router;
