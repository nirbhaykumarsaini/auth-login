import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(null); // To manage token state
    const navigate = useNavigate();

    useEffect(() => {
        // Get username and token from local storage
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');

        if (!storedToken || !storedUsername) {
            navigate('/login');  // Redirect if not logged in
        } else {
            setUsername(storedUsername); // Set username if found
            setToken(storedToken);       // Set token if found
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove token and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        
        // Clear states
        setUsername('');
        setToken(null);
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <header>
            <h1>Logo</h1>
            {/* Show navigation only if token and username are available */}
            {username && token ? (
                <nav>
                    <a href="/">Home</a> | <a href="/employee-list">Employee List</a> | {username} - <button onClick={handleLogout}>Logout</button>
                </nav>
            ) : null}
        </header>
    );
}

export default Header;
