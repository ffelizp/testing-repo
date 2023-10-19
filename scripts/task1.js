const { readCsv, writeCsv } = require('../utils/csvUtils');
const { productsFilePath, ordersFilePath, orderPricesFilePath } = require('../utils/filePaths');

async function task1(){
    // Handle errors By Using Try and Catch
    try {
        // Read All Needed CSV Files
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);   

        // Calculate Order Total Prices
        const orderPrices = orders.map((order)=>{
            // Get Products IDs
            const productIds = order.products.split(' ');
            const totalCost = productIds.reduce((acc, productId)=>{
                const product = products.find((product)=>product.id === productId);
                return product ? acc + parseFloat(product.cost) : acc;
            },0);

            // Return Order Prices
            return {
                id: order.id,
                euros: totalCost
            };
        });

        // Write Order Prices to CSV File
        await writeCsv(orderPricesFilePath, orderPrices, [
            { id: 'id', title: 'id' },
            { id: 'euros', title: 'euros' },
          ]);

        // Console log success message
        console.log('Task 1 completed successfully!');

    } catch (error) {
        // Console log error
        console.log('An error has occurred: ', error);
    }
}

// Execute Task1 Function
task1();