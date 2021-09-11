import IRF5Slot = require("./IRF5Slot");

interface IRF5SlotRecipe extends IRF5Slot {
    readonly Restriction: ko.Observable<string>; // item or category id
}
export = IRF5SlotRecipe;