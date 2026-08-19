const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/api/shorten', urlController.shorten);
router.get('/api/stats/:shortCode', urlController.stats);
router.get('/api/urls', urlController.list);

router.get('/:shortCode', urlController.redirect);

module.exports = router;
