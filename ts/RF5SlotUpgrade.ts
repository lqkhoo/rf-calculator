import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');
class RF5SlotUpgrade extends RF5Slot {

    constructor(item: RF5Item, ui_class: UiEquipmentType, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, item_id, ui_class, "U");
    }

}
export = RF5SlotUpgrade;
