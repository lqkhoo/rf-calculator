// var $ = require('jquery');
import RF4Calculator = require('./model/RF4Calculator');
import ko = require('knockout');
import RF4Data = require('./model/RF4Data');

interface RF5Window extends Window {
    Calculator: RF4Calculator;
    ko: any;
}
declare var window: RF5Window;
window.Calculator = new RF4Calculator(new RF4Data());
window.Calculator.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
ko.options.deferUpdates = true;
window.addEventListener('DOMContentLoaded', function(event) {
    ko.applyBindings(window.Calculator);
    window.Calculator.AddCharacterSynchronous();
    window.Calculator.DisplayFirstCharacterSheet();
    window.Calculator.IsBusy(false);
    console.log('Ready.');
});
