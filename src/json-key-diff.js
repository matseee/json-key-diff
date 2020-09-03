const fs = require('fs');

module.exports = (compareFile, withFile, outputFile) => {

    try {
        const fileOne = fs.readFile(compareFile);
    } catch (err) {
        console.error(`File ${compareFile} couldn't open file ...`);
        return;
    }

    try {
        const fileTwo = fs.readFile(withFile);
    } catch (err) {
        console.error(`File ${withFile} couldn't open file ...`);
        return;
    }

    console.log(`Compare ${compareFile} with ${withFile}:`);

    if (outputFile) {
        console.log(`Write differences to ${outputFile}`);
    }

}