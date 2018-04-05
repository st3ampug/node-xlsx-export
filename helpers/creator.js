var XLSX = require('xlsx');
var helpers = require('./helpers');
const configs = require('../configs/config');
var logger = require('./mylogger');


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function exportIntoXlsx(filename, sitename, invname, invemail) {
    /* original data */
    var filen = filename + ".xlsx";
    //var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
    var data = [
        ['SiteNumber','UniqueID','InvName','SiteName','SiteEmail','SubjectNum','Group1','Group2']
    ];
    var ws_name = "GeneratedSheet";

    data = addLines(data, 3, sitename, invname, invemail);
    logger.Log(data);
    
    if(typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
    
    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* write workbook */
    if(typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, filen);
    if(typeof console !== 'undefined') console.log(new Date());
}

function addLines(base_arr, num, sitename, invname, invemail) {
    const base_site_num = helpers.getFormattedDate(configs.date.format_sitenumber);
    const base_uniq_id = helpers.getFormattedDate(configs.date.format_unique_id);
    const investigator_name = (invname != null ? invname : configs.strings.investigator_name);
    const investigator_email = (invemail != null ? invemail : configs.strings.investigator_email);
    const site_name = (sitename != null ? sitename : configs.strings.site_name);
    const base_subject_number = configs.ints.base_site_number;
    const base_group1_number = configs.ints.base_group1_number;
    const base_group2_number = configs.ints.base_group2_number;
    const subj_incr = configs.ints.subject_num_incr;
    const grp_incr = configs.ints.group_num_incr;

    for(var i = 0; i < num; i++) {
        base_arr.push(
            [
                base_site_num + i,
                base_uniq_id + i,
                investigator_name,
                site_name + i,
                investigator_email,
                (base_subject_number + i*1000).toString() + '-' + (base_subject_number + i*1000 + subj_incr).toString(),
                (base_group1_number + i*1000).toString() + '-' + (base_group1_number + i*1000 + grp_incr).toString(),
                (base_group2_number + i*1000).toString() + '-' + (base_group2_number + i*1000 + grp_incr).toString()
            ]
        );
    }

    return base_arr;
}

module.exports = {
    exportIntoXlsx
}

// Format of a valid subject/site import xlsx
/*

|SiteNumber|UniqueID|InvName|SiteName|SiteEmail|SubjectNum|Group1|Group2|
|xxxxxxx   |xxxxxxx |xxxxxxx|xxxxxxx |xxxxxxx  |xxxxxxx   |xxxxxx|xxxxxx|
|...       |

*/