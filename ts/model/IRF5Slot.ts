import IVMRF5Slot = require("../vm/IVMRF5Slot");
import IModel = require("./IModel");
import IRF5Item = require("./IRF5Item");
import IRF5StatVector = require("./IRF5StatVector");

interface IRF5Slot extends IRF5StatVector, IModel {

    readonly Item: ko.Observable<IRF5Item>;
    // Index in terms of slots. e.g. 0 -> Base. 1 -> Recipe1
    readonly Index: number;

    // For slots, EquipmentType is mutable, hence computed.
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;
    readonly LevelOverride: ko.Observable<number>;

    readonly Element: ko.PureComputed<ElementType>;
    readonly HasEffect: ko.PureComputed<boolean>;

    // All of these alter the context to draw stats from.
    readonly IsUnderObjectX: ko.Computed<boolean>;
    readonly IsEffective2FoldSteel: ko.PureComputed<boolean>;
    readonly IsEffective10FoldSteel: ko.PureComputed<boolean>;

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
export = IRF5Slot;