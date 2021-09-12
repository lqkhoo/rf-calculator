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
import RF5Item = require('./RF5Item');

// This is the class responsible for most of the bindings, so
// try to make the bindings as efficient as possible.
class RF5Slot extends RF5StatVector implements IRF5Slot {
    
    static readonly DEFAULT_ITEM_ID: number = 0;
    static readonly ARRANGE_START_IDX: number = 7;
    static readonly UPGRADE_START_IDX: number = 10;

    readonly Item: ko.Observable<IRF5Item>;
    readonly Index: number; // Note: This isn't an observable.
    override readonly UseEquipmentStats: ko.PureComputed<boolean>;

    // For overrides
    readonly EquipmentType: ko.PureComputed<EquipmentType|undefined>;
    readonly WeaponType: ko.PureComputed<WeaponType|undefined>;

    readonly IsUnderObjectX: ko.Computed<boolean>; // pure can't be called recursively.
    readonly IsEffective2FoldSteel: ko.PureComputed<boolean>;
    readonly IsEffective10FoldSteel: ko.PureComputed<boolean>;
    readonly IsOverriding: ko.PureComputed<boolean>;
    readonly IsBeingOverridden: ko.PureComputed<boolean>;
    readonly DiminishingMultiplier: ko.PureComputed<number>;

    readonly Multiplier: ko.PureComputed<number>;
    readonly ViewModel: VMRF5Slot;

    override readonly name_en:           ko.PureComputed<string>;
    override readonly name_jp:           ko.PureComputed<string>;
    override readonly image_uri:         ko.PureComputed<string>;
    override readonly level:             ko.PureComputed<number>;
    override readonly rarity:            ko.PureComputed<number>;
    override readonly stat_ATK:          ko.PureComputed<number>;
    override readonly stat_DEF:          ko.PureComputed<number>;
    override readonly stat_MAT:          ko.PureComputed<number>;
    override readonly stat_MDF:          ko.PureComputed<number>;
    override readonly stat_STR:          ko.PureComputed<number>;
    override readonly stat_INT:          ko.PureComputed<number>;
    override readonly stat_VIT:          ko.PureComputed<number>;
    override readonly stat_atk_CRT:      ko.PureComputed<number>;
    override readonly stat_atk_KNO:      ko.PureComputed<number>;
    override readonly stat_atk_KNOTM:    ko.PureComputed<number>;
    override readonly stat_atk_STN:      ko.PureComputed<number>;
    override readonly stat_atk_PSN:      ko.PureComputed<number>;
    override readonly stat_atk_SEA:      ko.PureComputed<number>;
    override readonly stat_atk_PAR:      ko.PureComputed<number>;
    override readonly stat_atk_SLP:      ko.PureComputed<number>;
    override readonly stat_atk_FTG:      ko.PureComputed<number>;
    override readonly stat_atk_SCK:      ko.PureComputed<number>;
    override readonly stat_atk_FNT:      ko.PureComputed<number>;
    override readonly stat_atk_DRN:      ko.PureComputed<number>;
    override readonly stat_def_ele_FIRE: ko.PureComputed<number>;
    override readonly stat_def_ele_WATER: ko.PureComputed<number>;
    override readonly stat_def_ele_EARTH: ko.PureComputed<number>;
    override readonly stat_def_ele_WIND:  ko.PureComputed<number>;
    override readonly stat_def_ele_LIGHT: ko.PureComputed<number>;
    override readonly stat_def_ele_DARK:  ko.PureComputed<number>;
    override readonly stat_def_ele_LOVE:  ko.PureComputed<number>;
    override readonly stat_def_ele_VOID:  ko.PureComputed<number>;
    override readonly stat_def_CRT:      ko.PureComputed<number>;
    override readonly stat_def_KNO:      ko.PureComputed<number>;
    override readonly stat_def_KNOTM:    ko.PureComputed<number>;
    override readonly stat_def_STN:      ko.PureComputed<number>;
    override readonly stat_def_PSN:      ko.PureComputed<number>;
    override readonly stat_def_SEA:      ko.PureComputed<number>;
    override readonly stat_def_PAR:      ko.PureComputed<number>;
    override readonly stat_def_SLP:      ko.PureComputed<number>;
    override readonly stat_def_FTG:      ko.PureComputed<number>;
    override readonly stat_def_SCK:      ko.PureComputed<number>;
    override readonly stat_def_FNT:      ko.PureComputed<number>;
    override readonly stat_def_DRN:      ko.PureComputed<number>;
    override readonly stat_chargespeed:  ko.PureComputed<number>;
    override readonly stat_attacklength: ko.PureComputed<number>;


    constructor(item: IRF5Item, index: number, item_id: number, useEquipmentStats: boolean=false) {
        super(item_id, useEquipmentStats);

        var self = this;
        this.Item = ko.observable(item);
        this.Index = index;

        this.UseEquipmentStats = ko.pureComputed(function() {
            return self.IsOverriding();
        });
        this.EquipmentType = ko.pureComputed(function() {
            return Data.EquipmentTypeMap[self.id()];
        });
        this.WeaponType = ko.pureComputed(function() {
            return Data.WeaponTypeMap[self.id()];
        });
        this.IsUnderObjectX = ko.computed(self._compute_isUnderObjectX);
        this.IsEffective2FoldSteel = ko.pureComputed(self._compute_isEffective2FoldSteel);
        this.IsEffective10FoldSteel = ko.pureComputed(self._compute_isEffective10FoldSteel);
        this.IsOverriding = ko.pureComputed(self._compute_isOverriding);
        this.IsBeingOverridden = ko.pureComputed(self._compute_isBeingOverridden);
        this.DiminishingMultiplier = ko.pureComputed(self._compute_diminishingMultiplier);

        this.Multiplier = ko.pureComputed(self._compute_multiplier);

        this.ViewModel = new VMRF5Slot(this);


        // Override numeric part of StatVector
        
        this.name_en = ko.pureComputed(self._compute_name_en);
        this.name_jp = ko.pureComputed(self._compute_name_jp);
        this.image_uri = ko.pureComputed(self._compute_image_uri);
        this.level = ko.pureComputed(self._compute_level)
        this.rarity = ko.pureComputed(self._compute_rarity);

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK);
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF);
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT);
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF);
        this.stat_STR = ko.pureComputed(self._compute_stat_STR);
        this.stat_INT = ko.pureComputed(self._compute_stat_INT);
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT);
        this.stat_atk_CRT = ko.pureComputed(self._compute_atk_CRT);
        this.stat_atk_KNO = ko.pureComputed(self._compute_atk_KNO);
        this.stat_atk_KNOTM = ko.pureComputed(self._compute_atk_KNOTM);
        this.stat_atk_STN = ko.pureComputed(self._compute_atk_STN);
        this.stat_atk_PSN = ko.pureComputed(self._compute_atk_PSN);
        this.stat_atk_SEA = ko.pureComputed(self._compute_atk_SEA);
        this.stat_atk_PAR = ko.pureComputed(self._compute_atk_PAR);
        this.stat_atk_SLP = ko.pureComputed(self._compute_atk_SLP);
        this.stat_atk_FTG = ko.pureComputed(self._compute_atk_FTG);
        this.stat_atk_SCK = ko.pureComputed(self._compute_atk_SCK);
        this.stat_atk_FNT = ko.pureComputed(self._compute_atk_FNT);
        this.stat_atk_DRN = ko.pureComputed(self._compute_atk_DRN);
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
        this.stat_def_KNOTM = ko.pureComputed(self._compute_def_KNOTM);
        this.stat_def_STN = ko.pureComputed(self._compute_def_STN);
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
    }


    /*
    protected GetObjectXMultiplier = (): number => {
        if(this.GetFoldSteelMultiplier() === 1) {
            return this.IsUnderObjectX() ? -1 : 1;
        } else { return 1; } // Fold steel overrides ObjectX;
    }
    protected GetFoldSteelMultiplier = (): number => {
        if (this.Index === 0) { return 1; }
        if (this.Predecessor().IsEffective2FoldSteel()) { return 2; }
        else if (this.Predecessor().IsEffective10FoldSteel()) { return 8; }
        else { return 1; }
    }
    */


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
        // Not sufficient to just check predecessor. So 1/2*O(n^2) where n_max=6
        for(var i=1; i<this.Index; i++) {
            if (this.Item().GetSlotByIndex(i).IsOverriding()) {
                return false;
            }
        }
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
                // Check if there is light ore before us.
                let hasLightOre: boolean = false;
                for(var i=1; i<this.Index; i++) {
                    if (Data.IsLightOre(this.Item().GetSlotByIndex(i).id())) {
                        hasLightOre = true;
                        break;
                    }
                }
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


    protected _compute_diminishingMultiplier = (): number => {
        // Arrange slots not subject to diminishing returns.
        // Recipe slots don't apply item stats but that's not the
        // reponsibility of this function.
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
        if(this.IsOverriding()) {
            return 1;
        } else if (this.IsEffective2FoldSteel()) {
            return 2;
        } else if (this.IsEffective10FoldSteel()) {
            return 8;
        } else if (this.IsBeingOverridden()) {
            return 0;
        } else {
            if(this.IsUnderObjectX()) {
                return -1 * this.DiminishingMultiplier();
            } else {
                return this.DiminishingMultiplier();
            }
        }
    }



    // When overriding, the context is the base item.
    // When is effective fold steel, the context is the predecessor item, but
    //   image, name, level, rarity remain as fold steel.
    // Otherwise use the normal item context.
    protected override _compute_number_helper = (fieldName: string, defaultValue: number) => {
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
            return self.Multiplier() * val;
        };
    }


    protected override _compute_stat_ATK = this._compute_number_helper("stat_ATK", 88);
    protected override _compute_stat_DEF = this._compute_number_helper("stat_DEF", 88);
    protected override _compute_stat_MAT = this._compute_number_helper("stat_MAT", 88);
    protected override _compute_stat_MDF = this._compute_number_helper("stat_MDF", 88);
    protected override _compute_stat_STR = this._compute_number_helper("stat_STR", 88);
    protected override _compute_stat_INT = this._compute_number_helper("stat_INT", 88);
    protected override _compute_stat_VIT = this._compute_number_helper("stat_VIT", 88);
    protected override _compute_atk_CRT = this._compute_number_helper("stat_atk_CRT", 88);
    protected override _compute_atk_KNO = this._compute_number_helper("stat_atk_KNO", 88);
    protected override _compute_atk_KNOTM = this._compute_number_helper("stat_atk_KNOTM", 88);
    protected override _compute_atk_STN = this._compute_number_helper("stat_atk_STN", 88);
    protected override _compute_atk_PSN = this._compute_number_helper("stat_atk_PSN", 88);
    protected override _compute_atk_SEA = this._compute_number_helper("stat_atk_SEA", 88);
    protected override _compute_atk_PAR = this._compute_number_helper("stat_atk_PAR", 88);
    protected override _compute_atk_SLP = this._compute_number_helper("stat_atk_SLP", 88);
    protected override _compute_atk_FTG = this._compute_number_helper("stat_atk_FTG", 88);
    protected override _compute_atk_SCK = this._compute_number_helper("stat_atk_SCK", 88);
    protected override _compute_atk_FNT = this._compute_number_helper("stat_atk_FNT", 88);
    protected override _compute_atk_DRN = this._compute_number_helper("stat_atk_DRN", 88);
    protected override _compute_def_ele_FIRE = this._compute_number_helper("def_ele_FIRE", 88);
    protected override _compute_def_ele_WATER = this._compute_number_helper("def_ele_WATER", 88);
    protected override _compute_def_ele_EARTH = this._compute_number_helper("def_ele_EARTH", 88);
    protected override _compute_def_ele_WIND = this._compute_number_helper("def_ele_WIND", 88);
    protected override _compute_def_ele_LIGHT = this._compute_number_helper("def_ele_LIGHT", 88);
    protected override _compute_def_ele_DARK = this._compute_number_helper("def_ele_DARK", 88);
    protected override _compute_def_ele_LOVE = this._compute_number_helper("def_ele_LOVE", 88);
    protected override _compute_def_ele_VOID = this._compute_number_helper("def_ele_VOID", 88);
    protected override _compute_def_CRT = this._compute_number_helper("stat_def_CRT", 88);
    protected override _compute_def_KNO = this._compute_number_helper("stat_def_KNO", 88);
    protected override _compute_def_KNOTM = this._compute_number_helper("stat_def_KNOTM", 88);
    protected override _compute_def_STN = this._compute_number_helper("stat_def_STN", 88);
    protected override _compute_def_PSN = this._compute_number_helper("stat_def_PSN", 88);
    protected override _compute_def_SEA = this._compute_number_helper("stat_def_SEA", 88);
    protected override _compute_def_PAR = this._compute_number_helper("stat_def_PAR", 88);
    protected override _compute_def_SLP = this._compute_number_helper("stat_def_SLP", 88);
    protected override _compute_def_FTG = this._compute_number_helper("stat_def_FTG", 88);
    protected override _compute_def_SCK = this._compute_number_helper("stat_def_SCK", 88);
    protected override _compute_def_FNT = this._compute_number_helper("stat_def_FNT", 88);
    protected override _compute_def_DRN = this._compute_number_helper("stat_def_DRN", 88);
    protected override _compute_stat_chargespeed = this._compute_number_helper("stat_chargespeed", 88);
    protected override _compute_stat_attacklength = this._compute_number_helper("stat_attacklength", 88);

}
export = RF5Slot;
