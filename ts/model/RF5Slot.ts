import ko = require('knockout');
import _ = require('lodash');
import IRF5Slot = require('./IRF5Slot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Item = require('./IRF5Item');
// VM
import VMRF5Slot = require('../vm/VMRF5Slot');
// Data
import Data = require('./Data');
import RF5AbstractSlot = require('./RF5AbstractSlot');

// This is the class responsible for most of the bindings, so
// try to make the bindings as efficient as possible.
class RF5Slot extends RF5AbstractSlot implements IRF5Slot {
    
    readonly Item: ko.Observable<IRF5Item>;
    readonly Index: number; // Note: This isn't an observable.

    readonly LevelOverride: ko.Observable<number>;

    // For overrides
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;    
    // For weapons
    readonly Element: ko.PureComputed<ElementType>;
    readonly HasEffect: ko.PureComputed<boolean>;

    // For multiplier computation
    readonly IsUnderObjectX: ko.Computed<boolean>; // ko.Pure can't be called recursively.
    readonly IsEffective2FoldSteel: ko.PureComputed<boolean>;
    readonly IsEffective10FoldSteel: ko.PureComputed<boolean>;

    readonly HasPrecedingOverrider: ko.PureComputed<boolean>;
    readonly IsOverriding: ko.PureComputed<boolean>;
    readonly IsBeingOverridden: ko.PureComputed<boolean>;

    readonly LightOreCount: ko.PureComputed<number>;
    readonly IsApplyingStats: ko.PureComputed<boolean>;

    readonly ObjectXMultiplier: ko.PureComputed<number>;
    readonly IsApplyingStatsMultiplier: ko.PureComputed<number>;
    readonly DiminishingMultiplier: ko.PureComputed<number>;

    readonly Multiplier: ko.PureComputed<number>;

    readonly ViewModel: VMRF5Slot;

    constructor(item: IRF5Item, index: number, item_id: number, useEquipmentStats: boolean=false) {
        
        super(item_id, useEquipmentStats);
        var self = this;

        this.LevelOverride = ko.observable(10); // Set default to 10 for convenience;

        this.level    = ko.pureComputed(self._compute_level);
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
        this.stat_chargespeed = ko.pureComputed(self._compute_stat_chargespeed);
        this.stat_attacklength = ko.pureComputed(self._compute_stat_attacklength);
        this.FinalizeVectorOverride();

        this.Item = ko.observable(item);
        this.Index = index;

        // Toggle between base item table or normal item upgrade table
        this.UseEquipmentStats = ko.pureComputed(function() {
            return self.IsOverriding();
        });
        this.EquipmentType = ko.pureComputed(function() {
            return Data.EquipmentTypeMap[self.id()];
        });
        this.WeaponType = ko.pureComputed(function() {
            return Data.WeaponTypeMap[self.id()];
        });

        this.Element = ko.pureComputed(function() {
            return ("NONE" as ElementType);
        });
        this.HasEffect = ko.pureComputed(function() {
            return Data.HasEffect(self.id());
        });

        this.IsUnderObjectX = ko.computed(self._compute_isUnderObjectX);
        this.IsEffective2FoldSteel = ko.pureComputed(self._compute_isEffective2FoldSteel);
        this.IsEffective10FoldSteel = ko.pureComputed(self._compute_isEffective10FoldSteel);

        this.HasPrecedingOverrider = ko.computed(self._compute_hasPrecedingOverrider);
        this.IsOverriding = ko.pureComputed(self._compute_isOverriding);
        this.IsBeingOverridden = ko.pureComputed(self._compute_isBeingOverridden);

        this.LightOreCount = ko.pureComputed(self._compute_LightOreCount);

        this.IsApplyingStats = ko.pureComputed(self._compute_isApplyingStats);

        this.ObjectXMultiplier = ko.pureComputed(self._compute_objectXMultiplier);
        this.IsApplyingStatsMultiplier = ko.pureComputed(self._compute_isApplyingStatsMultiplier);
        this.DiminishingMultiplier = ko.pureComputed(self._compute_diminishingMultiplier);

        this.Multiplier = ko.pureComputed(self._compute_multiplier);

        this.ViewModel = new VMRF5Slot(this);

    }

    // Has no index guard so check beforehand.
    public Predecessor = (): IRF5Slot => {
        return this.Item().GetSlotByIndex(this.Index-1);
    }
    public ChangeIdScoper = (id: number): void => {
        this.id(id);
    }
    public ChangeId(id: number): void {
        return this.ChangeIdScoper(id);
    }


    protected _compute_isUnderObjectX = (): boolean => { // Chained
        // ObjectX doesn't work in recipe slots.
        if (this.Index < RF5Slot.ARRANGE_START_IDX) { return false; }
        return (this.Predecessor().IsUnderObjectX() != Data.IsObjectX(this.id()));
    }

    protected _compute_isEffective2FoldSteel = (): boolean => {
        if (! Data.Is2foldSteel(this.id()) // Not fold steel
            || this.Index < RF5Slot.UPGRADE_START_IDX) { // Not upgrade slot
            return false;
        }
        for(var i=RF5Slot.UPGRADE_START_IDX; i<this.Index; i++) { // Check if first instance.
            let itemId = this.Item().GetSlotByIndex(i).id();
            if (Data.Is2foldSteel(itemId)) { return false; }
        }
        return true;
    }

    protected _compute_isEffective10FoldSteel = (): boolean => {
        if (! Data.Is10foldSteel(this.id()) // Not fold steel
            || this.Index < RF5Slot.UPGRADE_START_IDX) { // Not upgrade slot
            return false;
        }
        for(var i=RF5Slot.UPGRADE_START_IDX; i<this.Index; i++) { // Check if first instance.
            let itemId = this.Item().GetSlotByIndex(i).id();
            if (Data.Is10foldSteel(itemId)) { return false; }
        }
        return true;
    }

    protected _compute_hasPrecedingOverrider = (): boolean => {
        if(this.Index === 0) { return false; } // Terminating condition.
        if(this.Index >= RF5AbstractSlot.ARRANGE_START_IDX) { return false; }
        let predecessor = this.Predecessor();
        // Order of evaluation of the OR is important.
        return predecessor.HasPrecedingOverrider() || predecessor.IsOverriding();
    };
    
    protected _compute_isOverriding = (): boolean => {
        // We could make this faster by incorporating recipe info,
        // or chaining override or light ore status, but this is simple and it's good enough.

        if (this.id() === 0                             // Can't override with nothing.
            || this.Item().GetSlotByIndex(0).id() === 0 // Can't override nothing.
            || this.Index >= RF5Slot.ARRANGE_START_IDX  // Overriding only works from recipe slots.
            || ! Data.IsEquipment(this.id())            // Must be equipment to override.
            || this.Index === 0) {                      // Terminating condition.
            return false;
        }
        // Check if something else is already overriding.
       if(this.HasPrecedingOverrider()) { return false; }

        // Now do the real work.
        let baseItem: IRF5Slot = this.Item().GetSlotByIndex(0);
        if (! Data.IsWeapon(this.id())) { // Case: this is a non-weapon. We've already ruled out zero.
            // No light-ore interaction. Sufficient to check if equipment type equals base item's.
            return (baseItem.EquipmentType() === this.EquipmentType());
        } else {
            // Case: this is a weapon. If base item is the same kind of weapon, override.
            if (baseItem.WeaponType() === this.WeaponType()
                && this.WeaponType() !== undefined) { // Safety guard. Shouldn't trigger if mappings are correct.
                return true;
            } else {
                // Case: Light ore
                let hasLightOre: boolean = (this.LightOreCount() > 0);

                if (hasLightOre && Data.IsWeapon(baseItem.id())) {
                    // Make sure base item is actually a weapon.
                    return true;
                } // Otherwise return false
            }
        }
        return false;
    }

    protected _compute_isBeingOverridden = (): boolean => {
        if(this.Index !== 0) { return false; }
        for(var i=1; i<RF5Slot.ARRANGE_START_IDX; i++) {
            if (this.Item().GetSlotByIndex(i).IsOverriding()) {
                return true;
            }
        }
        return false;
    }

    protected _compute_LightOreCount = (): number => {
        if(this.Index === 0 || this.Index >= RF5Slot.ARRANGE_START_IDX) { // Light ore only works in recipe slots.
            return 0;
        } else if(this.Index > 1) {
            return this.Item().GetSlotByIndex(1).LightOreCount();
        } else {
            // Light ore usage is in ANY recipe slot, so we need to check all slots,
            // even if we're not counting. We're not saving any computation here.
            let count = 0;
            for(var i=1; i<RF5Slot.ARRANGE_START_IDX; i++) {
                if (Data.IsLightOre(this.Item().GetSlotByIndex(i).id())) {
                    count += 1;
                }
            }
            return count;
        }
    }

    protected _compute_isApplyingStats = (): boolean => {
        if(this.IsBeingOverridden()) {
            return false;
        } else if(this.Index > 0) { // Following rule doesn't apply to base item
            if(this.Index < RF5Slot.ARRANGE_START_IDX && !this.IsOverriding()) { // Only base item / overrider give stats in recipe slots
                return false;
            }
        }
        return true;
    }


    protected _compute_objectXMultiplier = (): number => {
        return (this.IsUnderObjectX()) ? -1 : 1;
    }

    protected _compute_isApplyingStatsMultiplier = (): number => {
        return (this.IsApplyingStats()) ? 1 : 0;
    }

    protected _compute_diminishingMultiplier = (): number => {
        // Arrange slots not subject to diminishing returns.
        // Recipe slots don't apply item stats but that's not the reponsibility of this function.
        if(this.Index < RF5Slot.UPGRADE_START_IDX) {
            return 1;
        } else if (this.id() === 0 || Data.IsEquipment(this.id())) {
            return 1; // Equipment or empty have stats of zero when not overriding so use that to short-circuit.
        } else {
            // Case: material
            let numRepeats = 0;
            for(var i=RF5Slot.UPGRADE_START_IDX; i<this.Index; i++) { // 1/2*O(n^2) n_max=9
                if(this.Item().GetSlotByIndex(i).id() === this.id()) {
                    numRepeats++;
                }
            }
            return 1.0 / Math.pow(2, numRepeats);
        }
    }

    protected _compute_multiplier = (): number => {
        // These cases don't care about about ObjectX NOR diminishing returns.
        if (this.IsEffective2FoldSteel()) {
            return 2;
        } else if (this.IsEffective10FoldSteel()) {
            return 8;
        } else if (this.IsBeingOverridden()) {
            return 0;
        } else {
            return this.ObjectXMultiplier() * this.IsApplyingStatsMultiplier() * this.DiminishingMultiplier();
        }
    }



    // When overriding, the context is the base item.
    // When is effective fold steel, the context is the predecessor item, but
    //   image, name, level, rarity remain as fold steel.
    // Otherwise use the normal item context.
    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number, isPercent: boolean=false) => {
        var self = this;
        return function(): number {
            let val: number = defaultValue;
            let ctx: any;
            if(self.IsEffective2FoldSteel() || self.IsEffective10FoldSteel()) {
                ctx = self.Predecessor().Context();
            } else {
                ctx = self.Context();
            }
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            if (isPercent) { val *= 100; }
            return self.Multiplier() * val;
        };
    }

    protected override _compute_level = (): number => {
        return this.LevelOverride();
    }

    protected override _compute_stat_ATK = this._compute_number_helper(RF5StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_number_helper(RF5StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_number_helper(RF5StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_number_helper(RF5StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_number_helper(RF5StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_number_helper(RF5StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_number_helper(RF5StatVector.KEY_stat_VIT, 0);
    protected override _compute_stat_atk_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_CRT, 0, true);
    protected override _compute_stat_atk_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_atk_KNO, 0, true);
    protected override _compute_stat_atk_STN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_STN, 0, true);
    protected override _compute_stat_atk_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DIZ, 0, true);
    protected override _compute_stat_atk_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PSN, 0, true);
    protected override _compute_stat_atk_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SEA, 0, true);
    protected override _compute_stat_atk_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PAR, 0, true);
    protected override _compute_stat_atk_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SLP, 0, true);
    protected override _compute_stat_atk_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FTG, 0, true);
    protected override _compute_stat_atk_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SCK, 0, true);
    protected override _compute_stat_atk_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FNT, 0, true);
    protected override _compute_stat_atk_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DRN, 0, true);
    protected override _compute_def_ele_FIRE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_FIRE, 0, true);
    protected override _compute_def_ele_WATER = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WATER, 0, true);
    protected override _compute_def_ele_EARTH = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_EARTH, 0, true);
    protected override _compute_def_ele_WIND = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WIND, 0, true);
    protected override _compute_def_ele_LIGHT = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LIGHT, 0, true);
    protected override _compute_def_ele_DARK = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_DARK, 0, true);
    protected override _compute_def_ele_LOVE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LOVE, 0, true);
    protected override _compute_def_ele_VOID = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_VOID, 0, true);
    protected override _compute_def_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_def_CRT, 0, true);
    protected override _compute_def_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_def_KNO, 0, true);
    protected override _compute_def_STN = this._compute_number_helper(RF5StatVector.KEY_stat_def_STN, 0, true);
    protected override _compute_def_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_def_DIZ, 0, true);
    protected override _compute_def_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_def_PSN, 0, true);
    protected override _compute_def_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_def_SEA, 0, true);
    protected override _compute_def_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_def_PAR, 0, true);
    protected override _compute_def_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_def_SLP, 0, true);
    protected override _compute_def_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_def_FTG, 0, true);
    protected override _compute_def_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_def_SCK, 0, true);
    protected override _compute_def_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_def_FNT, 0, true);
    protected override _compute_def_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_def_DRN, 0, true);
    protected override _compute_stat_chargespeed = this._compute_number_helper(RF5StatVector.KEY_stat_chargespeed, 0);
    protected override _compute_stat_attacklength = this._compute_number_helper(RF5StatVector.KEY_stat_attacklength, 0);

}
export = RF5Slot;
