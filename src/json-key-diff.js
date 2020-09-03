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

    function findDifference(f1, f2) {
        const missingKeys = {};

        for (var key in f1) {
            if (f2[key] === undefined) {
                missingKeys[key] = f1[key];
            }
        }

        return missingKeys;
    }

    const fileOne = readFile(compareFile);
    const fileTwo = readFile(withFile);

    if (fileOne === null || fileTwo === null) {
        process.exitCode = 1;
        return;
    }

    console.log(`Compare '${compareFile}' with '${withFile}':`);

    const missingFileOne = findDifference(fileTwo, fileOne);
    const missingFileTwo = findDifference(fileOne, fileTwo);

    console.log(`\nKeys missing in file '${compareFile}':`);
    console.log(JSON.stringify(missingFileOne, null, 4));

    console.log(`\nKeys missing in file '${withFile}':`);
    console.log(`${JSON.stringify(missingFileTwo, null, 4)}`);

    if (outputFile) {
        console.log(`\nWrite differences to ${outputFile}`);

        const combined = {};
        combined[compareFile] = missingFileOne;
        combined[withFile] = missingFileTwo;

        try {
            fs.writeFileSync(outputFile, JSON.stringify(combined, null, 4));
        } catch (err) {
            console.error(`Error while writing to file '${outputFile}' ...`);
            process.exitCode = 1;
            return;
        }
    }

    if (missingFileOne === {} || missingFileTwo === {}) {
        process.exitCode = 0;
    } else {
        process.exitCode = 1;
    }
}