const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index', { title: 'Cars < Home >', isHome: true });
});

module.exports = router;