import IModel = require("./IModel");
import IRF5Item = require("./IRF5Item");
import IStatVector = require("./IStatVector");

interface IRF5Slot extends IStatVector, IModel {

    readonly Item: ko.Observable<IRF5Item>;
    // Index in terms of slots. e.g. 0 -> Base. 1 -> Recipe1
    readonly Index: number;

    // For slots, EquipmentType is mutable, hence computed.
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;

    // All of these alter the context to draw stats from.
    readonly IsUnderObjectX: ko.Computed<boolean>;
    readonly IsEffective2FoldSteel: ko.PureComputed<boolean>;
    readonly IsEffective10FoldSteel: ko.PureComputed<boolean>;
    readonly IsOverriding: ko.PureComputed<boolean>;
    readonly IsBeingOverridden: ko.PureComputed<boolean>;
    readonly DiminishingMultiplier: ko.PureComputed<number>;

    //TODO diminishing returns
    //ELEMENT

    ChangeId(id: number): void;
    
}
export = IRF5Slot;