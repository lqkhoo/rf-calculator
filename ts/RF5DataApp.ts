var $ = require('jquery');
import ko = require('knockout');
import RF5Data = require('./model/RF5Data');
import RF5DataTable = require('./model/RF5DataTable');

interface RF5Window extends Window {
    DataTable: RF5DataTable;
    ko: any;
    $: any;
}
declare var window: RF5Window;

window.DataTable = new RF5DataTable(new RF5Data());
// window.RF5DataTable.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
ko.options.deferUpdates = true;
window.addEventListener('DOMContentLoaded', function(event) {
    window.setTimeout(function() {
        ko.applyBindings(window.DataTable);
        window.$('#baseitem-table').bootstrapTable();
        window.$('#upgrade-table').bootstrapTable();
        window.DataTable.EndInitialLoad();
        window.DataTable.DisplayFirstCharacterSheet();
        let elems = $('.filter-header');
        for(let i=0; i<elems.length; i++) {
            ko.applyBindings(window.DataTable, elems[i]);
        }
        console.log('Ready.');
    }, 100);
});
