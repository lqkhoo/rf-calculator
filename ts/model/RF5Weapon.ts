import ko = require('knockout');
import IRF5Slot = require('./IRF5Slot');
// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5StatVector = require('./RF5StatVector');
// Data
import Data = require('./Data');
import RF5AbstractSlot = require('./RF5AbstractSlot');
import VectorDualSmith = require('./VectorDualSmith');
import IRF5StatVector = require('./IRF5StatVector');

    
class RF5Weapon extends RF5Item {

    static readonly DEFAULT_DUALSMITH_RELATION_LEVEL: number = 0;
    static readonly DEFAULT_DUALSMITH_BONUS_TYPE: DualSmithBonusType = "NONE";

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

    readonly DualSmith: ko.Observable<VectorDualSmith>;

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID, deserializedObject: any=undefined) {
        super(character, "weapon", item_id, deserializedObject);
        const self = this;

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

        this.DualSmith = ko.observable(new VectorDualSmith(
            this,
            deserializedObject !== undefined ? deserializedObject.dualLevel : 0,
            deserializedObject !== undefined ? deserializedObject.dualType : "NONE"
        ));
    }

    public override toJSON = (): any => {
        let obj: any = super.toJSON();
        obj.dualLevel = this.DualSmith().DualSmithRelationLevel();
        obj.dualType = this.DualSmith().DualSmithBonusType();
        return obj;
    }

    protected _compute_hasRareCan = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
                if(Data.IsRareCan(this.GetSlotByIndex(i).id())) { return true; }
            }
        }
        return false;
    }

    protected _compute_hasScrapMetalPlus = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
                if(Data.IsScrapMetalPlus(this.GetSlotByIndex(i).id())) { return true; }
            }
        }
        return false;
    }

    protected _compute_hasShadeStone = (): boolean => {
        if(this.EquipmentType === "weapon") {
            for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
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

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number) => {
        const self = this;
        return function(): number {

            let val: number = defaultValue;
            let slot: IRF5StatVector;
            function accumulate(_slot: IRF5StatVector, skipIdZero: boolean=true) {
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
            accumulate(self.CoreBonus(), false);
            accumulate(self.DualSmith(), false); // <-- only difference to RF5Item
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
        const self = this;
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
