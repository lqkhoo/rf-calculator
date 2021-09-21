// var $ = require('jquery');
import RF4Calculator = require('./model/RF4Calculator');
import ko = require('knockout');
import RF4Data = require('./model/RF4Data');

interface RF5Window extends Window {
    RF5Calculator: RF4Calculator;
    ko: any;
}
declare var window: RF5Window;
window.RF5Calculator = new RF4Calculator(new RF4Data());
window.RF5Calculator.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
ko.options.deferUpdates = true;
window.addEventListener('DOMContentLoaded', function(event) {
    ko.applyBindings(window.RF5Calculator);
    window.RF5Calculator.AddCharacterSynchronous();
    window.RF5Calculator.DisplayFirstCharacterSheet();
    window.RF5Calculator.IsBusy(false);
    console.log('Ready.');
});
