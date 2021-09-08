import ko = require('knockout');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5Character = require('./RF5Character');
import RF5StatVector = require('./RF5StatVector');

class RF5Item extends RF5StatVector {

    readonly NSLOTS_ARRANGE: number = 3;
    readonly NSLOTS_RECIPE: number = 6;
    readonly NSLOTS_UPGRADE: number = 9;

    readonly Character: ko.Observable<RF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    constructor(character: RF5Character) {

        super((character.Planner.Items as any)[0]); // Default to item_id 0

        this.Character = ko.observable(character);

        this.BaseItem = ko.observable(new RF5SlotBaseItem((character.Planner.Items as any)[0]));

        this.ArrangeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_ARRANGE; i++) {
            this.ArrangeSlots.push(new RF5SlotArrange((character.Planner.Items as any)[0]));
        }
        this.RecipeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_RECIPE; i++) {
            this.RecipeSlots.push(new RF5SlotRecipe((character.Planner.Items as any)[0]));
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var i=0; i<this.NSLOTS_RECIPE; i++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade((character.Planner.Items as any)[0]));
        }
    }

    // Handlers
    public SelectedAsActiveHandler(event: any, ui: any): boolean {
        console.log(event);
        console.log(ui);
        return false;
    }

}
export = RF5Item;
