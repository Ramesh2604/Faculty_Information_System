const express = require('express');
const router = express.Router();
const DailyUpdate = require("../modules/dailyupdatemodels")

router.post('/adddailyupdate', async (req, res) => {
    const { description, department, date } = req.body;
  
    try {
      const newUpdate = new DailyUpdate({
        description,
        department,
        date
      });
  
      await newUpdate.save();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.get('/getdailyupdates', async (req, res) => {
    try {
      const updates = await DailyUpdate.find(); // Retrieve all daily updates
      res.json(updates)// Assuming you're using a template engine like EJS or Handlebars
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  // Export the router
module.exports = router;