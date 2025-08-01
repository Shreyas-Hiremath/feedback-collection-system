import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

// --- Reusing the same style object for a consistent look ---
const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
  },
  wrapper: {
    display: 'flex',
    width: '90%',
    maxWidth: '1200px',
    minHeight: '700px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  promoPanel: {
    flex: '0 0 300px',
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentPanel: {
    flex: 1,
    backgroundColor: 'white',
    padding: '40px',
    overflowY: 'auto',
  },
  card: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: '#fafafa',
  },
};


function UserDashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await api.get('/forms');
        setForms(res.data);
      } catch (err) {
        console.error("Failed to fetch forms", err);
      }
    };
    fetchForms();
  }, []);

  return (
    <div style={styles.pageContainer}>
        <div style={styles.wrapper}>
            {/* Left Promotional Panel */}
            <div style={styles.promoPanel}>
                <h1 style={{ fontSize: '2.5em', margin: 0 }}>Welcome!</h1>
                <p style={{ fontSize: '1.1em', marginTop: '10px', lineHeight: '1.6' }}>
                    Your feedback helps us improve. Please select a form below to share your thoughts.
                </p>
            </div>

            {/* Right Content Panel */}
            <div style={styles.contentPanel}>
                <h2>Available Feedback Forms</h2>
                <hr style={{ margin: '20px 0' }}/>
                {forms.length > 0 ? (
                    <ul className="dashboard-list">
                    {forms.map(form => (
                        <li key={form._id}>
                        <Link to={`/form/${form._id}`}>
                            {/* --- STYLE CHANGE FOR FORM TITLE --- */}
                            <span style={{
                                display: 'block',
                                fontSize: '1.1em',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '5px'
                            }}>
                                {form.title}
                            </span>
                            {/* ------------------------------------ */}
                            <span style={{ display: 'block', fontSize: '0.9em', color: '#666', fontWeight: '300' }}>
                                {form.description}
                            </span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div style={styles.card}>
                    <p>No feedback forms are available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default UserDashboard;