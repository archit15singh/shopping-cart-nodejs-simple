import ShoppingCart from './shoppingCart.mjs';
import axios from 'axios';

jest.mock('axios');

describe('Shopping Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('should add a product to the cart and update quantities', async () => {
    axios.get.mockResolvedValue({ data: { title: 'Corn Flakes', price: 2.52 } });

    await cart.addProduct('cornflakes', 1);
    expect(cart.items).toEqual([{ product: 'cornflakes', quantity: 1, price: 2.52 }]);

    await cart.addProduct('cornflakes', 1);
    expect(cart.items).toEqual([{ product: 'cornflakes', quantity: 2, price: 2.52 }]);
  });

  test('should correctly calculate subtotal, tax, and total', async () => {
    axios.get.mockImplementation((url) => {
      const prices = {
        'cornflakes.json': { title: 'Corn Flakes', price: 2.52 },
        'weetabix.json': { title: 'Weetabix', price: 9.98 }
      };
      const product = url.split('/').pop();
      return Promise.resolve({ data: prices[product] });
    });

    await cart.addProduct('cornflakes', 2);
    await cart.addProduct('weetabix', 1);

    expect(cart.subtotal).toBe('15.02');
    expect(cart.tax).toBe('1.88');
    expect(cart.total).toBe('16.90');
  });
});
