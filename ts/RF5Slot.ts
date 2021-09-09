import ko = require('knockout');
import RF5StatVector = require('./RF5StatVector');
import RF5Item = require('./RF5Item');
import IUiEquipment = require('./IUiEquipment');
import IUiSlot = require('./IUISlot');

// Anything that wants to occupy a row on the UI, or
// othwerise has some kind of header row or button, would want to inherit from this.
class RF5Slot extends RF5StatVector implements IUiEquipment, IUiSlot {
    
    static readonly DEFAULT_ITEM_ID: number = 0;
    // Class to be bound to knockout so we can reuse item slot templates.
    // These are HTML classnames so try not to change them.
    readonly UiEquipmentType: UiEquipmentType;
    readonly UiSlotType: UiSlotType;

    readonly Item: ko.Observable<RF5Item>;

    constructor(item: RF5Item, item_id: number, ui_class: UiEquipmentType, ui_slot: UiSlotType) {

        super((item.Character().Planner.Items as any)[item_id]
                || (item.Character().Planner.Items as any)[RF5Slot.DEFAULT_ITEM_ID]);

        this.UiEquipmentType = ui_class;
        this.UiSlotType = ui_slot;
        this.Item = ko.observable(item);
    }

}
export = RF5Slot;
