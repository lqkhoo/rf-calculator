import IRF5StatVector = require("./IRF5StatVector");
import IRF5Item = require("./IRF5Item");
import IModel = require("./IModel");
import VMRF5Character = require("../vm/VMRF5Character");

interface IRF5Character extends IRF5StatVector, IModel {

    readonly Accessories:   ko.ObservableArray<IRF5Item>;
    readonly Armors:        ko.ObservableArray<IRF5Item>;
    readonly Boots:         ko.ObservableArray<IRF5Item>;
    readonly Headgears:     ko.ObservableArray<IRF5Item>;
    readonly Shields:       ko.ObservableArray<IRF5Item>;
    readonly Weapons:       ko.ObservableArray<IRF5Item>;

    readonly ActiveAccessoryIdx:    ko.PureComputed<number>;
    readonly ActiveArmorIdx:        ko.PureComputed<number>;
    readonly ActiveBootsIdx:        ko.PureComputed<number>;
    readonly ActiveHeadgearIdx:     ko.PureComputed<number>;
    readonly ActiveShieldIdx:       ko.PureComputed<number>;
    readonly ActiveWeaponIdx:       ko.PureComputed<number>;

    readonly ViewModel: VMRF5Character;

    AddAccessory(): void;
    AddArmor(): void;
    AddBoots(): void;
    AddHeadgear(): void;
    AddShield(): void;
    AddWeapon(): void;

    ChangeId (id: number): void;
    SetActiveEquipment(equipmentType: EquipmentType, idx: number): void;

}
export = IRF5Character;