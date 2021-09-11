import IStatVector = require("./IStatVector");
import IRF5Item = require("./IRF5Item");
import IModel = require("./IModel");
import VMRF5Character = require("../vm/VMRF5Character");

interface IRF5Character extends IStatVector, IModel {

    readonly Accessories:   ko.ObservableArray<IRF5Item>;
    readonly Armors:        ko.ObservableArray<IRF5Item>;
    readonly Boots:         ko.ObservableArray<IRF5Item>;
    readonly Headgears:     ko.ObservableArray<IRF5Item>;
    readonly Shields:       ko.ObservableArray<IRF5Item>;
    readonly Weapons:       ko.ObservableArray<IRF5Item>;

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