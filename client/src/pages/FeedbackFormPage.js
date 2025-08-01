import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  formGroup: {
    marginBottom: '25px',
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
};

function FeedbackFormPage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await api.get(`/forms/${formId}`); 
        setForm(res.data);
        setAnswers(res.data.questions.map(q => ({ questionText: q.text, answer: '' })));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch form", err);
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', { formId, answers });
      alert('Thank you for your feedback!');
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to submit feedback", err);
      alert('Failed to submit feedback.');
    }
  };

  // Improved loading and error states to fit the layout
  if (loading) return (
    <div style={styles.pageContainer}>
        <p>Loading form...</p>
    </div>
  );
  if (!form) return (
    <div style={styles.pageContainer}>
        <p>Form not found.</p>
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.wrapper}>
        {/* Left Promotional Panel */}
        <div style={styles.promoPanel}>
          <h1 style={{ fontSize: '2.5em', margin: 0 }}>Your Feedback Matters</h1>
          <p style={{ fontSize: '1.1em', marginTop: '10px', lineHeight: '1.6' }}>
            Help us improve our services by sharing your thoughts. Your responses are valuable to us.
          </p>
        </div>

        {/* Right Content Panel */}
        <div style={styles.contentPanel}>
          <h2>{form.title}</h2>
          <p style={{ color: '#666' }}>{form.description}</p>
          <hr style={{ margin: '20px 0' }}/>
          <form onSubmit={handleSubmit}>
            {form.questions.map((question, index) => (
              <div key={index} style={styles.formGroup}>
                <label htmlFor={`question-${index}`} style={styles.label}>{question.text}</label>
                <input
                  id={`question-${index}`}
                  type="text"
                  style={styles.input}
                  value={answers[index] ? answers[index].answer : ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="submit" style={styles.button}>Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackFormPage;