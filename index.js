const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/convert-to-usd/:currency', async (req, res) => {
  const { currency } = req.params;
  try {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[currency.toUpperCase()];
        if (!rate) {
          return res.status(404).send('Currency not supported.');
        }
        const responseObj = {
          convertedAmount: rate,
          currency: 'USD'
        };
        res.json(responseObj);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        res.status(500).send('Error fetching currency data.');
      });
  } catch (error) {
    res.status(500).send('Error fetching currency data.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
