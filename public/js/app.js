const prices = document.querySelectorAll('.price');

prices.forEach(item => {
  item.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(item.textContent);
})