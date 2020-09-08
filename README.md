# json-key-diff &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/matseee/json-key-diff/LICENSE) [![npm version](https://badge.fury.io/js/json-key-diff.svg)](https://badge.fury.io/js/json-key-diff)
compare multiple json files with each other. It prints out the differences to console or to a file.

## installation
```bash
npm install --global json-key-diff
```

## usage
```
  Usage: json-key-diff [options] [command] <file1> <file2> ...
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -h, --help     Output usage information
    -o, --o        Output-Filepath
    -v, --version  Output the version number
```

## example
`test1.json`:

```json
{
    "random1": "In both",
    "random4": "In both",
    "random7": "Just in test 1",
    "random9": "In both"
}
```

`test2.json`:

```json
{
    "random1": "In both",
    "random4": "In both",
    "random6": "Just in test 2",
    "random14": "Just in test 2",
    "random9": "In both"
}
```

`json-key-diff -o diff.json test1.json test2.json `:

```json
{
    "test1.json": {
        "random6": "Just in test 2",
        "random14": "Just in test 2"
    },
    "test2.json": {
        "random7": "Just in test 1"
    }
}
```
