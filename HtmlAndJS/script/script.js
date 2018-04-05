function doit(type, fn, dl) {
	var elt = document.getElementById('data-table');
	var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
	return dl ?
		XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
		XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')));
}

/* initial table */
var aoa = [
	["This",   "is",     "a",    "Test"],
	["வணக்கம்", "สวัสดี", "你好", "가지마"],
	[1,        2,        3,      4],
	["Click",  "to",     "edit", "cells"]
];
var ws = XLSX.utils.aoa_to_sheet(aoa);
var html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table", editable: true });
document.getElementById("container").innerHTML = html_string;

function tableau(pid, iid, fmt, ofile) {
	if(typeof Downloadify !== 'undefined') Downloadify.create(pid,{
			swf: 'downloadify.swf',
			downloadImage: 'download.png',
			width: 100,
			height: 30,
			filename: ofile, data: function() { return doit(fmt, ofile, true); },
			transparent: false,
			append: false,
			dataType: 'base64',
			onComplete: function(){ alert('Your File Has Been Saved!'); },
			onCancel: function(){ alert('You have cancelled the saving of this file.'); },
			onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); }
	}); else document.getElementById(pid).innerHTML = "";
}
tableau('biff8btn', 'xportbiff8', 'biff8', 'test.xls');
tableau('odsbtn',   'xportods',   'ods',   'test.ods');
tableau('fodsbtn',  'xportfods',  'fods',  'test.fods');
tableau('xlsbbtn',  'xportxlsb',  'xlsb',  'test.xlsb');
tableau('xlsxbtn',  'xportxlsx',  'xlsx',  'test.xlsx');