const fs = require('fs');

module.exports = (compareFile, withFile, outputFile) => {
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

    console.log(`Compare '${compareFile}' with '${withFile}':`);

    if (outputFile) {
        console.log(`Write differences to ${outputFile}`);
    }

}