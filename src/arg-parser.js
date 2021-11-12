const yargs = require("yargs");


module.exports = function parseArgs() {
    const options = yargs
        .usage('npm start -- -f file-to-parse strings to parse seperated by space')
        .option('path', {
            alias: 'p',
            type: 'string',
            describe: 'path to file to parse',
            array: false,
            demandOption: true,
        })
        .option('format', {
            alias: 'f',
            type: 'string',
            describe: 'file naming format % - is a token which will be replaces with the search string',
            default: '%_request.log'
        })
        .option('', {
            array: true,
        })
        .example([
            ['npm start -- -p ./access.log "searchString"', 'Parse ./access.log and filter all lines containing "searchString" to searcgString_request.log file'],
            ['npm start -- -p ./access.log -f "%_superfile.txt" "searchString"', 'Parse ./access.log and filter all lines containing "searchString" to searchString_superfile.txt file'],
        ])
        .argv;

    if (!options._.length) {
        console.error('Please provide at least one search string');
        process.exit(1);
    }

    return {
        filePath: options.path,
        strings: options._,
        format: options.format,
    }
}
