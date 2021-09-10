import _ = require('lodash');
import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');
import RF5Planner = require('../RF5Planner');
import VMRF5SlotBaseItem = require('../vm/VMRF5SlotBaseItem');
class RF5SlotBaseItem extends RF5Slot {

    override readonly ViewModel: VMRF5SlotBaseItem;

    constructor(item: RF5Item, equipment_type: EquipmentType, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, item_id, equipment_type, "B");

        this.ViewModel = new VMRF5SlotBaseItem(this);
    }

}
export = RF5SlotBaseItem;
