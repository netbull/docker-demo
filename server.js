const express = require('express');
const path = require('path');
const app = express();

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/frontend/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/frontend/index.html'));
  }
});

app.listen(process.env.PORT, '0.0.0.0', () => console.log(`http is started ${process.env.PORT}`));
