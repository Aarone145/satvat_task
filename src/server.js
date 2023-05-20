const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const employeeSchema = new mongoose.Schema({
  name: String,
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const departmentSchema = new mongoose.Schema({
  name: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
});

const Employee = mongoose.model('Employee', employeeSchema);
const Department = mongoose.model('Department', departmentSchema);
const Project = mongoose.model('Project', projectSchema);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Implement authentication logic here
  if (username === 'admin' && password === 'password') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('departments projects')
      .exec();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/employees', async (req, res) => {
  try {
    const { name } = req.body;
    const employee = new Employee({ name });
    await employee.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({ name });
    await department.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/projects', async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({ name });
    await project.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/map/:employeeId', async (req, res) => {
  try {
    const { departments, projects } = req.body;
    const employeeId = req.params.employeeId;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.departments = departments;
    employee.projects = projects;
    await employee.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});