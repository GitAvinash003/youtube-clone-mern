import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      alert('Registered successfully! Now login.');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '300px',
    margin: '50px auto',
  },
};

export default Register;
