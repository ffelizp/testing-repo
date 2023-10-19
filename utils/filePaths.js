const path = require('path');

// Input Files
const customersFilePath = path.join(__dirname, '../data/customers.csv');
const productsFilePath = path.join(__dirname, '../data/products.csv');
const ordersFilePath = path.join(__dirname, '../data/orders.csv');

// Output Files
// TODO: Add Output File Paths

// Export file paths
module.exports = {
    customersFilePath,
    productsFilePath,
    ordersFilePath,
}