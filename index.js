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

app.get('/crypto-to-usd/:currency', async (req, res) => {
  const { currency } = req.params;
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data[currency]) {
          return res.status(404).send('Currency not supported.');
        }
        const responseObj = {
          convertedAmount: data[currency].usd,
          currency: 'USD'
        };
        res.json(responseObj);
      })
      .catch(error => {
        console.error('Error fetching crypto data:', error);
        res.status(500).send('Error fetching crypto data.');
      });
  } catch (error) {
    console.error('Error in crypto-to-usd route:', error);
    res.status(500).send('Server error.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
