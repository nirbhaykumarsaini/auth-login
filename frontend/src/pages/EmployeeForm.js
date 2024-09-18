import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EmployeeForm.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast


const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, f_Image: e.target.files[0] }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const courses = checked
        ? [...prev.f_Course, value]
        : prev.f_Course.filter((course) => course !== value);
      return { ...prev, f_Course: courses };
    });
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (employee) {
        await axios.put(`http://localhost:5000/api/employees/${employee.f_Id}`, formDataToSend);
      } else {
        await axios.post('http://localhost:5000/api/employees/create', formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // if you're sending files
          },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const navigate = useNavigate(); // Initialize the navigate hook

  const cancel = () => {
    navigate('/'); // Navigate to the employee form
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Name</label>

      <input
        type="text"
        name="f_Name"
        value={formData.f_Name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <label>Enter Email</label>

      <input
        type="email"
        name="f_Email"
        value={formData.f_Email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <label>Enter Mobile</label>

      <input
        type="tel"
        name="f_Mobile"
        value={formData.f_Mobile}
        onChange={handleChange}
        placeholder="Mobile"
        required
      />
      <label>Select Designation</label>

      <select
        name="f_Designation"
        value={formData.f_Designation}
        onChange={handleChange}
        required
      >
        <option value="">--- Select ---</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <label>Select Gender</label>

      <div>
        <label>
          <input
            type="radio"
            name="f_gender"
            value="M"
            checked={formData.f_gender === 'M'}
            onChange={handleChange}
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="f_gender"
            value="F"
            checked={formData.f_gender === 'F'}
            onChange={handleChange}
            required
          />
          Female
        </label>
      </div>
      <label>Select Courses</label>
      <div>

        <label>
          <input
            type="checkbox"
            value="MCA"
            checked={formData.f_Course.includes('MCA')}
            onChange={handleCourseChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            value="BCA"
            checked={formData.f_Course.includes('BCA')}
            onChange={handleCourseChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            value="BSC"
            checked={formData.f_Course.includes('BSC')}
            onChange={handleCourseChange}
          />
          BSC
        </label>
      </div>

      <input
        type="file"
        name="f_Image"
        onChange={handleFileChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
};

export default EmployeeForm;
