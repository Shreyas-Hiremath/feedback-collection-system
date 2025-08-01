import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#6366F1',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  buttonSecondary: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  questionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
};

function CreateFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ text: '' }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/forms', { title, description, questions });
      alert('Form created successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Failed to create form', err);
      alert('Failed to create form.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.wrapper}>
        {/* Left Promotional Panel */}
        <div style={styles.promoPanel}>
          <h1 style={{ fontSize: '2.5em', margin: 0 }}>Form Builder</h1>
          <p style={{ fontSize: '1.1em', marginTop: '10px', lineHeight: '1.6' }}>
            Create custom forms to gather targeted feedback from your users.
          </p>
        </div>

        {/* Right Content Panel */}
        <div style={styles.contentPanel}>
          <h2>Create New Feedback Form</h2>
          <hr style={{ margin: '20px 0' }}/>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>Form Title</label>
              <input id="title" type="text" style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Website Usability Survey" required />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>Form Description</label>
              <textarea id="description" style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of this form's purpose"></textarea>
            </div>
            
            <h3 style={{ marginTop: '30px' }}>Questions</h3>
            {questions.map((q, index) => (
              <div key={index} style={styles.questionItem}>
                <input type="text" style={styles.input} value={q.text} onChange={(e) => handleQuestionChange(index, e)} placeholder={`Question ${index + 1}`} required />
                <button type="button" style={styles.buttonSecondary} onClick={() => removeQuestion(index)}>Remove</button>
              </div>
            ))}
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                <button type="button" style={styles.button} onClick={addQuestion}>Add Question</button>
                <button type="submit" style={styles.button}>Create Form</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateFormPage;