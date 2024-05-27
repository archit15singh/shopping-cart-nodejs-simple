import axios from 'axios';

class ShoppingCart {
  constructor() {
    this.items = [];
    this.subtotal = 0;
    this.taxRate = 0.125;
    this.total = 0;
  }

  async addProduct(productName, quantity) {
    const price = await this.fetchPrice(productName);
    const product = this.items.find(item => item.product === productName);

    if (product) {
      product.quantity += quantity;
    } else {
      this.items.push({ product: productName, quantity, price });
    }

    this.calculateTotals();
  }

  async fetchPrice(productName) {
    const url = `https://equalexperts.github.io/backend-take-home-test-data/${productName}.json`;
    const response = await axios.get(url);
    return response.data.price;
  }

  calculateTotals() {
    this.subtotal = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.total = (parseFloat(this.subtotal) + parseFloat(this.tax)).toFixed(2);
  }
}

export default ShoppingCart;
