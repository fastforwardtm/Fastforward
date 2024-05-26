const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); // Import the connectDB function

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to PostgreSQL
(async () => {
  const db = await connectDB();
  if (!db) {
    console.error('Failed to connect to the database');
    return;
  }

  // Pass the db pool to the route handlers
  app.use('/api/users', require('./routes/users')(db));
  app.use('/api/transactions', require('./routes/transactions')(db));

  const PORT = process.env.PORT || 5002; // Changed port to 5002
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
