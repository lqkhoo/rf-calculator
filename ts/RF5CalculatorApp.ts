// var $ = require('jquery');
import RF5Calculator = require('./model/RF5Calculator');
import ko = require('knockout');
import RF5Data = require('./model/RF5Data');

interface RF5Window extends Window {
    Calculator: RF5Calculator;
    ko: any;
}
declare var window: RF5Window;
window.Calculator = new RF5Calculator(new RF5Data());
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
