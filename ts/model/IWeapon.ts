import IItem from "./IItem";

interface IWeapon extends IItem {

    readonly HasRareCan: ko.PureComputed<boolean>;
    readonly HasScrapMetalPlus: ko.PureComputed<boolean>;
    readonly HasShadeStone: ko.PureComputed<boolean>;
    readonly Element: ko.PureComputed<ElementType>;

    readonly MagicIdCharge1: ko.PureComputed<number>;
    readonly MagicIdCharge2: ko.PureComputed<number>;
    readonly MagicIdCharge3: ko.PureComputed<number>;

    readonly MagicIdCharge1Name: ko.PureComputed<string>;
    readonly MagicIdCharge2Name: ko.PureComputed<string>;
    readonly MagicIdCharge3Name: ko.PureComputed<string>;
    
}
export = IWeapon;