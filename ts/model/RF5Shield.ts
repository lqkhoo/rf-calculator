import ko = require('knockout');
// Super
import IShield = require('./IShield');
import RF5Item = require('./RF5Item');
// Parent
import ICharacter = require('./ICharacter');
// Children
import StatVector = require('./StatVector');
// Data
import AbstractSlot = require('./AbstractSlot');
    
class RF5Shield extends RF5Item implements IShield {

    HasTrueScale: ko.PureComputed<boolean>;
    ShieldStatMultiplier: ko.PureComputed<number>;

    constructor(character: ICharacter,
                item_id: number=RF5Shield.DEFAULT_ITEM_ID,
                deserializedObject: any=RF5Shield.DEFAULT_DESERIALIZED_OBJECT) {

        super(character, "shield", item_id, deserializedObject);
        const self = this;

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT).extend({ deferred: true });
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF).extend({ deferred: true });
        this.stat_STR = ko.pureComputed(self._compute_stat_STR).extend({ deferred: true });
        this.stat_INT = ko.pureComputed(self._compute_stat_INT).extend({ deferred: true });
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT).extend({ deferred: true });
        this.FinalizeVectorOverride();

        this.HasTrueScale = ko.pureComputed(self._compute_hasTrueScale).extend({ deferred: true });
        this.ShieldStatMultiplier = ko.pureComputed(self._compute_shieldStatMultiplier).extend({ deferred: true });
    }

    public _compute_hasTrueScaleScoper(): boolean {
        let hasScale: boolean = false;
        for(let i=AbstractSlot.ARRANGE_START_IDX; i<AbstractSlot.SLOT_END_IDX; i++) {
            let id: number = this.GetSlotByIndex(i).id();
            if(id === 0) { continue; }
            if(this.Data.IsTrueScale(id)) {
                hasScale = true;
                break;
            }
        }
        return hasScale;
    }

    protected _compute_hasTrueScale = (): boolean => {
        return this._compute_hasTrueScaleScoper();
    }

    public _compute_shieldStatMultiplierScoper(): number {
        let idx: number = this.Character().ActiveWeaponIdx();
        if(idx === -1) {
            return 1; // No weapon defined / no active weapon. Full stats.
        } else {
            let activeWeaponId: number = this.Character().Weapons()[idx].id();
            if(activeWeaponId === 0) {
                return 1; // Active weapon is none. Full stats.
            }
            if(this.Data.WeaponTypeMap[activeWeaponId] === "sword") {
                return 1; // Sword. Full stats.
            }
            if(this.Data.WeaponTypeMap[activeWeaponId] === "dualblades"
                    || this.Data.WeaponTypeMap[activeWeaponId] === "fists") {
                return this.HasTrueScale() ? 0.5 : 0;
            }
            return 0.5; // All other cases, half stats.
        }
    }

    protected _compute_shieldStatMultiplier = (): number => {
        return this._compute_shieldStatMultiplierScoper();
    }

    protected _compute_shield_number_helper(fieldName: StatVectorKey, defaultValue: number, isPercent: boolean=false) {
        const self = this;
        return function() {
            return self.ShieldStatMultiplier() * self._compute_number_helper_scoper(fieldName, defaultValue)();
        }
    }

    protected override _compute_stat_ATK = this._compute_shield_number_helper(StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_shield_number_helper(StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_shield_number_helper(StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_shield_number_helper(StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_shield_number_helper(StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_shield_number_helper(StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_shield_number_helper(StatVector.KEY_stat_VIT, 0);

}
export = RF5Shield;
