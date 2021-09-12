import ko = require('knockout');
import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');

class RF5SlotArrange extends RF5Slot {

    override readonly level: ko.PureComputed<number>;

    constructor(item: RF5Item, index: number, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, index, item_id);

        this.level = ko.pureComputed(function() {
            return 0; // Arrange slots' level values don't count.
        });
        
        this.FinalizeVectorOverride();

    }

}
export = RF5SlotArrange;
