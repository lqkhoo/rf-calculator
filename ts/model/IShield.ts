import IItem from "./IItem";

interface IShield extends IItem {

    readonly HasTrueScale: ko.PureComputed<boolean>;
    readonly ShieldStatMultiplier: ko.PureComputed<number>;

}
export = IShield;