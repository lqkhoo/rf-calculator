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

        this.Item = ko.observable(item).extend({ deferred: true });

        this.rarity = ko.pureComputed(self._compute_rarity).extend({ deferred: true });

        // Values from https://wikiwiki.jp/rf5/%E3%83%9C%E3%83%BC%E3%83%8A%E3%82%B9%E8%A9%B3%E7%B4%B0#l3d5859d
        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT).extend({ deferred: true });
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF).extend({ deferred: true });
        this.FinalizeVectorOverride();
    }

    protected override _compute_rarity = (): number => {
        return 0;
    }

    protected override _compute_stat_ATK = (): number => {
        let val: number = 0;
        if(this.Item().EquipmentType === "weapon") { // eq
            const lvl: number = this.Item().level();
            if(lvl >= 30) { val = 10; }
            if(lvl >= 60) { val = 25; }
            if(lvl >= 90) { val = 70; }
            if(lvl >= 120) { val = 200; }
            if(lvl >= 150) { val = 700; }
        }
        return val;
    }

    protected override _compute_stat_DEF = (): number => {
        let val: number = 0;
        if(this.Item().EquipmentType !== "weapon") { // neq
            const lvl: number = this.Item().level();
            if(lvl >= 30) { val = 6; }
            if(lvl >= 60) { val = 15; }
            if(lvl >= 90) { val = 36; }
            if(lvl >= 120) { val = 180; }
            if(lvl >= 150) { val = 350; }
        }
        return val;
    }

    protected override _compute_stat_MAT = (): number => {
        let val: number = 0;
        if(this.Item().EquipmentType === "weapon") { // eq
            const lvl: number = this.Item().level();
            if(lvl >= 30) { val = 5; }
            if(lvl >= 60) { val = 10; }
            if(lvl >= 90) { val = 40; }
            if(lvl >= 120) { val = 180; }
            if(lvl >= 150) { val = 650; }
        }
        return val;
    }

    protected override _compute_stat_MDF = (): number => {
        let val: number = 0;
        if(this.Item().EquipmentType !== "weapon") { // neq
            const lvl: number = this.Item().level();
            if(lvl >= 30) { val = 5; }
            if(lvl >= 60) { val = 12; }
            if(lvl >= 90) { val = 28; }
            if(lvl >= 120) { val = 170; }
            if(lvl >= 150) { val = 350; }
        }
        return val;
    }

}
export = VectorLevelBonus;