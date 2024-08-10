const express = require('express');
const router = express.Router();
const { User } = require('./models'); // تأكد من المسار الصحيح لنموذج Task

// إنشاء مستخدم جديد
app.post('/api/users', async (req, res) => {
    try {
      const { name, email,password } = req.body;
      const user = await User.create({ name, email,password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = {router};
