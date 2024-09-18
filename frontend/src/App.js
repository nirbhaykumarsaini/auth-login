import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeTable from './pages/EmployeeTable';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import PrivateRoute from './components/PrivateRoutes';
import './App.css';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast


function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      if (token) {
        setIsAuthenticated(true);
        fetchEmployees();
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    }
  };

  const handleSave = () => {
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    navigate('/employee-form');
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.f_Id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
     <ToastContainer /> 
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginSignup /> : <Navigate to="/" />} />
        <Route path="/" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/employee-list" element={<PrivateRoute element={() => <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />} />} />
        <Route
          path="/employee-form"
          element={
            <PrivateRoute
              element={() =>
                editingEmployee ? (
                  <EmployeeForm employee={editingEmployee} onSave={handleSave} onCancel={() => setEditingEmployee(null)} />
                ) : (
                  <EmployeeForm onSave={handleSave} onCancel={() => setEditingEmployee(null)} />
                )
              }
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
