import _ = require('lodash');
// Super
import RF5Slot = require('./RF5Slot');
// VM
import VMRF5SlotBaseItem = require('../vm/VMRF5SlotBaseItem');
import Data = require('./Data');
// Refactor
import RF5Item = require('./RF5Item');

class RF5SlotBaseItem extends RF5Slot {

    override readonly ViewModel: VMRF5SlotBaseItem;
    readonly ItemType: ko.PureComputed<EquipmentType | WeaponType>;

    constructor(item: RF5Item, equipment_type: EquipmentType, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, item_id, equipment_type);

        var self = this;
        /*
        this.ItemType = ko.pureComputed(function() {
            if(self.Item().EquipmentType !== "weapon") {
                return self.Item().EquipmentType;
            } else {

            }
        })
        */

        this.ViewModel = new VMRF5SlotBaseItem(this);
    }

    public override ChangeId = (id: string): void => {
        super.ChangeId(id);
        this.Item().ApplyRecipeRestrictions(this);
    }

}
export = RF5SlotBaseItem;
