import IModel = require("./IModel");
import IRF5Character = require("./IRF5Character");
import IRF5Slot = require("./IRF5Slot");
import IRF5StatVector = require("./IRF5StatVector");
// VM
import VMRF5Item = require("../vm/VMRF5Item");

interface IRF5Item extends IRF5StatVector, IModel {

    readonly EquipmentType: EquipmentType;
    readonly IsActive: ko.Observable<boolean>;

    readonly LevelBonus: ko.Observable<IRF5StatVector>;
    readonly RarityBonus: ko.Observable<IRF5StatVector>;
    readonly HasClover: ko.PureComputed<boolean>;
    // readonly HasRareCan: ko.PureComputed<boolean>;
    // readonly HasScrapMetalPlus: ko.PureComputed<boolean>;

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