import ko = require('knockout');
import _ = require('lodash');
import IRF5Slot = require('./IRF5Slot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');
// VM
import VMRF5Slot = require('../vm/VMRF5Slot');
// Data
import Data = require('./Data');


class RF5Slot extends RF5StatVector implements IRF5Slot {
    
    static readonly DEFAULT_ITEM_ID: number = 0;

    readonly EquipmentType: EquipmentType;
    readonly Item: ko.Observable<IRF5Item>;

    readonly ViewModel: VMRF5Slot;

    constructor(item: IRF5Item, item_id: number, equipment_type: EquipmentType) {
        super((Data.Items as any)[item_id]
                || (Data.Items as any)[RF5Slot.DEFAULT_ITEM_ID]);

        this.EquipmentType = equipment_type;
        this.Item = ko.observable(item);
        this.ViewModel = new VMRF5Slot(this);
    }

    public ChangeIdScoper = (id: string): void => {
        let ctx: any = (Data.Items as any)[id];
        this.Context(ctx);
    }

    public ChangeId(id: string): void {
        return this.ChangeIdScoper(id);
    }

}
export = RF5Slot;
