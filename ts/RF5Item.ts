import ko = require('knockout');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5Character = require('./RF5Character');

class RF5Item {

    readonly NSLOTS_ARRANGE: number = 3;
    readonly NSLOTS_RECIPE: number = 6;
    readonly NSLOTS_UPGRADE: number = 9;

    readonly Character: ko.Observable<RF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    constructor(character: RF5Character) {
        this.Character = ko.observable(character);

        this.BaseItem = ko.observable(new RF5SlotBaseItem(undefined));

        this.ArrangeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_ARRANGE; i++) {
            this.ArrangeSlots.push(new RF5SlotArrange(undefined));
        }
        this.RecipeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_RECIPE; i++) {
            this.RecipeSlots.push(new RF5SlotRecipe(undefined));
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_RECIPE; i++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade(undefined));
        }
    }

}
export = RF5Item;
