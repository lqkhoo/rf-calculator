import ko = require('knockout');
import ISlot = require('./ISlot');
// Super
import StatVector = require('./StatVector');
// Parent
import IItem = require('./IItem');
// Data
import AbstractSlot = require('./AbstractSlot');

class VectorRarityBonus extends StatVector {

    readonly Item: ko.Observable<IItem>;
    readonly RarityStatType: ko.PureComputed<string>;

    constructor(item: IItem) {

        super(item.Data, 0, false);
        const self = this;

        this.Item = ko.observable(item).extend({ deferred: true });

        this.RarityStatType = ko.pureComputed(self._compute_rarityStatType).extend({ deferred: true });

        this.rarity = ko.pureComputed(self._compute_rarity).extend({ deferred: true });
        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT).extend({ deferred: true });
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF).extend({ deferred: true });
        this.FinalizeVectorOverride();

    }

    protected _compute_rarityStatType = (): string => {
        let contextItemId: number = 0;
        let slot: ISlot = this.Item().BaseItem();
        if(! slot.IsBeingOverridden()) {
            contextItemId = slot.id();
        } else {
            for(var i=1; i<AbstractSlot.ARRANGE_START_IDX; i++) {
                slot = this.Item().GetSlotByIndex(i);
                if(slot.IsOverriding()) {
                    contextItemId = slot.id();
                    break;
                }
            }
        }
        return (this.Data.Items as any)[contextItemId]["rarity_stat_type"];
    }

    protected override _compute_rarity = (): number => {
        return 0;
    }

    protected override _compute_stat_ATK = (): number => {
        let val: number = 0;
        if(this.RarityStatType() === "ATK") {
            const rar: number = this.Item().rarity();
            if(rar >= 25) { val = 10; }
            if(rar >= 50) { val = 40; }
            if(rar >= 75) { val = 80; }
            if(rar >= 100) { val = 150; }
            if(rar >= 125) { val = 300; }
            if(rar >= 150) { val = 500; }
            if(rar >= 175) { val = 1000; }
            if(rar >= 200) { val = 2000; }
        }
        return val;
    }

    protected override _compute_stat_DEF = (): number => {
        let val: number = 0;
        if(this.RarityStatType() === "DEF") {
            const rar: number = this.Item().rarity();
            if(rar >= 25) { val = 3; }
            if(rar >= 50) { val = 10; }
            if(rar >= 75) { val = 20; }
            if(rar >= 100) { val = 50; }
            if(rar >= 125) { val = 90; }
            if(rar >= 150) { val = 150; }
            if(rar >= 175) { val = 400; }
            if(rar >= 200) { val = 800; }
        }
        return val;
    }

    protected override _compute_stat_MAT = (): number => {
        let val: number = 0;
        if(this.RarityStatType() === "MATK") {
            const rar: number = this.Item().rarity();
            if(rar >= 25) { val = 5; }
            if(rar >= 50) { val = 15; }
            if(rar >= 75) { val = 40; }
            if(rar >= 100) { val = 100; }
            if(rar >= 125) { val = 159; }
            if(rar >= 150) { val = 400; }
            if(rar >= 175) { val = 950; }
            if(rar >= 200) { val = 1800; }
        }
        return val;
    }

    protected override _compute_stat_MDF = (): number => {
        let val: number = 0;
        if(this.RarityStatType() === "MDEF") {
            const rar: number = this.Item().rarity();
            if(rar >= 25) { val = 3; }
            if(rar >= 50) { val = 10; }
            if(rar >= 75) { val = 20; }
            if(rar >= 100) { val = 50; }
            if(rar >= 125) { val = 90; }
            if(rar >= 150) { val = 150; }
            if(rar >= 175) { val = 400; }
            if(rar >= 200) { val = 780; }
        }
        return val;
    }

}
export = VectorRarityBonus;
