import ko = require('knockout');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');
import RF5AbstractSlot = require('./RF5AbstractSlot');
import Data = require('./Data');

class VectorCoreBonus extends RF5StatVector {

    readonly Item: ko.Observable<IRF5Item>;
    readonly HasCoreBonus: ko.PureComputed<boolean>;

    constructor(item: IRF5Item) {
        super(0, false);
        var self = this;

        this.Item = ko.observable(item);
        this.HasCoreBonus = ko.pureComputed(self._compute_hasCoreBonus);

        this.stat_def_ele_VOID = ko.pureComputed(function() {
            return self.HasCoreBonus() ? 10 : 0;
        });
        this.FinalizeVectorOverride();
    }

    protected _compute_hasCoreBonus = (): boolean => {
        if(this.Item().EquipmentType === "weapon") {
            return false; // Doesn't apply to weapons.
        }
        let hasGreenCore: boolean = false;
        let hasRedCore: boolean = false;
        let hasYellowCore: boolean = false;
        let hasBlueCore: boolean = false;
        for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
            let id: number = this.Item().GetSlotByIndex(i).id();
            if(id === 0 ) { continue; }
            if(Data.IsGreenCore(id)) { hasGreenCore = true; continue; }
            if(Data.IsRedCore(id)) { hasRedCore = true; continue; }
            if(Data.IsYellowCore(id)) { hasYellowCore = true; continue; }
            if(Data.IsBlueCore(id)) { hasBlueCore = true; continue; }
        }
        return hasGreenCore && hasRedCore && hasYellowCore && hasBlueCore;
    }

}
export = VectorCoreBonus;