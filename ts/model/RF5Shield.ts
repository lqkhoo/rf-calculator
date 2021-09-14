import ko = require('knockout');
import IRF5StatVector = require('./IRF5StatVector');
// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5StatVector = require('./RF5StatVector');
import Data = require('./Data');
import RF5AbstractSlot = require('./RF5AbstractSlot');
    
class RF5Shield extends RF5Item {

    readonly HasTrueScale: ko.PureComputed<boolean>;
    readonly ShieldStatMultiplier: ko.PureComputed<number>;

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID) {
        super(character, "shield", item_id);
        var self = this;

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK);
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF);
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT);
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF);
        this.stat_STR = ko.pureComputed(self._compute_stat_STR);
        this.stat_INT = ko.pureComputed(self._compute_stat_INT);
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT);
        this.FinalizeVectorOverride();

        this.HasTrueScale = ko.pureComputed(function() {
            let hasScale: boolean = false;
            for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
                let id: number = self.GetSlotByIndex(i).id();
                if(id === 0) { continue; }
                if(Data.IsTrueScale(id)) {
                    hasScale = true;
                    break;
                }
            }
            return hasScale;
        });

        this.ShieldStatMultiplier = ko.pureComputed(function() {
            let idx: number = self.Character().ActiveWeaponIdx();
            if(idx === -1) {
                return 1; // No weapon defined / no active weapon. Full stats.
            } else {
                let activeWeaponId: number = self.Character().Weapons()[idx].id();
                if(activeWeaponId === 0) {
                    return 1; // Active weapon is none. Full stats.
                }
                if(Data.WeaponTypeMap[activeWeaponId] === "sword") {
                    return 1; // Sword. Full stats.
                }
                if(Data.WeaponTypeMap[activeWeaponId] === "dualblades"
                        || Data.WeaponTypeMap[activeWeaponId] === "fists") {
                    return self.HasTrueScale() ? 0.5 : 0;
                }
                return 0.5; // All other cases, half stats.
            }
        });
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number, _isPercent: boolean=false) => {
        var self = this;
        return function(): number {

            let val: number = defaultValue;
            let slot: IRF5StatVector;
            let accumulate = function(_slot: IRF5StatVector) {
                slot = _slot;
                val += (slot.id() === 0) ? 0 : (slot.GetStatByName(fieldName) as number);
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
            accumulate(self.LevelBonus());
            accumulate(self.RarityBonus());
            return self.ShieldStatMultiplier() * val;
        };
    }

    protected override _compute_stat_ATK = this._compute_number_helper(RF5StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_number_helper(RF5StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_number_helper(RF5StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_number_helper(RF5StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_number_helper(RF5StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_number_helper(RF5StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_number_helper(RF5StatVector.KEY_stat_VIT, 0);

}
export = RF5Shield;
