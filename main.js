var creator = require('./helpers/creator');
const configs = require('./configs/config');
const logger = require('./helpers/mylogger');
var helpers = require('./helpers/helpers');

process.argv.forEach(function (val, index, array) {
  logger.Log(index + ': ' + val);
});


const filename = (process.argv[2] != null ? process.argv[2] : helpers.getFormattedDate(configs.date.format_filename));
logger.Log(process.argv[2]);

creator.exportIntoXlsx(filename);