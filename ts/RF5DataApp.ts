var $ = require('jquery');
import ko = require('knockout');
import RF5DataTable = require('./model/RF5DataTable');

interface RF5Window extends Window {
    RF5DataTable: RF5DataTable;
    ko: any;
    $: any;
}
declare var window: RF5Window;

window.RF5DataTable = new RF5DataTable();
// window.RF5DataTable.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
ko.options.deferUpdates = true;
window.addEventListener('DOMContentLoaded', function(event) {
    window.setTimeout(function() {
        ko.applyBindings(window.RF5DataTable);
        window.$('#baseitem-table').bootstrapTable();
        window.$('#upgrade-table').bootstrapTable();
        window.RF5DataTable.EndInitialLoad();
        window.RF5DataTable.DisplayFirstCharacterSheet();
        let elems = $('.filter-header');
        for(let i=0; i<elems.length; i++) {
            ko.applyBindings(window.RF5DataTable, elems[i]);
        }
        console.log('Ready.');
    }, 100);
});