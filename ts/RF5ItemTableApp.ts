var $ = require('jquery');
import ko = require('knockout');
import RF5ItemTable = require('./model/RF5ItemTable');

interface RF5Window extends Window {
    RF5ItemTable: RF5ItemTable;
    ko: any;
    $: any;
}
declare var window: RF5Window;

window.RF5ItemTable = new RF5ItemTable();
// window.RF5ItemTable.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
window.addEventListener('DOMContentLoaded', function(event) {
    window.setTimeout(function() {
        ko.applyBindings(window.RF5ItemTable);
        window.$('#baseitem-table').bootstrapTable();
        window.$('#upgrade-table').bootstrapTable();
        window.RF5ItemTable.EndInitialLoad();
        window.RF5ItemTable.DisplayFirstCharacterSheet();
        ko.applyBindings(window.RF5ItemTable, $('.filter-header')[0]);
        console.log('Ready.');
    }, 100);
});
