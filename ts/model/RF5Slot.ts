import ko = require('knockout');
import _ = require('lodash');
import RF5StatVector = require('./RF5StatVector');
import RF5Item = require('./RF5Item');
import IEquipmentType = require('./IEquipmentType');
import IUiSlot = require('./IUISlot');
import IModel = require('./IModel');
import VMRF5Slot = require('../vm/VMRF5Slot');

class RF5Slot extends RF5StatVector implements IModel, IEquipmentType, IUiSlot {
    
    static readonly DEFAULT_ITEM_ID: number = 0;

    readonly EquipmentType: EquipmentType;
    readonly UiSlotType: UiSlotType;
    readonly Item: ko.Observable<RF5Item>;

    readonly ViewModel: VMRF5Slot;

    constructor(item: RF5Item, item_id: number, equipment_type: EquipmentType, ui_slot: UiSlotType) {
        super((item.Character().Planner.Items as any)[item_id]
                || (item.Character().Planner.Items as any)[RF5Slot.DEFAULT_ITEM_ID]);

        this.EquipmentType = equipment_type;
        this.UiSlotType = ui_slot;
        this.Item = ko.observable(item);
        this.ViewModel = new VMRF5Slot(this);
    }

    public ChangeIdScoper = (id: string): void => {
        let ctx: any = (this.Item().Character().Planner.Items as any)[id];
        this.Context(ctx);
    }

    public ChangeId(id: string): void {
        return this.ChangeIdScoper(id);
    }

}
export = RF5Slot;
