const args = require('args');
const jsonKeyDiff = require('./json-key-diff');

args.option('f', 'File, 1st .json-file')
    .option('w', 'With, 2st .json-file')
    .option('o', 'Output, output .json-file');

const params = args.parse(process.argv, {
    name: 'json-key-diff'
});

if (params.f && params.w) {
    jsonKeyDiff(params.f, params.w, params.o);
} else {
    args.showHelp();
}
