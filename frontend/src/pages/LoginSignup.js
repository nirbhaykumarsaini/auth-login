import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

function LoginSignup() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
    try {
      const res = await axios.post(url, { f_userName: userName, f_Pwd: password });
      if (isLogin) {
        localStorage.setItem('username',userName);
        localStorage.setItem('token', res.data.token);
        toast.success('Login Successful');
        navigate('/');
      } else {
        toast.success('Signup Successful');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='main-container'>
    <div className="container">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create New Account?' : 'Back to login?'}
      </button>
    </div>
    </div>
  );
}

export default LoginSignup;
