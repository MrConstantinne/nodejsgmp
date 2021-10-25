'use strict';

System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            process.stdin.on('data', function (data) {
                return process.stdout.write(data.toString().split('').reverse().join('') + '\n');
            });
        }
    };
});