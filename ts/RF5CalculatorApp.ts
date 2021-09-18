// var $ = require('jquery');
import RF5Calculator = require('./model/RF5Calculator');
import ko = require('knockout');

interface RF5Window extends Window {
    RF5Calculator: RF5Calculator;
    ko: any;
}
declare var window: RF5Window;

window.RF5Calculator = new RF5Calculator();
window.RF5Calculator.IsBusy(true);
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
window.addEventListener('DOMContentLoaded', function(event) {
    ko.applyBindings(window.RF5Calculator);
    window.RF5Calculator.AddCharacterSynchronous();
    window.RF5Calculator.DisplayFirstCharacterSheet();
    window.RF5Calculator.IsBusy(false);
    console.log('Ready.');
});
