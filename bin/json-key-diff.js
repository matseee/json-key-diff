const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

function readFile(path) {
    try {
        const file = fs.readFileSync(path);
        try {
            return JSON.parse(file);
        } catch (err) {
            console.error(`File '${path}': Invalid JSON ...`);
            return null;
        }
    } catch (err) {
        console.error(`File '${path}': couldn't open file ...`);
        return null;
    }
}

function findDifference(f1, f2) {
    const missingKeys = {};

    for (var key in f1) {
        if (f2[ key ] === undefined) {
            missingKeys[ key ] = f1[ key ];
        }
    }

    return missingKeys;
}

function printDifferences(differences) {
    for (var key in differences) {
        log(chalk.yellow(`\nMissing Keys in file '${key}':`));
        log(chalk.red(JSON.stringify(differences[ key ], null, 4)));
    }
}

let exitCode = 0;

module.exports = (filePaths, outputFilePath) => {

    // Read every file
    const files = [];
    for (var filePath of filePaths) {
        const tmpFile = readFile(filePath);

        if (tmpFile === null) {
            exitCode = 1;
            return;
        } else {
            files.push(tmpFile);
        }
    }

    const allMissingKeys = {};
    for (var i = 0; i < files.length; i++) {
        var missingKeys = {};

        for (var y = 0; y < files.length; y++) {
            if (files[ y ] === files[ i ]) {
                continue;
            } else {
                const diff = findDifference(files[ y ], files[ i ]);
                for (var key in diff) {
                    exitCode = 1;
                    missingKeys[ key ] = diff[ key ];
                }
            }
        }

        allMissingKeys[ filePaths[ i ] ] = missingKeys;
    }

    printDifferences(allMissingKeys);

    if (outputFilePath) {
        console.log(`\nWrite differences to ${outputFilePath}`);

        try {
            fs.writeFileSync(outputFilePath, JSON.stringify(allMissingKeys, null, 4));
        } catch (err) {
            console.error(`Error while writing to file '${outputFilePath}' ...`);
            process.exitCode = 1;
            return;
        }
    }

    process.exitCode = exitCode;
}