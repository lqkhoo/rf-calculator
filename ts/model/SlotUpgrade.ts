import Slot = require('./Slot');
// Parent
import IItem = require('./IItem');

class SlotUpgrade extends Slot {

    constructor(item: IItem,
                index: number,
                item_id: number=Slot.DEFAULT_ITEM_ID,
                level: number=Slot.DEFAULT_LEVEL) {
        
        super(item, index, item_id, level);
    }

}
export = SlotUpgrade;
