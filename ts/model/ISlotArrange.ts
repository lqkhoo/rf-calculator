import ISlot = require("./ISlot");

interface ISlotArrange extends ISlot {
    readonly Restriction: ko.Observable<number>; // item or category id
}
export = ISlotArrange;