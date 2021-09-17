import ko = require('knockout');
import IRF5Slot = require('./IRF5Slot');
// Parent
import RF5Item = require('./RF5Item');
// Children
import RF5Slot = require('./RF5Slot');
// Data
import RF5AbstractSlot = require('./RF5AbstractSlot');
// VM
import VMRF5SlotArrange = require('../vm/VMRF5SlotArrange');

class RF5SlotArrange extends RF5Slot {

    override readonly level: ko.PureComputed<number>;
    
    readonly Restriction: ko.Observable<number>; // Only for boots / accessories. First arrange slot is tied to overriding item.
    override readonly ViewModel: VMRF5SlotArrange;

    constructor(item: RF5Item, index: number, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, index, item_id);
        const self = this;

        this.level = ko.pureComputed(function() {
            return 0; // Arrange slots' level values don't count.
        });
        this.FinalizeVectorOverride();
        
        this.Restriction = ko.observable(0);
        this.ViewModel = new VMRF5SlotArrange(this);
    }

    public ApplyRestriction = (id: number): void => {
        this.Restriction(id);
        this.ChangeId(id);
    }

}
export = RF5SlotArrange;
