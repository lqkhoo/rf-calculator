var $ = require('jquery');
import ko = require('knockout');
import RF4Data = require('./model/RF4Data');
import RF4DataTable = require('./model/RF4DataTable');

interface RF4Window extends Window {
    RF4DataTable: RF4DataTable;
    ko: any;
    $: any;
}
declare var window: RF4Window;

window.RF4DataTable = new RF4DataTable(new RF4Data());
// window.RF4DataTable.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
ko.options.deferUpdates = true;
window.addEventListener('DOMContentLoaded', function(event) {
    window.setTimeout(function() {
        ko.applyBindings(window.RF4DataTable);
        window.$('#baseitem-table').bootstrapTable();
        window.$('#upgrade-table').bootstrapTable();
        window.RF4DataTable.EndInitialLoad();
        window.RF4DataTable.DisplayFirstCharacterSheet();
        let elems = $('.filter-header');
        for(let i=0; i<elems.length; i++) {
            ko.applyBindings(window.RF4DataTable, elems[i]);
        }
        console.log('Ready.');
    }, 100);
});
