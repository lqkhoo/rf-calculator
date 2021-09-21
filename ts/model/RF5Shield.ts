import ko = require('knockout');
import IStatVector = require('./IStatVector');
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

    readonly HasTrueScale: ko.PureComputed<boolean>;
    readonly ShieldStatMultiplier: ko.PureComputed<number>;

    constructor(character: ICharacter,
                item_id: number=RF5Item.DEFAULT_ITEM_ID,
                deserializedObject: any=undefined) {

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

        this.HasTrueScale = ko.pureComputed(function() {
            let hasScale: boolean = false;
            for(let i=AbstractSlot.ARRANGE_START_IDX; i<AbstractSlot.SLOT_END_IDX; i++) {
                let id: number = self.GetSlotByIndex(i).id();
                if(id === 0) { continue; }
                if(self.Data.IsTrueScale(id)) {
                    hasScale = true;
                    break;
                }
            }
            return hasScale;
        }).extend({ deferred: true });

        this.ShieldStatMultiplier = ko.pureComputed(function() {
            let idx: number = self.Character().ActiveWeaponIdx();
            if(idx === -1) {
                return 1; // No weapon defined / no active weapon. Full stats.
            } else {
                let activeWeaponId: number = self.Character().Weapons()[idx].id();
                if(activeWeaponId === 0) {
                    return 1; // Active weapon is none. Full stats.
                }
                if(self.Data.WeaponTypeMap[activeWeaponId] === "sword") {
                    return 1; // Sword. Full stats.
                }
                if(self.Data.WeaponTypeMap[activeWeaponId] === "dualblades"
                        || self.Data.WeaponTypeMap[activeWeaponId] === "fists") {
                    return self.HasTrueScale() ? 0.5 : 0;
                }
                return 0.5; // All other cases, half stats.
            }
        }).extend({ deferred: true });
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number, _isPercent: boolean=false) => {
        const self = this;
        return function(): number {

            let val: number = defaultValue;
            let slot: IStatVector;
            function accumulate(_slot: IStatVector, skipIdZero: boolean=true) {
                slot = _slot;
                if(skipIdZero) {
                    val += (slot.id() === 0) ? 0 : (slot.GetStatByName(fieldName) as number);
                } else {
                    val += (slot.GetStatByName(fieldName) as number);
                }
            };

            accumulate(self.BaseItem());
            for(let i=0; i<RF5Item.NSLOTS_RECIPE; i++) {
                accumulate(self.RecipeSlots()[i]);
            }
            for(let i=0; i<RF5Item.NSLOTS_ARRANGE; i++) {
                accumulate(self.ArrangeSlots()[i]);
            }
            for(let i=0; i<RF5Item.NSLOTS_UPGRADE; i++) {
                accumulate(self.UpgradeSlots()[i]);
            }
            accumulate(self.LevelBonus(), false);
            accumulate(self.RarityBonus(), false);
            return self.ShieldStatMultiplier() * val;
        };
    }

    protected override _compute_stat_ATK = this._compute_number_helper(StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_number_helper(StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_number_helper(StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_number_helper(StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_number_helper(StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_number_helper(StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_number_helper(StatVector.KEY_stat_VIT, 0);

}
export = RF5Shield;
