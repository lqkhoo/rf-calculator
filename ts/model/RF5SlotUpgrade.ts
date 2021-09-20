import ko = require('knockout');
import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');

class RF5SlotUpgrade extends RF5Slot {

    constructor(item: RF5Item,
                index: number,
                item_id: number=RF5Slot.DEFAULT_ITEM_ID,
                level: number=RF5Slot.DEFAULT_LEVEL) {
        
        super(item, index, item_id, level);
    }

}
export = RF5SlotUpgrade;
