import ko = require('knockout');
import IData = require('./IData');
// Parent
import RF5Item = require('./RF5Item');
// Children
import RF5Slot = require('./RF5Slot');
// VM
import VMSlotArrange = require('../vm/VMSlotArrange');

class RF5SlotArrange extends RF5Slot {

    override readonly level: ko.PureComputed<number>;
    
    readonly Restriction: ko.Observable<number>; // Only for boots / accessories. First arrange slot is tied to overriding item.
    override readonly ViewModel: VMSlotArrange;

    constructor(item: RF5Item,
                index: number,
                item_id: number=RF5Slot.DEFAULT_ITEM_ID,
                level: number=RF5Slot.DEFAULT_LEVEL) {
                    
        super(item, index, item_id, level);

        // Arrange slots' level values don't count.
        this.level = ko.pureComputed(function() { return 0; }).extend({ deferred: true });
        this.FinalizeVectorOverride();
        
        this.Restriction = ko.observable(0).extend({ deferred: true });
        this.ViewModel = new VMSlotArrange(this);
    }

    public ApplyRestriction = (id: number): void => {
        this.Restriction(id);
        this.ChangeId(id);
    }

}
export = RF5SlotArrange;
