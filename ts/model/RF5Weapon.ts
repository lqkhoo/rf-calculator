import ko = require('knockout');
// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5Slot = require('./RF5Slot');
import Data = require('./Data');
import RF5AbstractSlot = require('./RF5AbstractSlot');
import IRF5Slot = require('./IRF5Slot');
import RF5StatVector = require('./RF5StatVector');
    
class RF5Weapon extends RF5Item {

    readonly HasRareCan: ko.PureComputed<boolean>;
    readonly HasScrapMetalPlus: ko.PureComputed<boolean>;
    readonly HasShadeStone: ko.PureComputed<boolean>;
    readonly Element: ko.PureComputed<ElementType>;

    readonly MagicIdCharge1: ko.PureComputed<number>;
    readonly MagicIdCharge2: ko.PureComputed<number>;
    readonly MagicIdCharge3: ko.PureComputed<number>;

    readonly MagicIdCharge1Name: ko.PureComputed<string>;
    readonly MagicIdCharge2Name: ko.PureComputed<string>;
    readonly MagicIdCharge3Name: ko.PureComputed<string>;

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID) {
        super(character, "weapon", item_id);
        var self = this;

        this.stat_chargespeed = ko.pureComputed(self._compute_stat_chargespeed);
        this.stat_attacklength = ko.pureComputed(self._compute_stat_attacklength);
        this.FinalizeVectorOverride();

        this.HasRareCan = ko.pureComputed(self._compute_hasRareCan);
        this.HasScrapMetalPlus = ko.pureComputed(self._compute_hasScrapMetalPlus);
        this.HasShadeStone = ko.pureComputed(self._compute_hasShadeStone);

        this.Element = ko.pureComputed(self._compute_element);

        this.MagicIdCharge1 = ko.pureComputed(self._compute_magicIdCharge1);
        this.MagicIdCharge2 = ko.pureComputed(self._compute_magicIdCharge2);
        this.MagicIdCharge3 = ko.pureComputed(self._compute_magicIdCharge3);

        this.MagicIdCharge1Name = ko.pureComputed(self._compute_magicCharge1Name);
        this.MagicIdCharge2Name = ko.pureComputed(self._compute_magicCharge2Name);
        this.MagicIdCharge3Name = ko.pureComputed(self._compute_magicCharge3Name);

    }

    protected _compute_hasRareCan = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5Slot.ARRANGE_START_IDX; i<RF5Slot.SLOT_END_IDX; i++) {
                if(Data.IsRareCan(this.GetSlotByIndex(i).id())) { return true; }
            }
        }
        return false;
    }

    protected _compute_hasScrapMetalPlus = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5Slot.ARRANGE_START_IDX; i<RF5Slot.SLOT_END_IDX; i++) {
                if(Data.IsScrapMetalPlus(this.GetSlotByIndex(i).id())) { return true; }
            }
        }
        return false;
    }

    protected _compute_hasShadeStone = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5Slot.ARRANGE_START_IDX; i<RF5Slot.SLOT_END_IDX; i++) {
                if(Data.IsShadeStone(this.GetSlotByIndex(i).id())) { return true; }
            }
        }
        return false;
    }

    protected _crossElement = (originalElement: ElementType, newElement: ElementType): ElementType => {
        // Elemental crystals directly overwrite if elements are different.
        // Big crystal makes element disappear.
        // May be different from RF4. IIRC in RF4, different element makes it become none first before overwriting.
        if(originalElement === "FIREWATER") {
            if(newElement === "FIRE") { return "FIRE"; }
            if(newElement === "WATER") { return "WATER"; }
            else { return newElement; }
        }
        if(originalElement === "EARTHWIND") {
            if(newElement === "EARTH") { return "EARTH"; }
            if(newElement === "WIND") { return "WIND"; }
            else { return newElement; }
        }
        return newElement;
    }

    protected _compute_element = (): ElementType => {
        let ele: ElementType = "NONE";
        let ctx: any;

        let id: number = 0;
        // First identify the right context. Is there override?
        if(! this.BaseItem().IsBeingOverridden()) {
            id = this.BaseItem().id();
        } else { // Find overriding item;
            for(let i=1; i<RF5AbstractSlot.ARRANGE_START_IDX; i++) {
                let slot: IRF5Slot = this.GetSlotByIndex(i);
                if(slot.IsOverriding()) {
                    id = slot.id();
                    break;
                }
            }
        }
        // Now get the element from the context
        ctx = (Data.Items as any)[id];
        if(ctx.element !== undefined) { // Shouldn't be undefined if Data is consistent.
            ele = ctx.element;
        }
        // Now start crossing elements with crystals.
        // Crystals influence elements from both arrange and upgrade slots.
        for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
            let slot: IRF5Slot = this.GetSlotByIndex(i);
            if(! Data.IsEleCrystal(slot.id())) {
                continue;
            }
            ele = this._crossElement(ele, ((Data.Items as any)[slot.id()].element as ElementType));
        }
        return ele;
    };


    protected override _compute_stat_chargespeed = (): number => {
        // Final chargespeed is the chargespeed given by the last ingredient with nonzero chargespeed.
        if(this.BaseItem().id() === 0) {
            return 0;
        }
        let chargeSpeed: number = this.BaseItem().stat_chargespeed();
        for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
            let slotChargeSpeed: number = this.GetSlotByIndex(i).stat_chargespeed();
            if(slotChargeSpeed !== 0) {
                chargeSpeed = slotChargeSpeed;
            }
        }
        return chargeSpeed;
    }

    protected override _compute_stat_attacklength = this._compute_number_helper(RF5StatVector.KEY_stat_attacklength, 0);


    protected _compute_magicCharge_helper = (idx: number) => {
        var self = this;
        // There are no available mappings for certain staves to their original spells, e.g.
        // the imo/turnip/meteor staff vs the original charged magics so let's just
        // glom all of those into "original magic" and work from there.
        return function() {
            let magicId: number = 0;
            if(! Data.IsStaff(self.id())) {
                return 0;
            } else {
                magicId = self.id() // Fake original magic ids with item id because we don't have the data.
            }

            for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
                let slotMagicId: number;
                let slotItemId: number;
                slotItemId = self.GetSlotByIndex(i).id();
                slotMagicId = (Data.Items as any)[slotItemId]["magic_charge"+idx.toString()]
                if (slotMagicId === 0) { continue; }
                else { magicId = slotMagicId; }
            }

            return magicId;
        };
    }


    protected _compute_magicIdCharge1 = this._compute_magicCharge_helper(1);
    protected _compute_magicIdCharge2 = this._compute_magicCharge_helper(2);
    protected _compute_magicIdCharge3 = this._compute_magicCharge_helper(3);
    
    protected _compute_magicCharge1Name = (): string => {
        let magicId: number = this.MagicIdCharge1();
        if(magicId === 0) { return "NONE" }
        if(magicId > 200) { return "original1" }
        return (Data.Magics as any)[magicId];
    }

    protected _compute_magicCharge2Name = (): string => {
        let magicId: number = this.MagicIdCharge2();
        if(magicId === 0) { return "NONE" }
        if(magicId > 200) { return "original2" }
        return (Data.Magics as any)[magicId];
    }

    protected _compute_magicCharge3Name = (): string => {
        let magicId: number = this.MagicIdCharge3();
        if(magicId === 0) { return "NONE" }
        if(magicId > 200) { return "original3" }
        return (Data.Magics as any)[magicId];
    }

}
export = RF5Weapon;
