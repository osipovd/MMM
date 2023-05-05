const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

app.get('/mean', (req, res) => {
  const nums = req.query.nums;

  if (!nums || nums.trim() === '') {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numArr = nums.split(',').map(parseFloat);

  if (numArr.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains an invalid number` });
  }

  const mean = numArr.reduce((sum, num) => sum + num, 0) / numArr.length;

  res.json({ operation: 'mean', value: mean });
});

app.get('/median', (req, res) => {
  const nums = req.query.nums;

  if (!nums || nums.trim() === '') {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numArr = nums.split(',').map(parseFloat);

  if (numArr.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains an invalid number` });
  }

  numArr.sort((a, b) => a - b);

  const mid = Math.floor(numArr.length / 2);

  const median = numArr.length % 2 !== 0
    ? numArr[mid]
    : (numArr[mid - 1] + numArr[mid]) / 2;

  res.json({ operation: 'median', value: median });
});

app.get('/mode', (req, res) => {
  const nums = req.query.nums;

  if (!nums || nums.trim() === '') {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numArr = nums.split(',').map(parseFloat);

  if (numArr.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains an invalid number` });
  }

  const freqMap = numArr.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});

  let mode;
  let maxFreq = 0;

  for (const [num, freq] of Object.entries(freqMap)) {
    if (freq > maxFreq) {
      maxFreq = freq;
      mode = parseFloat(num);
    }
  }

  res.json({ operation: 'mode', value: mode });
});

module.exports = app;
