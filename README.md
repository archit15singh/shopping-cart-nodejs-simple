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

This command will build the Docker image, run the tests, and generate the coverage report.

## Viewing Coverage Reports

After running the tests, you can view the coverage reports in the `coverage` directory. The reports will include a `lcov-report` directory that contains an `index.html` file, which can be opened in a web browser to see detailed coverage information.

### Example Output

```bash
❯ docker-compose up --build
app-1  | PASS ./shoppingCart.test.mjs
app-1  |   Shopping Cart
app-1  |     ✓ should add a product to the cart and update quantities (2 ms)
app-1  |     ✓ should correctly calculate subtotal, tax, and total
app-1  |     ✓ should handle adding multiple different products
app-1  |     ✓ should handle adding the same product multiple times (1 ms)
app-1  |     ✓ should handle large quantities of products
app-1  |     ✓ should handle fetching price errors gracefully (31 ms)
app-1  |     ✓ should round totals correctly to two decimal places
app-1  |     ✓ should handle unexpected response structure (14 ms)
app-1  | 
app-1  | ------------------|---------|----------|---------|---------|-------------------
app-1  | File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
app-1  | ------------------|---------|----------|---------|---------|-------------------
app-1  | All files         |     100 |      100 |     100 |     100 |                   
app-1  |  shoppingCart.mjs |     100 |      100 |     100 |     100 |                   
app-1  | ------------------|---------|----------|---------|---------|-------------------
app-1  | Test Suites: 1 passed, 1 total
app-1  | Tests:       8 passed, 8 total
app-1  | Snapshots:   0 total
app-1  | Time:        0.895 s
app-1  | Ran all test suites.
```

## Assumptions

- The Price API always returns valid responses for the given product names.
- The cart can handle multiple products and quantities.
- Totals are rounded to two decimal places.
