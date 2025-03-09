import React, { useState } from 'react';
import styles from './register.module.css';
import { register } from './services2'; // Import from services2 folder
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',       // changed from name to username
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: null,     // changed from name to username
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form inputs
    const errors = {};
    if (!formData.username.trim()) {  // changed from name to username
      errors.username = 'Username is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // If errors exist, update state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      toast.success('User registered successfully');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleClick}>
      <div className={styles.field}>
        <input 
          id='username' 
          type='text' 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username" 
        />
        {formErrors.username && <p className={styles.error}>{formErrors.username}</p>}
      </div>
      
      <div className={styles.field}>
        <input 
          id='password' 
          type='password' 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
        {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
      </div>
      
      <div className={styles.field}>
        <input 
          id='confirmPassword' 
          type='password' 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm Password" 
        />
        {formErrors.confirmPassword && <p className={styles.error}>{formErrors.confirmPassword}</p>}
      </div>
      
      <button type='submit' disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
};

export default Register; 