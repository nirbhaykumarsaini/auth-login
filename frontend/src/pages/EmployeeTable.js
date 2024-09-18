import React from 'react';
import axios from 'axios';
import '../css/EmployeeTable.css';
import { toast } from 'react-toastify'; // Import toast

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(id);
      toast.warn("Employee Deleted Successfully");
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className='table-container'>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.f_Id}>
                <td>{emp.f_Name}</td>
                <td>
                  {emp.f_Image ? (
                    <img
                      src={`http://localhost:5000/uploads/${emp.f_Image}`} // Use the correct URL format
                      alt={`${emp.f_Name}'s profile`}
                      className='employee-image'
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td>{emp.f_Email}</td>
                <td>{emp.f_Mobile}</td>
                <td>{emp.f_Designation}</td>
                <td>{emp.f_gender}</td>
                <td>{emp.f_Course.join(', ')}</td>
                <td>
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.f_Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Employees Available ! </p>
      )}
    </div>
  );
};

export default EmployeeTable;
