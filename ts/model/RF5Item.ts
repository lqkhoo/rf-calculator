import ko = require('knockout');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5Character = require('./RF5Character');
import RF5StatVector = require('./RF5StatVector');
import IEquipmentType = require('./IEquipmentType');

class RF5Item extends RF5StatVector implements IEquipmentType {

    static readonly NSLOTS_RECIPE: number = 6;
    static readonly NSLOTS_ARRANGE: number = 3;
    static readonly NSLOTS_UPGRADE: number = 9;
    static readonly DEFAULT_ITEM_ID: number = 0;

    readonly EquipmentType: EquipmentType;

    readonly Character: ko.Observable<RF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    constructor(character: RF5Character, equipment_type: EquipmentType, item_id: number=RF5Item.DEFAULT_ITEM_ID) {

        super((character.Planner.Items as any)[item_id]
                || (character.Planner.Items as any)[RF5Item.DEFAULT_ITEM_ID]);

        this.Character = ko.observable(character);
        this.EquipmentType = equipment_type;

        this.BaseItem = ko.observable(new RF5SlotBaseItem(this, equipment_type));
        this.RecipeSlots = ko.observableArray([]);
        for(var i=0; i<RF5Item.NSLOTS_RECIPE; i++) {
            this.RecipeSlots.push(new RF5SlotRecipe(this, equipment_type));
        }
        this.ArrangeSlots = ko.observableArray([]);
        for(var i=0; i<RF5Item.NSLOTS_ARRANGE; i++) {
            this.ArrangeSlots.push(new RF5SlotArrange(this, equipment_type));
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var i=0; i<RF5Item.NSLOTS_UPGRADE; i++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade(this, equipment_type));
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
