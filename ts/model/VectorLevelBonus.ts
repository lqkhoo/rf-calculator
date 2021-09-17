import ko = require('knockout');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');

class VectorLevelBonus extends RF5StatVector {

    readonly Item: ko.Observable<IRF5Item>;

    constructor(item: IRF5Item) {
        super(0, false);
        const self = this;

        this.Item = ko.observable(item);

        this.rarity = ko.pureComputed(function() {
            return 0;
        });


        // Values from https://wikiwiki.jp/rf5/%E3%83%9C%E3%83%BC%E3%83%8A%E3%82%B9%E8%A9%B3%E7%B4%B0#l3d5859d

        this.stat_ATK = ko.pureComputed(function() {
            let val: number = 0;
            if(self.Item().EquipmentType === "weapon") { // eq
                let lvl: number = self.Item().level();
                if(lvl >= 30) { val = 10; }
                if(lvl >= 60) { val = 25; }
                if(lvl >= 90) { val = 70; }
                if(lvl >= 120) { val = 200; }
                if(lvl >= 150) { val = 700; }
            }
            return val;
        });

        this.stat_DEF = ko.pureComputed(function() {
            let val: number = 0;
            if(self.Item().EquipmentType !== "weapon") { // neq
                let lvl: number = self.Item().level();
                if(lvl >= 30) { val = 6; }
                if(lvl >= 60) { val = 15; }
                if(lvl >= 90) { val = 36; }
                if(lvl >= 120) { val = 180; }
                if(lvl >= 150) { val = 350; }
            }
            return val;
        });
        
        this.stat_MAT = ko.pureComputed(function() {
            let val: number = 0;
            if(self.Item().EquipmentType === "weapon") { // eq
                let lvl: number = self.Item().level();
                if(lvl >= 30) { val = 5; }
                if(lvl >= 60) { val = 10; }
                if(lvl >= 90) { val = 40; }
                if(lvl >= 120) { val = 180; }
                if(lvl >= 150) { val = 650; }
            }
            return val;
        });

        this.stat_MDF = ko.pureComputed(function() {
            let val: number = 0;
            if(self.Item().EquipmentType !== "weapon") { // neq
                let lvl: number = self.Item().level();
                if(lvl >= 30) { val = 5; }
                if(lvl >= 60) { val = 12; }
                if(lvl >= 90) { val = 28; }
                if(lvl >= 120) { val = 170; }
                if(lvl >= 150) { val = 350; }
            }
            return val;
        });

        this.FinalizeVectorOverride();
    }

}
export = VectorLevelBonus;