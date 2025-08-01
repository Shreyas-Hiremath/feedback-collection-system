import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

// --- Helper for styling ---
// We define styles here to keep the JSX clean, as requested in the image.
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
    overflow: 'hidden', // Important for rounded corners on children
  },
  promoPanel: {
    flex: 1,
    backgroundColor: '#6366F1', // A nice purple color
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
  extraOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    marginTop: '15px',
  },
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed!');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginWrapper}>
        {/* Left Promotional Panel */}
        <div style={styles.promoPanel}>
          <h1 style={{ fontSize: '3em', margin: 0 }}>Feedback System</h1>
          <p style={{ fontSize: '1.2em', marginTop: '10px' }}>
            Collect, analyze, and act on user feedback seamlessly.
          </p>
        </div>

        {/* Right Form Panel */}
        <div style={styles.formPanel}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Welcome Back!</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>Please enter your details to sign in.</p>
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div style={styles.extraOptions}>
               <div>
                  <input type="checkbox" id="rememberMe" style={{marginRight: '8px'}} />
                  <label htmlFor="rememberMe">Remember me</label>
               </div>
               <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
            </div>
            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
            Don't have an account? <Link to="/register" style={styles.link}>Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;