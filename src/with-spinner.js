const Spinner = require('cli-spinner').Spinner;
module.exports = function withSpinner(message, executor) {
    const spinner = new Spinner(message);
    spinner.start()
    executor(() => {
        spinner.stop();
    });
}
