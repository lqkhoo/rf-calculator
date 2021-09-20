import ISlot = require("./ISlot");

interface IRF5SlotRecipe extends ISlot {
    readonly Restriction: ko.Observable<number>; // item or category id
}
export = IRF5SlotRecipe;