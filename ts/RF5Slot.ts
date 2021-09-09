import ko = require('knockout');
import RF5StatVector = require('./RF5StatVector');
import RF5Item = require('./RF5Item');
import IUiClass = require('./IUiClass');

// Anything that wants to occupy a row on the UI, or
// othwerise has some kind of header row or button, would want to inherit from this.
class RF5Slot extends RF5StatVector implements IUiClass {
    
    static readonly DEFAULT_ITEM_ID: number = 0;
    // Class to be bound to knockout so we can reuse item slot templates.
    // These are HTML classnames so try not to change them.
    readonly UiClass: UiClassType;
    readonly Item: ko.Observable<RF5Item>;

    constructor(item: RF5Item, item_id: number, ui_class: UiClassType) {

        super((item.Character().Planner.Items as any)[item_id]
                || (item.Character().Planner.Items as any)[RF5Slot.DEFAULT_ITEM_ID]);

        this.UiClass = ui_class;
        this.Item = ko.observable(item);
    }

}
export = RF5Slot;
