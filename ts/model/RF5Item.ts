import _ = require('lodash');
import ko = require('knockout');
import IRF5Item = require('./IRF5Item');
import IRF5Slot = require('./IRF5Slot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
// VM
import VMRF5Item = require('../vm/VMRF5Item');
// Data
import Data = require('./Data');
import RF5Slot = require('./RF5Slot');


class RF5Item extends RF5StatVector implements IRF5Item {

    static readonly NSLOTS_RECIPE: number = 6;
    static readonly NSLOTS_ARRANGE: number = 3;
    static readonly NSLOTS_UPGRADE: number = 9;
    static readonly DEFAULT_ITEM_ID: number = 0;

    readonly EquipmentType: EquipmentType;
    readonly IsActive: ko.Observable<boolean>;

    readonly Character: ko.Observable<IRF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    readonly ViewModel: VMRF5Item;

    constructor(character: IRF5Character, equipment_type: EquipmentType,
                    character_id: number=RF5Item.DEFAULT_ITEM_ID) {
        // TODO: need to set context
        super(character_id);

        this.Character = ko.observable(character);
        this.EquipmentType = equipment_type;
        this.IsActive = ko.observable(false);

        this.ViewModel = new VMRF5Item(this); // Needs to be before slots

        let i = 0;
        this.BaseItem = ko.observable(new RF5SlotBaseItem(this, i));
        i++;
        this.RecipeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_RECIPE; j++) {
            this.RecipeSlots.push(new RF5SlotRecipe(this, i));
            i++;
        }
        this.ArrangeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_ARRANGE; j++) {
            this.ArrangeSlots.push(new RF5SlotArrange(this, i));
            i++
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_UPGRADE; j++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade(this, i));
            i++;
        }
    }

    public ApplyRecipeRestrictions = (baseItem: RF5SlotBaseItem): void => {
        const baseitemId: number = baseItem.id();
        const recipes: any = (Data.Recipes as any);
        const n = this.RecipeSlots().length; // should be 6;

        let ids: number[];
        if(recipes.hasOwnProperty(baseitemId)) {
            ids = (Data.Recipes as any)[baseitemId];
        } else {
            ids = [];
        }
        for(var i=0; i<n; i++) {
            var id = (i < ids.length) ? ids[i] : 0;
            this.RecipeSlots()[i].ApplyRestriction(id);
        }
    }

    public GetSlotByIndex = (index: number): IRF5Slot => {
        index = _.clamp(index, 0, 18); // Inclusive both
        if(index == 0) {
            return this.BaseItem();
        } else if (index < RF5Slot.ARRANGE_START_IDX) {
            return this.RecipeSlots()[index - 1];
        } else if (index < RF5Slot.UPGRADE_START_IDX) {
            return this.ArrangeSlots()[index - RF5Slot.ARRANGE_START_IDX];
        } else {
            return this.UpgradeSlots()[index - RF5Slot.UPGRADE_START_IDX];
        }
    }


}
export = RF5Item;
