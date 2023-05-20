import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Mapping from './Mapping';
import EmployeeList from './EmployeeList';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    // You can use local storage or a token for authentication
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:27017/login', {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', 'your-token-here');
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <Mapping />
          <EmployeeList />
        </div>
      )}
    </div>
  );
}

export default App;