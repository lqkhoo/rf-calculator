// var $ = require('jquery');
import RF5Planner = require('./RF5Planner');
import ko = require('knockout');

interface RF5Window extends Window {
    RF5Planner: RF5Planner;
    ko: any;
}
declare var window: RF5Window;

window.RF5Planner = new RF5Planner();
window.ko = ko; // having multiple ko instances will break things. Expose it this way.
window.addEventListener('DOMContentLoaded', function(event) {
    ko.applyBindings(window.RF5Planner);
    window.RF5Planner.AddCharacter();
    window.RF5Planner.DisplayFirstCharacterSheet();
    console.log('Ready.');
});
