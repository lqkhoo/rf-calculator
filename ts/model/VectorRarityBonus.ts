import ko = require('knockout');
import IRF5Slot = require('./IRF5Slot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');
// Data
import Data = require('./Data');
import RF5AbstractSlot = require('./RF5AbstractSlot');

class VectorRarityBonus extends RF5StatVector {

    readonly Item: ko.Observable<IRF5Item>;
    readonly RarityStatType: ko.PureComputed<string>;

    constructor(item: IRF5Item) {
        super(0, false);
        const self = this;

        this.Item = ko.observable(item);
        this.RarityStatType = ko.pureComputed(function() {
            let contextItemId: number = 0;
            let slot: IRF5Slot = self.Item().BaseItem();
            if(! slot.IsBeingOverridden()) {
                contextItemId = slot.id();
            } else {
                for(var i=1; i<RF5AbstractSlot.ARRANGE_START_IDX; i++) {
                    slot = self.Item().GetSlotByIndex(i);
                    if(slot.IsOverriding()) {
                        contextItemId = slot.id();
                        break;
                    }
                }
            }
            return (Data.Items as any)[contextItemId]["rarity_stat_type"];
        });

        this.rarity = ko.pureComputed(function() {
            return 0;
        });

        this.stat_ATK = ko.pureComputed(function() {
            let val: number = 0;
            if(self.RarityStatType() === "ATK") {
                let rar: number = self.Item().rarity();
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
        });

        this.stat_DEF = ko.pureComputed(function() {
            let val: number = 0;
            if(self.RarityStatType() === "DEF") {
                let rar: number = self.Item().rarity();
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
        });

        this.stat_MAT = ko.pureComputed(function() {
            let val: number = 0;
            if(self.RarityStatType() === "MATK") {
                let rar: number = self.Item().rarity();
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
        });
        
        this.stat_MDF = ko.pureComputed(function() {
            let val: number = 0;
            if(self.RarityStatType() === "MDEF") {
                let rar: number = self.Item().rarity();
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
        });

        this.FinalizeVectorOverride();

    }

}
export = VectorRarityBonus;
