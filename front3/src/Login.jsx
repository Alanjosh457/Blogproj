import React, { useState } from 'react';
import { login } from './services2'; // Import from services2 folder
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styles from './login2.module.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);
      toast.success('Logged in successfully');

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);

        const decoded = jwtDecode(response.token);
        navigate('/link');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleClick}>
  <div className={styles.field}>
    <input id='username' value={formData.username} onChange={handleChange} placeholder="Username" />
  </div>
  <div className={styles.field}>
    <input id='password' type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
  </div>
  <button type='submit' disabled={loading}>
    {loading ? 'Loading...' : 'Login'}
  </button>
</form>
  );
};

export default Login; 