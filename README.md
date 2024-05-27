# Shopping Cart

This project implements a shopping cart with basic functionalities using Node.js, ES6, TDD, and OOP principles.

## Features

- Add a product to the cart specifying the product name and quantity.
- Retrieve the product price from an external API.
- Calculate cart state (subtotal, tax, and total).

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

Run the unit tests using Jest:
```bash
npm test
```

Or using Docker:
```bash
docker-compose up --build
```

## Assumptions

- The Price API always returns valid responses for the given product names.
- The cart can handle multiple products and quantities.
- Totals are rounded to two decimal places.
