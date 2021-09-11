import ko = require('knockout');
import IEquipmentType = require('./IEquipmentType');
import IModel = require('./IModel');
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

class RF5Item extends RF5StatVector implements IEquipmentType, IModel {

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
                    item_id: number=RF5Item.DEFAULT_ITEM_ID) {

        super((Data.Items as any)[item_id]
                || (Data.Items as any)[RF5Item.DEFAULT_ITEM_ID]);

        this.Character = ko.observable(character);
        this.EquipmentType = equipment_type;
        this.IsActive = ko.observable(false);

        this.ViewModel = new VMRF5Item(this); // Needs to be before slots

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

    public ApplyRecipeRestrictions = (baseItem: RF5SlotBaseItem): void => {
        const baseitemId: string = baseItem.id();
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
            this.RecipeSlots()[i].ApplyRestriction(id.toString());
        }
    }


}
export = RF5Item;
