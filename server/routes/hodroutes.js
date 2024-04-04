const express = require('express');
const router = express.Router();
const HodModel = require('../modules/hodmodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv=require('dotenv').config();
// Create a new HOD
router.post('/addhod', async (req, res) => {
  try {
    const { name, department, email, mobileNumber, age, password ,role} = req.body;
    const exist = await HodModel.findOne({email});
        if (exist) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    const newHod = new HodModel({
      name,
      department,
      email,
      mobileNumber,
      age,
      password:hashedPassword,
      role,
    });

    await newHod.save();

    res.status(201).json({ message: 'addhod registered successfully' });
  } catch (error) {
    console.error('Error adding HOD:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all HODs
router.get('/gethod', async (req, res) => {
  try {
    const hods = await HodModel.find();
    res.status(200).json(hods);
  } catch (error) {
    console.error('Error fetching HODs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/gethod/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const hod = await HodModel.findById(id);
    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }
    res.status(200).json(hod);
  } catch (error) {
    console.error('Error fetching HOD by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatehod/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department, email, mobileNumber, age, password } = req.body;
  
  try {
    const updatedHod = await HodModel.findByIdAndUpdate(id, {
      name,
      department,
      email,
      mobileNumber,
      age,
      password,
    }, { new: true }); // Set { new: true } to return the updated document
  
    if (!updatedHod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    res.status(200).json(updatedHod);
  } catch (error) {
    console.error('Error updating HOD:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a HOD by ID
router.delete('/deletehod/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHod = await HodModel.findByIdAndDelete(id);
    if (!deletedHod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    res.status(200).json({ message: 'HOD deleted successfully' });
  } catch (error) {
    console.error('Error deleting HOD:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await HodModel.findOne({ email });
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }
    if(user && comparedPassword){
    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);
    return res.status(200).json({ token, user });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});


router.post('/savehoddata', async (req, res) => {
  const { email, hodData } = req.body;

  try {
    const hod = await HodModel.findOne({ email });
    if (!hod) {
      return res.status(404).json({ error: 'hod not found' });
    }

    // Save home data to the subdocument
    hod.hodData = hodData;

    await hod.save();

    res.status(200).json({ message: 'Hod data saved successfully' });
  } catch (error) {
    console.error('Error saving hod data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/hoddata/all', async (req, res) => {
  try {
    const hods = await HodModel.find().select('name email hodData');
    res.status(200).json(hods);
  } catch (error) {
    console.error('Error fetching HOD data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// // Verify token route
// router.post('/verifyToken', async (req, res) => {
//   const { token } = req.body;
  
//   if (!token) {
//     return res.status(400).json({ message: 'Token is required' });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Find user based on token information
//     const user = await HodModel.findOne({ email: decoded.email });
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Return user details
//     return res.status(200).json(user);
//   } catch (error) {
//     console.log('Error verifying token: ', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

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
    const user = await HodModel.findOne({ email: decoded.email });
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
router.post('/verifytokens', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user based on token information
    const user = await HodModel.findOne({ email: decoded.email });
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

router.post("/fetchVoluntier", async(req,res)=>{
  try {
      const token = req.body.storedToken ;
      
      if (!token) {
          return res.status(401).json({ error: 'JWT must be provided' });
      }

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await HodModel.findOne({ email: verifyToken.email });
      if (!user) {
          return res.status(404).json({ error: 'No user found' });
      }

      return res.status(200).json({ message: 'User fetch successful', user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;