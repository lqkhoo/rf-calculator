import IRF5Slot = require("./IRF5Slot");

interface IRF5SlotArrange extends IRF5Slot {
    readonly Restriction: ko.Observable<number>; // item or category id
}
export = IRF5SlotArrange;