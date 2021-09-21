import IModel = require("./IModel");
import ICharacter = require("./ICharacter");
import ISlot = require("./ISlot");
import IStatVector = require("./IStatVector");
// VM
import VMItem = require("../vm/VMItem");

interface IItem extends IStatVector, IModel {

    readonly EquipmentType: EquipmentType;
    readonly IsActive: ko.Observable<boolean>;

    readonly LevelBonus: ko.Observable<IStatVector>;
    readonly RarityBonus: ko.Observable<IStatVector>;
    readonly CoreBonus: ko.Observable<IStatVector>;
    readonly HasClover: ko.PureComputed<boolean>;

    readonly Character: ko.Observable<ICharacter>;

    readonly BaseItem: ko.Observable<ISlot>;
    readonly RecipeSlots: ko.ObservableArray<ISlot>;
    readonly ArrangeSlots: ko.ObservableArray<ISlot>;
    readonly UpgradeSlots: ko.ObservableArray<ISlot>;

    readonly ViewModel: VMItem;

    ApplyRecipeRestrictions(baseItem: ISlot): void;
    ApplyArrangeRestrictions(): void;
    GetSlotByIndex(index: number): ISlot;

}
export = IItem;