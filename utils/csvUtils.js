const fs = require('fs');
const csv = require('csv-parser');
const {createObjectCsvWriter} = require('csv-writer');

// Create Async function readCsv
async function readCsv(filePath){
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

// Create Async function writeCsv
async function writeCsv(filePath, data, header){
    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: header
    });

    await csvWriter.writeRecords(data);
}

// Export readCsv and writeCsv
module.exports = {
    readCsv,
    writeCsv
}
