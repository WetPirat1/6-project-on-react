import React, { useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates, useRates] = React.useState({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates)
      })
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить инфо')
      })
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result)
  }

  

  

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrencym, fromPrice])

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice])

  return (
    <div className="App">
      <Block
        value={setFromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} 
      />

      <Block
        value={setToPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice} 
      />
    </div>
  );
}

export default App;
