const prices = document.querySelectorAll('.price');
const $cart  = document.querySelector('#cart');

const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
}

prices.forEach(item => item.textContent = toCurrency(item.textContent));

if ($cart) {
  $cart.addEventListener('click', e => {
    if (e.target.classList.contains('js-remove')) {
      const { id } = event.target.dataset;

      fetch(`/cart/remove/${id}`, {
        method: 'delete'
      }).then(response => response.json())
        .then(cart => {
          if (cart.games.length) {
            const html = cart.games.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class='btn btn-small js-remove' data-id='${c.id}'>Удалить</button>
                </td>
              </tr>
              `;
            }).join('');
            $cart.querySelector('tbody').innerHTML = html;
            $cart.querySelector('.price').innerHTML = toCurrency(cart.price);
          } else {
            $cart.innerHTML = '<p>Корзина пуста</p>';
          }
        })
    }
  })
}