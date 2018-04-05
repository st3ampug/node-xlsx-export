var dateTime = require('node-datetime');
const configs = require("../configs/config.js");

function Log(txt) {
    if(configs.debug.state) {
        console.log(getFormattedDate() + " [Debug] " + txt);
    }
}

function Error(txt) {
    if(configs.debug.state) {
        console.error(getFormattedDate() + " [Error] " + txt);
    }
}

function getFormattedDate() {
    var dt = dateTime.create();
    return "[" + dt.format(configs.date.format_debug) + "]";
}

module.exports = {
    Log,
    Error
}