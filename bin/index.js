#!/usr/bin/env node

const args = require('args');
const jsonKeyDiff = require('./json-key-diff');

args.option('o', 'Output-Filepath');

const params = args.parse(process.argv, {
    name: 'json-key-diff',
    value: '<file1> <file2> ...'
});

if (args.sub[ 0 ] && args.sub[ 1 ]) {
    jsonKeyDiff(args.sub[ 0 ], args.sub[ 1 ], params.o);
} else {
    args.showHelp();
}
