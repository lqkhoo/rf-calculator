import IModel = require("./IModel");
import IRF5Character = require("./IRF5Character");
import IRF5Slot = require("./IRF5Slot");
import IStatVector = require("./IStatVector");
// VM
import VMRF5Item = require("../vm/VMRF5Item");

interface IRF5Item extends IStatVector, IModel {

    readonly EquipmentType: EquipmentType;
    readonly IsActive: ko.Observable<boolean>;

    readonly Character: ko.Observable<IRF5Character>;

    readonly BaseItem: ko.Observable<IRF5Slot>;
    readonly RecipeSlots: ko.ObservableArray<IRF5Slot>;
    readonly ArrangeSlots: ko.ObservableArray<IRF5Slot>;
    readonly UpgradeSlots: ko.ObservableArray<IRF5Slot>;

    readonly ViewModel: VMRF5Item;

    ApplyRecipeRestrictions(baseItem: IRF5Slot): void;
    GetSlotByIndex(index: number): IRF5Slot;

}
export = IRF5Item;