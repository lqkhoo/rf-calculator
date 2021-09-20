import ko = require('knockout');
import _ = require('lodash');
import ISlot = require('./ISlot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IItem = require('./IItem');
// VM
import VMRF5Slot = require('../vm/VMRF5Slot');
// Data
import RF5AbstractSlot = require('./RF5AbstractSlot');

// This is the class responsible for most of the bindings, so
// try to make the bindings as efficient as possible.
class RF5Slot extends RF5AbstractSlot implements ISlot {
    
    readonly Item: ko.Observable<IItem>;
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

    IsRestricted: ko.PureComputed<boolean>; // Recipe override
    IsLocked: ko.PureComputed<boolean>      // Recipe override
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

    constructor(item: IItem,
                index: number,
                item_id: number,
                level: number=RF5Slot.DEFAULT_LEVEL,
                useEquipmentStats: boolean=false) {
                    
        super(item.Data, item_id, useEquipmentStats);
        const self = this;

        this.LevelOverride = ko.observable(level).extend({ deferred: true }); // Set default to 10 for convenience;

        this.level    = ko.pureComputed(self._compute_level).extend({ deferred: true });
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

        this.Item = ko.observable(item).extend({ deferred: true });
        this.Index = index;

        // Toggle between base item table or normal item upgrade table
        this.UseEquipmentStats = ko.pureComputed(function() {
            return self.IsOverriding();
        }).extend({ deferred: true });

        this.EquipmentType = ko.pureComputed(function() {
            return self.Data.EquipmentTypeMap[self.id()];
        }).extend({ deferred: true });

        this.WeaponType = ko.pureComputed(function() {
            return self.Data.WeaponTypeMap[self.id()];
        }).extend({ deferred: true });

        this.Element = ko.pureComputed(function() {
            return ("NONE" as ElementType);
        }).extend({ deferred: true });

        this.HasEffect = ko.pureComputed(function() {
            return self.Data.HasEffect(self.id());
        }).extend({ deferred: true });

        this.IsUnderObjectX         = ko.computed(self._compute_isUnderObjectX).extend({ deferred: true });
        this.IsEffective2FoldSteel  = ko.pureComputed(self._compute_isEffective2FoldSteel).extend({ deferred: true });
        this.IsEffective10FoldSteel = ko.pureComputed(self._compute_isEffective10FoldSteel).extend({ deferred: true });

        this.IsRestricted   = ko.pureComputed(function() { return false; }).extend({ deferred: true });
        this.IsLocked       = ko.pureComputed(function() { return false; }).extend({ deferred: true });

        this.HasPrecedingOverrider  = ko.computed(self._compute_hasPrecedingOverrider).extend({ deferred: true });
        this.IsOverriding           = ko.pureComputed(self._compute_isOverriding).extend({ deferred: true });
        this.IsBeingOverridden      = ko.pureComputed(self._compute_isBeingOverridden).extend({ deferred: true });

        this.LightOreCount          = ko.pureComputed(self._compute_LightOreCount).extend({ deferred: true });
        this.IsApplyingStats        = ko.pureComputed(self._compute_isApplyingStats).extend({ deferred: true });

        this.ObjectXMultiplier          = ko.pureComputed(self._compute_objectXMultiplier).extend({ deferred: true });
        this.IsApplyingStatsMultiplier  = ko.pureComputed(self._compute_isApplyingStatsMultiplier).extend({ deferred: true });
        this.DiminishingMultiplier      = ko.pureComputed(self._compute_diminishingMultiplier).extend({ deferred: true });

        this.Multiplier = ko.pureComputed(self._compute_multiplier).extend({ deferred: true });

        this.ViewModel = new VMRF5Slot(this);

    }

    // Has no index guard so check beforehand.
    public Predecessor = (): ISlot => {
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
        return (this.Predecessor().IsUnderObjectX() != this.Data.IsObjectX(this.id()));
    }

    protected _compute_isEffective2FoldSteel = (): boolean => {
        if (! this.Data.Is2foldSteel(this.id()) // Not fold steel
            || this.Index < RF5Slot.UPGRADE_START_IDX) { // Not upgrade slot
            return false;
        }
        for(var i=RF5Slot.UPGRADE_START_IDX; i<this.Index; i++) { // Check if first instance.
            let itemId = this.Item().GetSlotByIndex(i).id();
            if (this.Data.Is2foldSteel(itemId)) { return false; }
        }
        return true;
    }

    protected _compute_isEffective10FoldSteel = (): boolean => {
        if (! this.Data.Is10foldSteel(this.id()) // Not fold steel
            || this.Index < RF5Slot.UPGRADE_START_IDX) { // Not upgrade slot
            return false;
        }
        for(var i=RF5Slot.UPGRADE_START_IDX; i<this.Index; i++) { // Check if first instance.
            let itemId = this.Item().GetSlotByIndex(i).id();
            if (this.Data.Is10foldSteel(itemId)) { return false; }
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
            || ! this.Data.IsEquipment(this.id())            // Must be equipment to override.
            || this.IsLocked()                          // Recipe items cannot override e.g. Platinum Shield in Platinum Shield+ recipe.
            || this.Item().EquipmentType === "boots"    // No stat override mechanics in boots / accessory
            || this.Item().EquipmentType === "accessory"
            || this.Index === 0) {                      // Terminating condition.
            return false;
        }
        // Check if something else is already overriding.
       if(this.HasPrecedingOverrider()) { return false; }

        // Now do the real work.
        let baseItem: ISlot = this.Item().GetSlotByIndex(0);
        if (! this.Data.IsWeapon(this.id())) { // Case: this is a non-weapon. We've already ruled out zero.
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

                if (hasLightOre && this.Data.IsWeapon(baseItem.id())) {
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
            // Light ore usage is in ANY recipe slot, so we need to check all slots.
            let count = 0;
            for(var i=1; i<RF5Slot.ARRANGE_START_IDX; i++) {
                if (this.Data.IsLightOre(this.Item().GetSlotByIndex(i).id())) {
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
        } else if (this.id() === 0 || this.Data.IsEquipment(this.id())) {
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

        const self = this;
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
    // Chargespeed not affected by multiplier nor predecessor context.
    protected override _compute_stat_chargespeed = ():number => {
        let val: number = 0;
        let ctx: any = this.Context();
        if (ctx[RF5StatVector.KEY_stat_chargespeed] !== undefined) {
            val = ctx[RF5StatVector.KEY_stat_chargespeed];
        }
        return val;
    }
    // protected override _compute_stat_chargespeed = this._compute_number_helper(RF5StatVector.KEY_stat_chargespeed, 0);
    protected override _compute_stat_attacklength = this._compute_number_helper(RF5StatVector.KEY_stat_attacklength, 0);

}
export = RF5Slot;
