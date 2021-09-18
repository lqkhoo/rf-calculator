// var $ = require('jquery');
import ko = require('knockout');
import RF5ItemTable = require('./model/RF5ItemTable');

interface RF5Window extends Window {
    RF5ItemTable: RF5ItemTable;
    ko: any;
}
declare var window: RF5Window;

window.RF5ItemTable = new RF5ItemTable();
// window.RF5ItemTable.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
window.addEventListener('DOMContentLoaded', function(event) {
    ko.applyBindings(window.RF5ItemTable);
    /*
    window.RF5ItemTable.AddCharacterSynchronous();
    window.RF5ItemTable.DisplayFirstCharacterSheet();
    window.RF5ItemTable.IsBusy(false);
    */
    console.log('Ready.');
});
