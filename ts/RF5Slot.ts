import RF5StatVector = require('./RF5StatVector');

// Anything that wants to occupy a row on the UI, or
// othwerise has some kind of header row or button, would want to inherit from this.

class RF5Slot extends RF5StatVector {
    
    // Class to be bound to knockout so we can reuse item slot templates.
    // These are HTML classnames so try not to change them.
    readonly UiClass: UiClass;

    constructor(ctx: any | undefined, ui_class: UiClass) {
        super(ctx);

        this.UiClass = ui_class;
    }

}
export = RF5Slot;
