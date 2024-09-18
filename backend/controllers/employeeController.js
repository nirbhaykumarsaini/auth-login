const Employee = require('../models/Employee');

// Create Employee
exports.createEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const f_Id = Date.now().toString(); // Unique ID based on timestamp
  const f_Image = req.file ? req.file.path : null;

  try {
    const newEmployee = new Employee({ f_Id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error); // Log the error
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Get Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Edit Employee
exports.editEmployee = async (req, res) => {
  const { f_Id } = req.params;
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_Id },
      { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { f_Id } = req.params;

  try {
    await Employee.findOneAndDelete({ f_Id });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};
