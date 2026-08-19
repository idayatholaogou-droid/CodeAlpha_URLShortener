const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const UrlModel = require('../models/urlModel');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const urlController = {
  async shorten(req, res) {
    try {
      const { originalUrl, customCode } = req.body;

      if (!originalUrl) {
        return res.status(400).json({ error: "Le champ 'originalUrl' est requis." });
      }

      if (!validUrl.isWebUri(originalUrl)) {
        return res.status(400).json({ error: "URL invalide. Elle doit commencer par http:// ou https://" });
      }

      const existing = await UrlModel.findByOriginalUrl(originalUrl);
      if (existing) {
        return res.status(200).json({
          originalUrl: existing.original_url,
          shortUrl: `${BASE_URL}/${existing.short_code}`,
          shortCode: existing.short_code,
          clicks: existing.clicks
        });
      }

      let shortCode = customCode ? customCode.trim() : nanoid(6);

      if (customCode) {
        const codeTaken = await UrlModel.findByShortCode(shortCode);
        if (codeTaken) {
          return res.status(409).json({ error: 'Ce code personnalisé est déjà utilisé.' });
        }
      }

      const created = await UrlModel.create(originalUrl, shortCode);

      return res.status(201).json({
        originalUrl: created.originalUrl,
        shortUrl: `${BASE_URL}/${created.shortCode}`,
        shortCode: created.shortCode,
        clicks: created.clicks
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  async redirect(req, res) {
    try {
      const { shortCode } = req.params;
      const entry = await UrlModel.findByShortCode(shortCode);

      if (!entry) {
        return res.status(404).json({ error: 'Code court introuvable.' });
      }

      await UrlModel.incrementClicks(shortCode);
      return res.redirect(entry.original_url);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  async stats(req, res) {
    try {
      const { shortCode } = req.params;
      const entry = await UrlModel.findByShortCode(shortCode);

      if (!entry) {
        return res.status(404).json({ error: 'Code court introuvable.' });
      }

      return res.json({
        originalUrl: entry.original_url,
        shortCode: entry.short_code,
        clicks: entry.clicks,
        createdAt: entry.created_at
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  async list(req, res) {
    try {
      const urls = await UrlModel.findAll();
      return res.json(urls);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  }
};

module.exports = urlController;
