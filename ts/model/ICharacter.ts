// Super
import IStatVector = require("./IStatVector");
import IModel = require("./IModel");
// Parent
import ICalculator = require("./ICalculator");
// Children
import IItem = require("./IItem");
// VM
import VMRF5Character = require("../vm/VMRF5Character");


interface ICharacter extends IStatVector, IModel {

    readonly Calculator:       ICalculator;

    readonly Accessories:   ko.ObservableArray<IItem>;
    readonly Armors:        ko.ObservableArray<IItem>;
    readonly Boots:         ko.ObservableArray<IItem>;
    readonly Headgears:     ko.ObservableArray<IItem>;
    readonly Shields:       ko.ObservableArray<IItem>;
    readonly Weapons:       ko.ObservableArray<IItem>;

    readonly ActiveAccessoryIdx:    ko.PureComputed<number>;
    readonly ActiveArmorIdx:        ko.PureComputed<number>;
    readonly ActiveBootsIdx:        ko.PureComputed<number>;
    readonly ActiveHeadgearIdx:     ko.PureComputed<number>;
    readonly ActiveShieldIdx:       ko.PureComputed<number>;
    readonly ActiveWeaponIdx:       ko.PureComputed<number>;

    readonly HasClover: ko.PureComputed<boolean>;
    readonly HasRareCan: ko.PureComputed<boolean>;
    readonly HasGeneralSetBonus: ko.PureComputed<boolean>;

    readonly EquipmentStats: ko.Observable<IStatVector>;
    readonly GeneralSetBonus: ko.Observable<IStatVector>;
    readonly FinalStats: ko.Observable<IStatVector>;

    readonly ViewModel: VMRF5Character;

    AddAccessory(): void;
    AddArmor(): void;
    AddBoots(): void;
    AddHeadgear(): void;
    AddShield(): void;
    AddWeapon(): void;

    ChangeId (id: number): void;
    SetActiveEquipment(equipmentType: EquipmentType, idx: number): void;
    DeleteItem(equipmentType: EquipmentType, item: IItem): void;

}
export = ICharacter;