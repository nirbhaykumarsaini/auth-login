import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleCreateEmployee = () => {
    navigate('/employee-form'); // Navigate to the employee form
  };

  return (
    <div>
      <main>
        <h2>Welcome {username}, to the Admin Panel</h2>
        <button onClick={handleCreateEmployee}>Create Employee</button> {/* Add the click handler */}
      </main>
    </div>
  );
}

export default Dashboard;
