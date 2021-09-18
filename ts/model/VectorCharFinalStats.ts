import ko = require('knockout');
import IRF5Item = require('./IRF5Item');
import RF5AbstractSlot = require('./RF5AbstractSlot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Character = require('./IRF5Character');
// Data

import RF5Data = require('./RF5Data');


class VectorCharFinalStats extends RF5StatVector {

    readonly Character: ko.Observable<IRF5Character>;

    
    constructor(character: IRF5Character) {
        super(0, false);
        const self = this;

        this.level     = ko.pureComputed(function() { return 0; });
        this.rarity    = ko.pureComputed(function() { return 0; });

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK);
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF);
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT);
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF);
        this.stat_STR = ko.pureComputed(self._compute_stat_STR);
        this.stat_INT = ko.pureComputed(self._compute_stat_INT);
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT);
        this.stat_atk_CRT = ko.pureComputed(self._compute_stat_atk_CRT);
        this.stat_atk_KNO = ko.pureComputed(self._compute_stat_atk_KNO);
        this.stat_atk_STN = ko.pureComputed(self._compute_stat_atk_STN);
        this.stat_atk_DIZ = ko.pureComputed(self._compute_stat_atk_DIZ);
        this.stat_atk_PSN = ko.pureComputed(self._compute_stat_atk_PSN);
        this.stat_atk_SEA = ko.pureComputed(self._compute_stat_atk_SEA);
        this.stat_atk_PAR = ko.pureComputed(self._compute_stat_atk_PAR);
        this.stat_atk_SLP = ko.pureComputed(self._compute_stat_atk_SLP);
        this.stat_atk_FTG = ko.pureComputed(self._compute_stat_atk_FTG);
        this.stat_atk_SCK = ko.pureComputed(self._compute_stat_atk_SCK);
        this.stat_atk_FNT = ko.pureComputed(self._compute_stat_atk_FNT);
        this.stat_atk_DRN = ko.pureComputed(self._compute_stat_atk_DRN);
        this.stat_def_ele_FIRE = ko.pureComputed(self._compute_def_ele_FIRE);
        this.stat_def_ele_WATER = ko.pureComputed(self._compute_def_ele_WATER);
        this.stat_def_ele_EARTH = ko.pureComputed(self._compute_def_ele_EARTH);
        this.stat_def_ele_WIND = ko.pureComputed(self._compute_def_ele_WIND);
        this.stat_def_ele_LIGHT = ko.pureComputed(self._compute_def_ele_LIGHT);
        this.stat_def_ele_DARK = ko.pureComputed(self._compute_def_ele_DARK);
        this.stat_def_ele_LOVE = ko.pureComputed(self._compute_def_ele_LOVE);
        this.stat_def_ele_VOID = ko.pureComputed(self._compute_def_ele_VOID);
        this.stat_def_CRT = ko.pureComputed(self._compute_def_CRT);
        this.stat_def_KNO = ko.pureComputed(self._compute_def_KNO);
        this.stat_def_STN = ko.pureComputed(self._compute_def_STN);
        this.stat_def_DIZ = ko.pureComputed(self._compute_def_DIZ);
        this.stat_def_PSN = ko.pureComputed(self._compute_def_PSN);
        this.stat_def_SEA = ko.pureComputed(self._compute_def_SEA);
        this.stat_def_PAR = ko.pureComputed(self._compute_def_PAR);
        this.stat_def_SLP = ko.pureComputed(self._compute_def_SLP);
        this.stat_def_FTG = ko.pureComputed(self._compute_def_FTG);
        this.stat_def_SCK = ko.pureComputed(self._compute_def_SCK);
        this.stat_def_FNT = ko.pureComputed(self._compute_def_FNT);
        this.stat_def_DRN = ko.pureComputed(self._compute_def_DRN);

        this.stat_chargespeed = ko.pureComputed(function() {
            return self.Character().EquipmentStats().stat_chargespeed();
        });
        this.stat_attacklength = ko.pureComputed(function() {
            return self.Character().EquipmentStats().stat_attacklength();
        });
        this.FinalizeVectorOverride();
        
        this.Character = ko.observable(character);
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, _defaultValue: number) => {
        const self = this;
        return function(): number {
            return ((self.Character().GetStatByName(fieldName) as number)
                        + (self.Character().EquipmentStats().GetStatByName(fieldName) as number));
        };
    }

    protected override _compute_stat_ATK = this._compute_number_helper(RF5StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_number_helper(RF5StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_number_helper(RF5StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_number_helper(RF5StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_number_helper(RF5StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_number_helper(RF5StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_number_helper(RF5StatVector.KEY_stat_VIT, 0);
    protected override _compute_stat_atk_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_CRT, 0);
    protected override _compute_stat_atk_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_atk_KNO, 0);
    protected override _compute_stat_atk_STN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_STN, 0);
    protected override _compute_stat_atk_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DIZ, 0);
    protected override _compute_stat_atk_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PSN, 0);
    protected override _compute_stat_atk_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SEA, 0);
    protected override _compute_stat_atk_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PAR, 0);
    protected override _compute_stat_atk_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SLP, 0);
    protected override _compute_stat_atk_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FTG, 0);
    protected override _compute_stat_atk_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SCK, 0);
    protected override _compute_stat_atk_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FNT, 0);
    protected override _compute_stat_atk_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DRN, 0);
    protected override _compute_def_ele_FIRE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_FIRE, 0);
    protected override _compute_def_ele_WATER = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WATER, 0);
    protected override _compute_def_ele_EARTH = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_EARTH, 0);
    protected override _compute_def_ele_WIND = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WIND, 0);
    protected override _compute_def_ele_LIGHT = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LIGHT, 0);
    protected override _compute_def_ele_DARK = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_DARK, 0);
    protected override _compute_def_ele_LOVE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LOVE, 0);
    protected override _compute_def_ele_VOID = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_VOID, 0);
    protected override _compute_def_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_def_CRT, 0);
    protected override _compute_def_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_def_KNO, 0);
    protected override _compute_def_STN = this._compute_number_helper(RF5StatVector.KEY_stat_def_STN, 0);
    protected override _compute_def_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_def_DIZ, 0);
    protected override _compute_def_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_def_PSN, 0);
    protected override _compute_def_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_def_SEA, 0);
    protected override _compute_def_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_def_PAR, 0);
    protected override _compute_def_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_def_SLP, 0);
    protected override _compute_def_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_def_FTG, 0);
    protected override _compute_def_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_def_SCK, 0);
    protected override _compute_def_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_def_FNT, 0);
    protected override _compute_def_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_def_DRN, 0);

}
export = VectorCharFinalStats;