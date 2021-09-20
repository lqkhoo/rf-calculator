import IVMRF5Slot = require("../vm/IVMSlot");
import IModel = require("./IModel");
import IItem = require("./IItem");
import IStatVector = require("./IStatVector");

interface ISlot extends IStatVector, IModel {

    readonly Item: ko.Observable<IItem>;
    // Index in terms of slots. e.g. 0 -> Base. 1 -> Recipe1
    readonly Index: number;

    readonly LevelOverride: ko.Observable<number>;

    // For slots, EquipmentType is mutable, hence computed.
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;

    readonly Element: ko.PureComputed<ElementType>;
    readonly HasEffect: ko.PureComputed<boolean>;

    // All of these alter the context to draw stats from.
    readonly IsUnderObjectX: ko.Computed<boolean>;
    readonly IsEffective2FoldSteel: ko.PureComputed<boolean>;
    readonly IsEffective10FoldSteel: ko.PureComputed<boolean>;

    readonly IsRestricted: ko.PureComputed<boolean>;
    readonly IsLocked: ko.PureComputed<boolean>
    readonly HasPrecedingOverrider: ko.PureComputed<boolean>;
    readonly IsOverriding: ko.PureComputed<boolean>;
    readonly IsBeingOverridden: ko.PureComputed<boolean>;

    readonly LightOreCount: ko.PureComputed<number>;
    readonly IsApplyingStats: ko.PureComputed<boolean>;

    readonly ObjectXMultiplier: ko.PureComputed<number>;
    readonly IsApplyingStatsMultiplier: ko.PureComputed<number>;
    readonly DiminishingMultiplier: ko.PureComputed<number>;

    readonly ViewModel: IVMRF5Slot;

    //ELEMENT

    ChangeId(id: number): void;
    
}
export = ISlot;