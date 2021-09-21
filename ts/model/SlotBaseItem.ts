import ko = require('knockout');
import IItem = require('./IItem');
// Super
import Slot = require('./Slot');
// VM
import VMSlotBaseItem = require('../vm/VMSlotBaseItem');

class SlotBaseItem extends Slot {

    override readonly ViewModel: VMSlotBaseItem;

    constructor(item: IItem,
                index: number,
                item_id: number=Slot.DEFAULT_ITEM_ID,
                level: number=Slot.DEFAULT_LEVEL) {
                    
        super(item, index, item_id, level, true);
        
        this.UseEquipmentStats = ko.pureComputed(function() { return true; }).extend({ deferred: true });
         // Arrange slots' level values don't count.
        this.level = ko.pureComputed(function() { return 0; }).extend({ deferred: true });
        this.FinalizeVectorOverride();

        this.ViewModel = new VMSlotBaseItem(this);
    }

    public override ChangeId = (id: number): void => {
        this.id(id);
        this.Item().ApplyRecipeRestrictions(this);
    }

}
export = SlotBaseItem;
