const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/about', { title: 'Cars < About >', isAbout: true });
});

module.exports = router;