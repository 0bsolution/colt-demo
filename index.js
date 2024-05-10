const express = require('express');
const app = express();
const PORT = 3000;

app.get('/convert-to-usd/:currency', (req, res) => {
  const { currency } = req.params;
  let conversionRate;
  switch(currency.toUpperCase()) {
    case 'EUR':
      conversionRate = 1.1;
      break;
    case 'GBP':
      conversionRate = 1.3;
      break;
    case 'CAD':
      conversionRate = 0.75;
      break;
    default:
      return res.status(404).send('Currency not supported.');
  }
  const response = {
    convertedAmount: conversionRate,
    currency: 'USD'
  };
  res.json(response);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
