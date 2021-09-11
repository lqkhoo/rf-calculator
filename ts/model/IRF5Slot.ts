import IModel = require("./IModel");
import IRF5Item = require("./IRF5Item");
import IStatVector = require("./IStatVector");

interface IRF5Slot extends IStatVector, IModel {

    readonly Item: ko.Observable<IRF5Item>;
    // For slots, EquipmentType is mutable, hence computed.
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;

    ChangeId(id: number): void;
    
}
export = IRF5Slot;