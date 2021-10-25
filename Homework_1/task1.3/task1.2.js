'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var csv, fs, FILENAME, PATH_TO_INPUT_FILE, PATH_TO_OUTPUT_FILE, readStream, writeStream;
    return {
        setters: [],
        execute: function () {
            csv = require('csvtojson');
            fs = require('fs');
            FILENAME = 'file.csv';
            PATH_TO_INPUT_FILE = './task1.2/csv/' + FILENAME;
            PATH_TO_OUTPUT_FILE = './task1.2/csv/result.txt';
            readStream = fs.createReadStream(PATH_TO_INPUT_FILE);
            writeStream = fs.createWriteStream(PATH_TO_OUTPUT_FILE);


            readStream.pipe(csv()).pipe(writeStream).on('error', function (err) {
                return console.error(err);
            });
        }
    };
});