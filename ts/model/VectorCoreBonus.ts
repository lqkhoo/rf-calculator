import ko = require('knockout');
// Super
import StatVector = require('./StatVector');
// Parent
import IItem = require('./IItem');
import AbstractSlot = require('./AbstractSlot');

class VectorCoreBonus extends StatVector {

    readonly Item: ko.Observable<IItem>;
    readonly HasCoreBonus: ko.PureComputed<boolean>;

    constructor(item: IItem) {
        
        super(item.Data, 0, false);
        const self = this;

        this.Item = ko.observable(item).extend({ deferred: true });

        this.HasCoreBonus = ko.pureComputed(self._compute_hasCoreBonus).extend({ deferred: true });

        this.stat_def_ele_VOID = ko.pureComputed(self._compute_def_ele_VOID).extend({ deferred: true });
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
        for(let i=AbstractSlot.ARRANGE_START_IDX; i<AbstractSlot.SLOT_END_IDX; i++) {
            let id: number = this.Item().GetSlotByIndex(i).id();
            if(id === 0 ) { continue; }
            if(this.Data.IsGreenCore(id)) { hasGreenCore = true; continue; }
            if(this.Data.IsRedCore(id)) { hasRedCore = true; continue; }
            if(this.Data.IsYellowCore(id)) { hasYellowCore = true; continue; }
            if(this.Data.IsBlueCore(id)) { hasBlueCore = true; continue; }
        }
        return hasGreenCore && hasRedCore && hasYellowCore && hasBlueCore;
    }

    protected override _compute_def_ele_VOID = (): number => {
        return this.HasCoreBonus() ? 10 : 0;
    }

}
export = VectorCoreBonus;