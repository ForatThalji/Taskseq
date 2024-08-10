const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // استيراد cors
const app = express();
const port = 4000;

// إعداد الاتصال بقاعدة البيانات
const sequelize = new Sequelize('postgres://postgres:HU%4030080@localhost:5432/task_management');

// تعريف نموذج Task
const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
);

// إعداد الميدل وير
app.use(bodyParser.json());
app.use(cors());


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
  


app.listen(port, async () => {
    try {
      await sequelize.sync(); // تأكد من أن الجدول قد تم إنشاؤه
      console.log(`Server is running on http://localhost:${port}`);
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  });