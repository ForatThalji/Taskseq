const express = require('express');
const router = express.Router();
const { Task } = require('./models'); // تأكد من المسار الصحيح لنموذج Task

// إنشاء مهمة جديدة
router.post('/', async (req, res) => {
  try {
    const { title, desc, isDeleted } = req.body;
    const task = await Task.create({ title, desc, isDeleted });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.findAll({
        where: {
          isDeleted: false
        }
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = {router};
