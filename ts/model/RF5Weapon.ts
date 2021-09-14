import ko = require('knockout');
// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5Slot = require('./RF5Slot');
import Data = require('./Data');
    
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

    protected _compute_Element = (): ElementType => {

        return "NONE";
    };
    
}
export = RF5Weapon;
