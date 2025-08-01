import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

// --- Helper for styling ---
// Reusing the same style object for a consistent look.
const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
  },
  loginWrapper: {
    display: 'flex',
    width: '90%',
    maxWidth: '1000px',
    minHeight: '600px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  promoPanel: {
    flex: 1,
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formPanel: {
    flex: 1,
    backgroundColor: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#6366F1',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  link: {
    color: '#6366F1',
    textDecoration: 'none',
  },
};

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err.message);
      alert('Registration failed! The email may already be in use.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginWrapper}>
        {/* Left Promotional Panel */}
        <div style={styles.promoPanel}>
          <h1 style={{ fontSize: '3em', margin: 0 }}>Feedback System</h1>
          <p style={{ fontSize: '1.2em', marginTop: '10px' }}>
            Join us to start collecting, analyzing, and acting on user feedback.
          </p>
        </div>

        {/* Right Form Panel */}
        <div style={styles.formPanel}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Create an Account</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>Get started in just a few clicks.</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input
                id="name"
                type="text"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                id="email"
                type="email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Create Account
            </button>
          </form>
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
            Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;