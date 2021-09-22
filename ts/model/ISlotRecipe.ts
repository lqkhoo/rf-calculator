import ISlot = require("./ISlot");

interface ISlotRecipe extends ISlot {
    readonly Restriction: ko.Observable<number>; // item or category id
}
export = ISlotRecipe;