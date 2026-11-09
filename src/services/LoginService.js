import { useState } from 'react';

export const useLoginService = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isLoggedIn') === 'true'
  );

  // Validasi login
  const checkLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('You must enter your username and password');
      return;
    }

    if (username === 'user' && password === 'prodexa123') {
    setErrorMessage('');
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    return true;
  } else {
    setErrorMessage('Incorrect Username or Password');
    return false;
  }
  };

  // Fungsi logout
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');

    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    isLoggedIn,
    checkLogin,
    handleLogout,
  };
};