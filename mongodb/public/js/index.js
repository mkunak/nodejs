function formatCurrency(price) {
  return new Intl.NumberFormat(
    'ua-UA',
    { style: 'currency', currency: 'UAH' }
  ).format(price);
}

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = formatCurrency(node.textContent);
});

const $cart = document.querySelector('.cart');
if ($cart) {
  $cart.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-remove')) {
      const { id } = e.target.dataset;
      console.log(id);
      fetch('/cart/remove/' + id, {
        method: 'delete'
      }).then((res) => res.json())
        .then((cart) => {
          if (cart.cars.length) {
            const html = cart.cars.map((car) => {
              return `
                <tr>
                  <td>${car.brand} ${car.model}</td>
                  <td><img src="${car.image}" height="50" alt="${car.brand} ${car.model}"></td>
                  <td>${car.count}</td>
                  <td>${car.price}</td>
                  <td>
                    <button class="btn teal btn-small js-add" data-id="${car._id}">Add</button>
                    <button class="btn red btn-small js-remove" data-id="${car._id}">Del</button>
                  </td>
                </tr>
              `;
            }).join('');
            $cart.querySelector('tbody').innerHTML = html;
            $cart.querySelector('.price').textContent = formatCurrency(cart.price);
          } else {
            $cart.innerHTML = `<p>Cart is empty</p>`;
          }
        });
    }
  });
}
