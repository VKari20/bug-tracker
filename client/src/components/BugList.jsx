import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    try {
      const res = await axios.get('/api/bugs');
      setBugs(res.data);
    } catch (err) {
      console.error('Failed to fetch bugs:', err);
      setError('Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/bugs/${id}`, { status: newStatus });
      fetchBugs();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      setBugs(bugs.filter((bug) => bug._id !== id));
    } catch (err) {
      console.error('Failed to delete bug:', err);
    }
  };

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!Array.isArray(bugs) || bugs.length === 0) {
    return <p>No bugs reported yet.</p>;
  }

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug._id}>
          <strong>{bug.title}</strong> — {bug.status}
          <br />
          <select
            value={bug.status}
            onChange={(e) => handleStatusChange(bug._id, e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button onClick={() => handleDelete(bug._id)} style={{ marginLeft: '10px' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BugList;
