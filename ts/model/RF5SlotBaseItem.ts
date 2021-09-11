import ko = require('knockout');
import _ = require('lodash');
import IRF5Item = require('./IRF5Item');
// Super
import RF5Slot = require('./RF5Slot');
// VM
import VMRF5SlotBaseItem = require('../vm/VMRF5SlotBaseItem');
// Data
import Data = require('./Data');

class RF5SlotBaseItem extends RF5Slot {

    override readonly ViewModel: VMRF5SlotBaseItem;

    constructor(item: IRF5Item, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, item_id);
        this.UseEquipmentStats(true);
        // Set context to reference base item stats.

        this.ViewModel = new VMRF5SlotBaseItem(this);
    }

    public override ChangeId = (id: number): void => {
        this.id(id);
        this.Item().ApplyRecipeRestrictions(this);
    }

}
export = RF5SlotBaseItem;
