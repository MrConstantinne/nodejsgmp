const csv = require('csvtojson');
const fs = require('fs');

const FILENAME = `file.csv`;

const PATH_TO_INPUT_FILE = `./task1.2/csv/${FILENAME}`;
const PATH_TO_OUTPUT_FILE = `./task1.2/csv/result.txt`;

const readStream = fs.createReadStream(PATH_TO_INPUT_FILE);
const writeStream = fs.createWriteStream(PATH_TO_OUTPUT_FILE);

readStream
    .pipe(csv())
    .pipe(writeStream)
    .on('error', err => console.error(err));
