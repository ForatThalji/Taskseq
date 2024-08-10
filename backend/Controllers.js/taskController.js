// controllers/taskController.js
const { Task } = require('../models/task');

// وظيفة لجلب كل المهام
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();  // جلب كل المهام من قاعدة البيانات
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
};

// وظيفة لجلب مهمة واحدة بناءً على المعرّف (ID)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);  // جلب المهمة بناءً على المعرّف
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the task' });
  }
};

// وظائف أخرى مثل إضافة، تعديل، حذف المهام يمكن إضافتها هنا
