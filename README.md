# GeekBrains file parser implementation example
## Setup:
```bash
    // install project dependencies
    npm install
```
## Usage:
```bash
    // Show help entry
    npm start -- --help 
    
    // Basic usage
    // Will splite ./access.log file into
    // 89.123.1.41_request.log file, containing only lines with this ip
    // 176.212.24.22_request.log file, containing only lines with this ip
    npm start -- -p ./access.log 89.123.1.41 176.212.24.22
    
    // With Format
    // Same as above, but output files will be named 
    // 89.123.1.41_super_file.txt 
    // 176.212.24.22_super_file.txt 
    npm start -- -p ./access.log -f %_super_file.txt 89.123.1.41 176.212.24.22
```
Alternatively binaries are provided via package.json
You can build it with `npm link` and user `gb-file-parser` command instead of `npm start --`
