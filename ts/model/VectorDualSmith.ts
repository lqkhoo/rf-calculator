import ko = require('knockout');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');
// Data
import RF5AbstractSlot = require('./RF5AbstractSlot');
import Data = require('./Data');
import IRF5StatVector = require('./IRF5StatVector');
import RF5Item = require('./RF5Item');

class VectorDualSmith extends RF5StatVector {
    
    readonly Item: ko.Observable<IRF5Item>;

    override readonly stat_ATK:          ko.PureComputed<number>;
    override readonly stat_MAT:          ko.PureComputed<number>;
    override readonly stat_STR:          ko.PureComputed<number>;
    override readonly stat_INT:          ko.PureComputed<number>;
    override readonly stat_VIT:          ko.PureComputed<number>;
    override readonly stat_atk_CRT:      ko.PureComputed<number>;
    override readonly stat_atk_STN:      ko.PureComputed<number>;
    override readonly stat_def_ele_FIRE: ko.PureComputed<number>;
    override readonly stat_def_ele_WATER: ko.PureComputed<number>;
    override readonly stat_def_ele_EARTH: ko.PureComputed<number>;
    override readonly stat_def_ele_WIND:  ko.PureComputed<number>;
    override readonly stat_def_ele_LIGHT: ko.PureComputed<number>;
    override readonly stat_def_ele_DARK:  ko.PureComputed<number>;

    readonly DualSmithRelationLevelOptions: number[] = [0,1,2,3,4,5,6,7,8,9,10];

    readonly DualSmithRelationLevel: ko.Observable<number>;
    readonly DualSmithBonusType: ko.Observable<DualSmithBonusType>;

    constructor(item: IRF5Item, relationLevel: number, bonusType: DualSmithBonusType) {
        super(0, false);
        const self = this;

        this.Item = ko.observable(item);

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK);
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT);
        this.stat_STR = ko.pureComputed(self._compute_stat_STR);
        this.stat_INT = ko.pureComputed(self._compute_stat_INT);
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT);
        this.stat_atk_CRT = ko.pureComputed(self._compute_stat_atk_CRT);
        this.stat_atk_STN = ko.pureComputed(self._compute_stat_atk_STN);
        this.stat_def_ele_FIRE = ko.pureComputed(self._compute_def_ele_FIRE);
        this.stat_def_ele_WATER = ko.pureComputed(self._compute_def_ele_WATER);
        this.stat_def_ele_EARTH = ko.pureComputed(self._compute_def_ele_EARTH);
        this.stat_def_ele_WIND = ko.pureComputed(self._compute_def_ele_WIND);
        this.stat_def_ele_LIGHT = ko.pureComputed(self._compute_def_ele_LIGHT);
        this.stat_def_ele_DARK = ko.pureComputed(self._compute_def_ele_DARK);
        this.FinalizeVectorOverride();

        this.DualSmithRelationLevel = ko.observable(relationLevel);
        this.DualSmithBonusType = ko.observable(bonusType);
    }

    protected _compute_fixedstat_helper = (_fieldName: StatVectorKey, bonusType: DualSmithBonusType, step: number) => {
        const self = this;
        return function(): number {
            if(self.DualSmithBonusType() !== bonusType) { return 0; }
            return self.DualSmithRelationLevel() * step;
        };
    }

    protected _compute_scaledstat_helper = (fieldName: StatVectorKey, bonusType: DualSmithBonusType, factor: number) => {
        const self = this;
        return function(): number {
            if(self.DualSmithBonusType() !== bonusType) { return 0; }

            let val: number = 0;
            let slot: IRF5StatVector;
            function accumulate(_slot: IRF5StatVector, skipIdZero: boolean=true) {
                slot = _slot;
                if(skipIdZero) {
                    val += (slot.id() === 0) ? 0 : (slot.GetStatByName(fieldName) as number);
                } else {
                    val += (slot.GetStatByName(fieldName) as number);
                }
            };

            accumulate(self.Item().BaseItem());
            for(let i=0; i<RF5Item.NSLOTS_RECIPE; i++) {
                accumulate(self.Item().RecipeSlots()[i]);
            }
            for(let i=0; i<RF5Item.NSLOTS_ARRANGE; i++) {
                accumulate(self.Item().ArrangeSlots()[i]);
            }
            for(let i=0; i<RF5Item.NSLOTS_UPGRADE; i++) {
                accumulate(self.Item().UpgradeSlots()[i]);
            }
            accumulate(self.Item().LevelBonus(), false);
            accumulate(self.Item().RarityBonus(), false);
            accumulate(self.Item().CoreBonus(), false);
            return val * self.DualSmithRelationLevel() * factor;
        };
    }

    protected override _compute_stat_ATK = this._compute_scaledstat_helper(RF5StatVector.KEY_stat_ATK, "ATK", 0.02);
    protected override _compute_stat_MAT = this._compute_scaledstat_helper(RF5StatVector.KEY_stat_MAT, "MAT", 0.02);
    protected override _compute_stat_STR = this._compute_scaledstat_helper(RF5StatVector.KEY_stat_STR, "STR", 0.03);
    protected override _compute_stat_INT = this._compute_scaledstat_helper(RF5StatVector.KEY_stat_INT, "INT", 0.03);
    protected override _compute_stat_VIT = this._compute_scaledstat_helper(RF5StatVector.KEY_stat_VIT, "VIT", 0.03);
    protected override _compute_stat_atk_CRT = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_atk_CRT, "CRT", 1);
    protected override _compute_stat_atk_STN = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_atk_STN, "STN", 2);
    protected override _compute_def_ele_FIRE = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_FIRE, "DEF_FIR", 5);
    protected override _compute_def_ele_WATER = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_WATER, "DEF_WTR", 5);
    protected override _compute_def_ele_EARTH = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_EARTH, "DEF_EAR", 5);
    protected override _compute_def_ele_WIND = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_WIND, "DEF_WND", 5);
    protected override _compute_def_ele_LIGHT = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_LIGHT, "DEF_LGT", 5);
    protected override _compute_def_ele_DARK = this._compute_fixedstat_helper(RF5StatVector.KEY_stat_def_ele_DARK, "DEF_DRK", 5);
}
export = VectorDualSmith;