#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const parseArgs = require('./arg-parser');
const withSpinner = require('./with-spinner');
const stream = require("stream");

const {filePath, strings, format} = parseArgs();

withSpinner(`Processing file ${filePath} for ${strings.join(', ')} strings.`, (finishCallback) => {
    let linesTotal = 0;
    const readStream = fs.createReadStream(filePath, 'utf-8');
    const writeStreams = strings.map(string => {
        const fileName = format.replace('%', string);

        return {
            string,
            stream: fs.createWriteStream(path.join(process.cwd(), fileName)),
        };
    });

    readStream.on('data', (dataChunk) => {
        const lines = dataChunk.split('\n').filter(line => !!line);
        linesTotal += lines.length;
        writeStreams.forEach(({string, stream}) => {
            lines.forEach(line => {
                if (line.includes(string)) {
                    stream.write(`${line}\n`);
                }
            });
        });
    });

    readStream.on('end', () => {
        writeStreams.forEach(({stream}) => stream.end());
        console.log(`\nDone. Parsed ${linesTotal} lines.`);
        finishCallback();
    });
});
