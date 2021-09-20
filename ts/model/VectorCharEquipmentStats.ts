import ko = require('knockout');
import IItem = require('./IItem');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import ICharacter = require('./ICharacter');

class VectorCharEquipmentStats extends RF5StatVector {

    readonly Character: ko.Observable<ICharacter>;

    constructor(character: ICharacter) {
        
        super(character.Data, 0, false);
        const self = this;

        this.level     = ko.pureComputed(self._compute_rarity).extend({ deferred: true });
        this.rarity    = ko.pureComputed(self._compute_level).extend({ deferred: true });

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT).extend({ deferred: true });
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF).extend({ deferred: true });
        this.stat_STR = ko.pureComputed(self._compute_stat_STR).extend({ deferred: true });
        this.stat_INT = ko.pureComputed(self._compute_stat_INT).extend({ deferred: true });
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT).extend({ deferred: true });
        this.stat_atk_CRT = ko.pureComputed(self._compute_stat_atk_CRT).extend({ deferred: true });
        this.stat_atk_KNO = ko.pureComputed(self._compute_stat_atk_KNO).extend({ deferred: true });
        this.stat_atk_STN = ko.pureComputed(self._compute_stat_atk_STN).extend({ deferred: true });
        this.stat_atk_DIZ = ko.pureComputed(self._compute_stat_atk_DIZ).extend({ deferred: true });
        this.stat_atk_PSN = ko.pureComputed(self._compute_stat_atk_PSN).extend({ deferred: true });
        this.stat_atk_SEA = ko.pureComputed(self._compute_stat_atk_SEA).extend({ deferred: true });
        this.stat_atk_PAR = ko.pureComputed(self._compute_stat_atk_PAR).extend({ deferred: true });
        this.stat_atk_SLP = ko.pureComputed(self._compute_stat_atk_SLP).extend({ deferred: true });
        this.stat_atk_FTG = ko.pureComputed(self._compute_stat_atk_FTG).extend({ deferred: true });
        this.stat_atk_SCK = ko.pureComputed(self._compute_stat_atk_SCK).extend({ deferred: true });
        this.stat_atk_FNT = ko.pureComputed(self._compute_stat_atk_FNT).extend({ deferred: true });
        this.stat_atk_DRN = ko.pureComputed(self._compute_stat_atk_DRN).extend({ deferred: true });
        this.stat_def_ele_FIRE = ko.pureComputed(self._compute_def_ele_FIRE).extend({ deferred: true });
        this.stat_def_ele_WATER = ko.pureComputed(self._compute_def_ele_WATER).extend({ deferred: true });
        this.stat_def_ele_EARTH = ko.pureComputed(self._compute_def_ele_EARTH).extend({ deferred: true });
        this.stat_def_ele_WIND = ko.pureComputed(self._compute_def_ele_WIND).extend({ deferred: true });
        this.stat_def_ele_LIGHT = ko.pureComputed(self._compute_def_ele_LIGHT).extend({ deferred: true });
        this.stat_def_ele_DARK = ko.pureComputed(self._compute_def_ele_DARK).extend({ deferred: true });
        this.stat_def_ele_LOVE = ko.pureComputed(self._compute_def_ele_LOVE).extend({ deferred: true });
        this.stat_def_ele_VOID = ko.pureComputed(self._compute_def_ele_VOID).extend({ deferred: true });
        this.stat_def_CRT = ko.pureComputed(self._compute_def_CRT).extend({ deferred: true });
        this.stat_def_KNO = ko.pureComputed(self._compute_def_KNO).extend({ deferred: true });
        this.stat_def_STN = ko.pureComputed(self._compute_def_STN).extend({ deferred: true });
        this.stat_def_DIZ = ko.pureComputed(self._compute_def_DIZ).extend({ deferred: true });
        this.stat_def_PSN = ko.pureComputed(self._compute_def_PSN).extend({ deferred: true });
        this.stat_def_SEA = ko.pureComputed(self._compute_def_SEA).extend({ deferred: true });
        this.stat_def_PAR = ko.pureComputed(self._compute_def_PAR).extend({ deferred: true });
        this.stat_def_SLP = ko.pureComputed(self._compute_def_SLP).extend({ deferred: true });
        this.stat_def_FTG = ko.pureComputed(self._compute_def_FTG).extend({ deferred: true });
        this.stat_def_SCK = ko.pureComputed(self._compute_def_SCK).extend({ deferred: true });
        this.stat_def_FNT = ko.pureComputed(self._compute_def_FNT).extend({ deferred: true });
        this.stat_def_DRN = ko.pureComputed(self._compute_def_DRN).extend({ deferred: true });

        this.stat_chargespeed = ko.pureComputed(self._compute_stat_chargespeed).extend({ deferred: true });
        this.stat_attacklength = ko.pureComputed(self._compute_stat_attacklength).extend({ deferred: true });

        this.FinalizeVectorOverride();

        this.Character = ko.observable(character).extend({ deferred: true });
    }

    protected override _compute_level = (): number => {
        return 0;
    }

    protected override _compute_rarity = (): number => {
        return 0;
    }

    protected override _compute_stat_chargespeed = (): number => {
        let activeWeaponIdx: number = this.Character().ActiveWeaponIdx();
        if(activeWeaponIdx === -1) { return 0; }
        return this.Character().Weapons()[activeWeaponIdx].stat_chargespeed();
    }

    protected override _compute_stat_attacklength = (): number => {
        let activeWeaponIdx: number = this.Character().ActiveWeaponIdx();
        if(activeWeaponIdx === -1) { return 0; }
        return this.Character().Weapons()[activeWeaponIdx].stat_attacklength();
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number) => {
        const self = this;
        return function(): number {

            let val: number = defaultValue;
            let item: IItem;
            function accumulate(_item: IItem): void {
                item = _item;
                // In this case we can skip if id === 0
                val += (item.id() === 0) ? 0 : (item.GetStatByName(fieldName) as number);
            };
            let activeIdx: number = self.Character().ActiveWeaponIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Weapons()[activeIdx]);
            }
            activeIdx = self.Character().ActiveShieldIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Shields()[activeIdx]);
            }
            activeIdx = self.Character().ActiveHeadgearIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Headgears()[activeIdx]);
            }
            activeIdx = self.Character().ActiveArmorIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Armors()[activeIdx]);
            }
            activeIdx = self.Character().ActiveBootsIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Boots()[activeIdx]);
            }
            activeIdx = self.Character().ActiveAccessoryIdx();
            if(activeIdx !== -1) {
                accumulate(self.Character().Accessories()[activeIdx]);
            }
            return val;
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
export = VectorCharEquipmentStats;