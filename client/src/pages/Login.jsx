import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/auth/login', form);
      login(res.data.user, res.data.token);
      // ✅ Store token separately so Axios interceptor can access it
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-80 text-center"
      >
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Sign in to YouTube Clone
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mb-4 rounded border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="email"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mb-6 rounded border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="mt-4 text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
