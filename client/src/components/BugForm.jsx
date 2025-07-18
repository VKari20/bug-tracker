import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  console.log('📤 Submitting:', { title, description });

  try {
    const res = await axios.post('/api/bugs', { title, description });
    console.log('✅ Submission response:', res.data);
    onBugCreated(res.data);
    setTitle('');
    setDescription('');
  } catch (err) {
    console.error('❌ API error:', err);
    setError('Failed to submit bug');
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Submitting bug...</p>}
      <input
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        type="text"
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default BugForm;
