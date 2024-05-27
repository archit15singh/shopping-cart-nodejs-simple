import axios from "axios";

class ShoppingCart {
  constructor() {
    this.items = [];
    this.taxRate = 0.125;
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
  }

  async addProduct(productName, quantity) {
    try {
      const price = await this.fetchPrice(productName);
      const existingProduct = this.items.find(
        (item) => item.product === productName,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.items.push({ product: productName, quantity, price });
      }

      this.updateTotals();
    } catch (error) {
      console.error(`Failed to add product: ${error.message}`);
      throw error;
    }
  }

  async fetchPrice(productName) {
    try {
      const url = `https://equalexperts.github.io/backend-take-home-test-data/${productName}.json`;
      const response = await axios.get(url);
      if (response.data && typeof response.data.price === "number") {
        return response.data.price;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error(
        `Failed to fetch price for ${productName}: ${error.message}`,
      );
      throw error;
    }
  }

  updateTotals() {
    this.subtotal = this.calculateSubtotal();
    this.tax = this.calculateTax();
    this.total = this.calculateTotal();
  }

  calculateSubtotal() {
    const subtotal = this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return subtotal.toFixed(2);
  }

  calculateTax() {
    const tax = this.subtotal * this.taxRate;
    return tax.toFixed(2);
  }

  calculateTotal() {
    const total = parseFloat(this.subtotal) + parseFloat(this.tax);
    return total.toFixed(2);
  }
}

export default ShoppingCart;
