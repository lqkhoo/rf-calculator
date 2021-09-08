import ko = require('knockout');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5Character = require('./RF5Character');
import RF5Slot = require('./RF5Slot');

class RF5Item extends RF5Slot {

    readonly NSLOTS_RECIPE: number = 6;
    readonly NSLOTS_ARRANGE: number = 3;
    readonly NSLOTS_UPGRADE: number = 9;

    readonly Character: ko.Observable<RF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    constructor(character: RF5Character, ui_class: "weapon" | "shield" | "headgear" | "armor" | "boots" | "accessory") {

        super((character.Planner.Items as any)[0], "weapon"); // Default to item_id 0

        this.Character = ko.observable(character);
        this.BaseItem = ko.observable(new RF5SlotBaseItem((character.Planner.Items as any)[0], ui_class));

        this.RecipeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_RECIPE; i++) {
            this.RecipeSlots.push(new RF5SlotRecipe((character.Planner.Items as any)[0], ui_class));
        }
        this.ArrangeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_ARRANGE; i++) {
            this.ArrangeSlots.push(new RF5SlotArrange((character.Planner.Items as any)[0], ui_class));
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_UPGRADE; i++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade((character.Planner.Items as any)[0], ui_class));
        }
    }

    // Handlers
    public SelectedAsActiveHandler = (event: any, ui: any): boolean => {
        console.log(event);
        console.log(ui);
        return false;
    }

}
export = RF5Item;
