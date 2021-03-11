const currencyDisplay = (currencyString) => {
  const options = {
    style: 'currency',
    currency: 'IDR',
  };

  return new Intl.NumberFormat('id', options).format(currencyString);
};

export default currencyDisplay;
