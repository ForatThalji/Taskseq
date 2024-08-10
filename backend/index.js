const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // استيراد cors

const app = express();
const port = 4000;

// إعداد الاتصال بقاعدة البيانات
const sequelize = new Sequelize('postgres://postgres:HU%4030080@localhost:5432/task_management');

// تعريف نموذج Task
const Task = sequelize.define(
  'task',
  {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: 'tasks',
    timestamps: false
  }
);

console.log(Task);






// إعداد الميدل وير
app.use(bodyParser.json());
app.use(cors());

// تعريف المسارات مباشرة في `server.js`

// إنشاء مهمة جديدة
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, desc, isDeleted } = req.body;
    const task = await Task.create({ title, desc, isDeleted });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// عرض جميع المهام
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { isDeleted: false }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث مهمة
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, isDeleted } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      task.desc = desc;
      task.isDeleted = isDeleted;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// حذف مهمة (حذف ناعم)
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      task.isDeleted = true;
      await task.save();
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// بدء الخادم
app.listen(port, async () => {
  try {
    await sequelize.sync(); // تأكد من أن الجدول قد تم إنشاؤه
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});
