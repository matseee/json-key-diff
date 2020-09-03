[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/matseee/json-key-diff/LICENSE)
# json-key-diff
compare two json files with each other by keys. It prints out the differences to console or to a file.

## installation
```bash
npm install --global json-key-diff
```

## usage
```
  Usage: json-key-diff [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -f, --f        File, 1st .json-file
    -h, --help     Output usage information
    -o, --o        Output, output .json-file
    -v, --version  Output the version number
    -w, --w        With, 2st .json-file
```

## example
`test-data/test1.json`:

```json
{
    "random1": "In both",
    "random4": "In both",
    "random7": "Just in test 1",
    "random9": "In both"
}
```

`test-data/test2.json`:

```json
{
    "random1": "In both",
    "random4": "In both",
    "random6": "Just in test 2",
    "random14": "Just in test 2",
    "random9": "In both"
}
```

`json-key-diff -f test-data/test1.json -w test-data/test2.json -o test-data/output.json`:

```json
{
    "test-data/test1.json": {
        "random6": "Just in test 2",
        "random14": "Just in test 2"
    },
    "test-data/test2.json": {
        "random7": "Just in test 1"
    }
}
```