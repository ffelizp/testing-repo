const {readCsv, writeCsv} = require('../utils/csvUtils');
const {customersFilePath, productsFilePath, ordersFilePath, productCustomersFilePath} = require('../utils/filePaths');

// Create Async function task2
async function task2(){
    // Handle errors By Using Try and Catch
    try {
        // Read All Needed CSV Files
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);

        // Calculate Product Customers
        const productCustomers = {};

        // Process Orders to Determine withc customer purchases each product
        orders.forEach((order)=>{
            // Get Products IDs
            const productIds = order.products.split(' ');

            // Foreach Product ID
            productIds.forEach((productId)=>{
                // Initialize Product Customers
                if(!productCustomers[productId]){
                    productCustomers[productId] = [];
                }

                // If Customer ID is not in Product Customers - Add it
                if(!productCustomers[productId].includes(order.customer)){
                    productCustomers[productId].push(order.customer);
                }
            });
        });

        // Prepare Data for CSV File - Foreach Product, Get the customers who purchased it
        const productCustomersData = products.map((product)=>{
            return {
                id: product.id,
                customer_ids: productCustomers[product.id] ? productCustomers[product.id].join(' ') : ''
            };
        });

        // Write the data to CSV File
        await writeCsv(productCustomersFilePath, productCustomersData, [
            { id: 'id', title: 'id' },
            { id: 'customer_ids', title: 'customer_ids' },
        ]);

        // Console log success message
        console.log('Task 2 completed successfully!');

    } catch (error) {
        // Console log error
        console.log('An error has occurred: ', error);
    }
}


// Execute Task2 Function
task2();

