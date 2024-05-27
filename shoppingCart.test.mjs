import ShoppingCart from "./shoppingCart.mjs";
import axios from "axios";

jest.mock("axios");

describe("Shopping Cart", () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test("should add a product to the cart and update quantities", async () => {
    axios.get.mockResolvedValue({
      data: { title: "Corn Flakes", price: 2.52 },
    });

    await cart.addProduct("cornflakes", 1);
    expect(cart.items).toEqual([
      { product: "cornflakes", quantity: 1, price: 2.52 },
    ]);

    await cart.addProduct("cornflakes", 1);
    expect(cart.items).toEqual([
      { product: "cornflakes", quantity: 2, price: 2.52 },
    ]);
  });

  test("should correctly calculate subtotal, tax, and total", async () => {
    axios.get.mockImplementation((url) => {
      const prices = {
        "cornflakes.json": { title: "Corn Flakes", price: 2.52 },
        "weetabix.json": { title: "Weetabix", price: 9.98 },
      };
      const product = url.split("/").pop();
      return Promise.resolve({ data: prices[product] });
    });

    await cart.addProduct("cornflakes", 2);
    await cart.addProduct("weetabix", 1);

    expect(cart.subtotal).toBe("15.02");
    expect(cart.tax).toBe("1.88");
    expect(cart.total).toBe("16.90");
  });

  test("should handle adding multiple different products", async () => {
    axios.get.mockImplementation((url) => {
      const prices = {
        "cornflakes.json": { title: "Corn Flakes", price: 2.52 },
        "weetabix.json": { title: "Weetabix", price: 9.98 },
        "shreddies.json": { title: "Shreddies", price: 3.25 },
      };
      const product = url.split("/").pop();
      return Promise.resolve({ data: prices[product] });
    });

    await cart.addProduct("cornflakes", 1);
    await cart.addProduct("weetabix", 1);
    await cart.addProduct("shreddies", 2);

    expect(cart.items).toEqual([
      { product: "cornflakes", quantity: 1, price: 2.52 },
      { product: "weetabix", quantity: 1, price: 9.98 },
      { product: "shreddies", quantity: 2, price: 3.25 },
    ]);

    expect(cart.subtotal).toBe("19.00");
    expect(cart.tax).toBe("2.38");
    expect(cart.total).toBe("21.38");
  });

  test("should handle adding the same product multiple times", async () => {
    axios.get.mockResolvedValue({
      data: { title: "Corn Flakes", price: 2.52 },
    });

    await cart.addProduct("cornflakes", 1);
    await cart.addProduct("cornflakes", 3);

    expect(cart.items).toEqual([
      { product: "cornflakes", quantity: 4, price: 2.52 },
    ]);
    expect(cart.subtotal).toBe("10.08");
    expect(cart.tax).toBe("1.26");
    expect(cart.total).toBe("11.34");
  });

  test("should handle large quantities of products", async () => {
    axios.get.mockResolvedValue({
      data: { title: "Corn Flakes", price: 2.52 },
    });

    await cart.addProduct("cornflakes", 1000);

    expect(cart.items).toEqual([
      { product: "cornflakes", quantity: 1000, price: 2.52 },
    ]);
    expect(cart.subtotal).toBe("2520.00");
    expect(cart.tax).toBe("315.00");
    expect(cart.total).toBe("2835.00");
  });

  test("should handle fetching price errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Price fetch failed"));

    await expect(cart.addProduct("unknown", 1)).rejects.toThrow(
      "Price fetch failed",
    );
    expect(cart.items).toEqual([]);
  });

  test("should round totals correctly to two decimal places", async () => {
    axios.get.mockResolvedValue({
      data: { title: "Corn Flakes", price: 2.333 },
    });

    await cart.addProduct("cornflakes", 1);

    expect(cart.subtotal).toBe("2.33");
    expect(cart.tax).toBe("0.29");
    expect(cart.total).toBe("2.62");
  });
  test("should handle unexpected response structure", async () => {
    axios.get.mockResolvedValue({
      data: { productName: "Corn Flakes", cost: 2.52 },
    });

    await expect(cart.addProduct("cornflakes", 1)).rejects.toThrow(
      "Invalid response structure",
    );
  });
});
