const fs = require('fs');

const generateCSV = (_businessCode, _openingHours, _fromDate, _toDate) => {
    let fromDate = new Date(_fromDate);
    let toDate = new Date(_toDate);
    let numberOfDays = Math.floor((Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()) - Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) ) /(1000 * 60 * 60 * 24));
    console.log('Your Business will be marked as closed for ' + numberOfDays + ' days.\nGenerating the CSV file...');
    let listOfDates = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1).toString().padStart(2, '0') + '-' + fromDate.getDate().toString().padStart(2, '0') + ': ' + _openingHours;
    
    for (i = 0; i < numberOfDays; i++) {
        fromDate.setDate(fromDate.getDate() + 1);
        listOfDates += ', ' + fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1).toString().padStart(2, '0') + '-' + fromDate.getDate().toString().padStart(2, '0') + ': ' + _openingHours;
    };
    
    return 'Geschäftscode,Spezielle Öffnungszeiten\n' + _businessCode + ',"' + listOfDates + '"';
}

//Enter your Data
var fileName = 'closedPeriod.csv';
var businessCode = 'COC';

//HH:MM-HH:MM or x for closed
var openingHours = 'x';

//toDate is the last day the business is closed
var fromDate = '2019, 12, 31';
var toDate = '2020, 3, 31';

// write to a new closedTimePeriod.csv
fs.writeFile(fileName, generateCSV(businessCode, openingHours, fromDate, toDate), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('File saved!');
});