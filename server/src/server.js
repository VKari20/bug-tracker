const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Error handling middleware (at the end)
app.use((err, req, res, next) => {
  console.error('💥 Backend Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
