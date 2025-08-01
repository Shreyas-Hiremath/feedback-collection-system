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
    maxWidth: '1200px', // Made it wider for dashboard content
    minHeight: '700px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  promoPanel: {
    flex: '0 0 300px', // Fixed width for the sidebar
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
    overflowY: 'auto', // Allow content to scroll if it gets too long
  },
  btn: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
  },
  card: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: '#fafafa',
  },
};

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await api.get('/feedback'); 
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Failed to fetch feedback", err);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.wrapper}>
        {/* Left Promotional Panel */}
        <div style={styles.promoPanel}>
          <h1 style={{ fontSize: '2.5em', margin: 0 }}>Admin Panel</h1>
          <p style={{ fontSize: '1.1em', marginTop: '10px', lineHeight: '1.6' }}>
            Here you can review all user submissions and manage feedback forms.
          </p>
        </div>

        {/* Right Content Panel */}
        <div style={styles.contentPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1>Dashboard</h1>
            <Link to="/admin/create-form" style={styles.btn}>Create New Form</Link>
          </div>
          <hr />
          <h2>All Submitted Feedback</h2>
          {feedbackList.length > 0 ? (
            feedbackList.map(feedback => (
              <div key={feedback._id} style={styles.card}>
                <h4>
                  Feedback for Form: {feedback.formId ? feedback.formId.title : 'Deleted Form'}
                </h4>
                <p style={{ fontSize: '0.8em', color: '#666', marginTop: '-10px', marginBottom: '15px' }}>
                  Submitted on: {new Date(feedback.createdAt).toLocaleString()}
                </p>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {feedback.answers.map((ans, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <strong>{ans.questionText}:</strong> {ans.answer}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div style={styles.card}>
              <p>No feedback has been submitted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;