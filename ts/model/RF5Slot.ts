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

    readonly Item: ko.Observable<IRF5Item>;
    readonly ViewModel: VMRF5Slot;

    // For overrides
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;


    constructor(item: IRF5Item, item_id: number) {
        super(item_id);

        var self = this;
        this.Item = ko.observable(item);
        
        this.EquipmentType = ko.pureComputed((function() {
            return Data.EquipmentTypeMap[self.id()];
        }));
        this.WeaponType = ko.pureComputed(function() {
            return Data.WeaponTypeMap[self.id()];
        })

        this.ViewModel = new VMRF5Slot(this);
    }

    public ChangeIdScoper = (id: number): void => {
        this.id(id);
    }

    public ChangeId(id: number): void {
        return this.ChangeIdScoper(id);
    }

}
export = RF5Slot;
