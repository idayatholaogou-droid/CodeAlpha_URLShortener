const pool = require('../config/db');

const UrlModel = {
  async create(originalUrl, shortCode) {
    const [result] = await pool.query(
      'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
      [originalUrl, shortCode]
    );
    return { id: result.insertId, originalUrl, shortCode, clicks: 0 };
  },

  async findByShortCode(shortCode) {
    const [rows] = await pool.query(
      'SELECT * FROM urls WHERE short_code = ?',
      [shortCode]
    );
    return rows[0] || null;
  },

  async findByOriginalUrl(originalUrl) {
    const [rows] = await pool.query(
      'SELECT * FROM urls WHERE original_url = ?',
      [originalUrl]
    );
    return rows[0] || null;
  },

  async incrementClicks(shortCode) {
    await pool.query(
      'UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?',
      [shortCode]
    );
  },

  async findAll() {
    const [rows] = await pool.query(
      'SELECT * FROM urls ORDER BY created_at DESC'
    );
    return rows;
  }
};

module.exports = UrlModel;
