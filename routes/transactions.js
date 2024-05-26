const express = require('express');
const authMiddleware = require('../authMiddleware');

module.exports = (db) => {
  const router = express.Router();
  const transactionsCollection = db.collection('transactions');

  router.use(authMiddleware);

  // Get all transactions
  router.get('/', async (req, res) => {
    try {
      const transactions = await transactionsCollection.find().toArray();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create a new transaction
  router.post('/', async (req, res) => {
    const { amount, transaction_type, description } = req.body;
    try {
      const transaction = { user_id: req.user.id, amount, transaction_type, description, created_at: new Date() };
      await transactionsCollection.insertOne(transaction);
      res.status(201).json(transaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};