const {readCsv, writeCsv} = require('../utils/csvUtils');
const {customersFilePath, productsFilePath, ordersFilePath, customerRankingFilePath} = require('../utils/filePaths');

// Create Async function task3
async function task3(){
    // Handle errors By Using Try and Catch
    try {
        // Read All Needed CSV Files
        const customers = await readCsv(customersFilePath);
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);

        // Calculate the total euros spent by each customer
        const customerTotalEuros = {};

        // Foreach Order
        orders.forEach((order)=>{
            // Get Products IDs
            const productIds = order.products.split(' ');
            const totalCost = productIds.reduce((acc, productId)=>{
                const product = products.find((product)=>product.id === productId);
                return product ? acc + parseFloat(product.cost) : acc;
            },0);

            // Initialize Customer Total Euros
            if(!customerTotalEuros[order.customer]){
                customerTotalEuros[order.customer] = 0;
            }

            // Add Total Cost to Customer Total Euros
            customerTotalEuros[order.customer] += totalCost;
        });

        // Prepare Data for CSV File - Foreach Customer, Get the total euros spent
        const customerRankingData = customers.map((customer)=>{
            return {
                id: customer.id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                total_euros: customerTotalEuros[customer.id] ? customerTotalEuros[customer.id] : 0
            };
        });

        // Sort The data by Total Euros in descending order
        customerRankingData.sort((a,b)=>parseFloat(b.total_euros) - parseFloat(a.total_euros));

        // Write the data to CSV File
        await writeCsv(customerRankingFilePath, customerRankingData, [
            { id: 'id', title: 'id' },
            { id: 'firstname', title: 'firstname' },
            { id: 'lastname', title: 'lastname' },
            { id: 'total_euros', title: 'total_euros' },
        ]);

        // Console log success message
        console.log('Task 3 completed successfully!');

    } catch (error) {
        // Console log error
        console.log('An error has occurred: ', error);
    }
}

// Execute Task3 Function
task3();