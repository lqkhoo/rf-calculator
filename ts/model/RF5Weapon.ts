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
    
class RF5Weapon extends RF5Item {

    readonly HasRareCan: ko.PureComputed<boolean>;
    readonly HasScrapMetalPlus: ko.PureComputed<boolean>;
    readonly Element: ko.PureComputed<ElementType>;

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID) {
        super(character, "weapon", item_id);
        var self = this;

        this.HasRareCan = ko.pureComputed(self._compute_hasRareCan);
        this.HasScrapMetalPlus = ko.pureComputed(self._compute_hasScrapMetalPlus);

        this.Element = ko.pureComputed(self._compute_Element);

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

    protected _compute_Element = (): ElementType => {
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
    
}
export = RF5Weapon;
