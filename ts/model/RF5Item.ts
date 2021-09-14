import _ = require('lodash');
import ko = require('knockout');
import IRF5Item = require('./IRF5Item');
import IRF5Slot = require('./IRF5Slot');
import IRF5StatVector = require('./IRF5StatVector');
import RF5AbstractSlot = require('./RF5AbstractSlot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Character = require('./IRF5Character');
// Children
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import LevelBonusVector = require('./LevelBonusVector');
import RarityBonusVector = require('./RarityBonusVector');
import CoreBonusVector = require('./CoreBonusVector');
// VM
import VMRF5Item = require('../vm/VMRF5Item');
// Data
import Data = require('./Data');


class RF5Item extends RF5StatVector implements IRF5Item {

    static readonly NSLOTS_RECIPE: number = 6;
    static readonly NSLOTS_ARRANGE: number = 3;
    static readonly NSLOTS_UPGRADE: number = 9;
    static readonly DEFAULT_ITEM_ID: number = 0;

    override readonly id: ko.PureComputed<number>;

    readonly EquipmentType: EquipmentType;
    readonly IsActive: ko.Observable<boolean>;

    readonly LevelBonus: ko.Observable<RF5StatVector>;
    readonly RarityBonus: ko.Observable<RF5StatVector>;
    readonly CoreBonus: ko.Observable<RF5StatVector>;
    readonly HasClover: ko.PureComputed<boolean>;

    readonly Character: ko.Observable<IRF5Character>;

    readonly BaseItem: ko.Observable<RF5SlotBaseItem>;
    readonly RecipeSlots: ko.ObservableArray<RF5SlotRecipe>;
    readonly ArrangeSlots: ko.ObservableArray<RF5SlotArrange>;
    readonly UpgradeSlots: ko.ObservableArray<RF5SlotUpgrade>;

    readonly ViewModel: VMRF5Item;

    constructor(character: IRF5Character, equipment_type: EquipmentType,
                    character_id: number=RF5Item.DEFAULT_ITEM_ID) {
        
        super(character_id);
        var self = this;

        this.id = ko.pureComputed(function() {
            if(self.BaseItem() === undefined) { return 0; }
            else { return self.BaseItem().id(); }
        });
        this.level = ko.pureComputed(self._compute_level)
        this.rarity = ko.pureComputed(self._compute_rarity);
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

        this.LevelBonus = ko.observable(new LevelBonusVector(this));
        this.RarityBonus = ko.observable(new RarityBonusVector(this));
        this.CoreBonus = ko.observable(new CoreBonusVector(this));

        this.Character = ko.observable(character);
        this.EquipmentType = equipment_type;
        this.IsActive = ko.observable(false);

        this.ViewModel = new VMRF5Item(this); // Needs to be before slots

        let i = 0;
        this.BaseItem = ko.observable(new RF5SlotBaseItem(this, i));
        i++;
        this.RecipeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_RECIPE; j++) {
            this.RecipeSlots.push(new RF5SlotRecipe(this, i));
            i++;
        }
        this.ArrangeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_ARRANGE; j++) {
            this.ArrangeSlots.push(new RF5SlotArrange(this, i));
            i++
        }
        this.UpgradeSlots = ko.observableArray([]);
        for(var j=0; j<RF5Item.NSLOTS_UPGRADE; j++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade(this, i));
            i++;
        }

        // Certain attributes have to be initialized after all slots because they need
        // the RF5Slots themselves or observables to have been initialize.
        this.HasClover = ko.pureComputed(self._compute_hasClover);

    }


    public ApplyRecipeRestrictions = (baseItem: RF5SlotBaseItem): void => {
        const baseitemId: number = baseItem.id();
        const recipes: any = (Data.Recipes as any);
        const n = this.RecipeSlots().length; // should be 6;

        let ids: number[];
        if(recipes.hasOwnProperty(baseitemId)) {
            ids = (Data.Recipes as any)[baseitemId];
        } else {
            ids = [];
        }
        for(var i=0; i<n; i++) {
            var id = (i < ids.length) ? ids[i] : 0;
            this.RecipeSlots()[i].ApplyRestriction(id);
        }
    }

    /*
    public ApplyArrangeRestrictions = (): void => {
        if(this.EquipmentType === "boots" || this.EquipmentType === "accessory") {
            if(! this.BaseItem().IsBeingOverridden()) {
                this.ArrangeSlots()[0].ApplyRestriction(0); // Clear restrictions.
            }
            // Find overriding item
            for(let i=0; i<RF5AbstractSlot.ARRANGE_START_IDX; i++) {
                let slot: IRF5Slot = this.GetSlotByIndex(i);
                if(slot.IsOverriding()) {
                    this.ArrangeSlots()[0].ApplyRestriction(slot.id());
                    break;
                }
            }
        }
        // Else do nothing.
    }
    */
   public ApplyArrangeRestrictions = (): void => {
       // Do nothing.
       // The original plan was that inheriting from boots / accessories would also
       // mean that it takes up one arrange slot as well. The thing is not all boots
       // or accessories have inheritable special effects. And if they do, if the piece
       // already has 4 or more effects, then the inheritance is random (?). I'm not entirely
       // sure that the base would always go into the arrange slot, so just let it be.
   }

    public GetSlotByIndex = (index: number): IRF5Slot => {
        index = _.clamp(index, 0, 18); // Inclusive both
        if(index == 0) {
            return this.BaseItem();
        } else if (index < RF5AbstractSlot.ARRANGE_START_IDX) {
            return this.RecipeSlots()[index - 1];
        } else if (index < RF5AbstractSlot.UPGRADE_START_IDX) {
            return this.ArrangeSlots()[index - RF5AbstractSlot.ARRANGE_START_IDX];
        } else {
            return this.UpgradeSlots()[index - RF5AbstractSlot.UPGRADE_START_IDX];
        }
    }

    
    protected _compute_hasClover = (): boolean => {
        for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
            let id = this.GetSlotByIndex(i).id();
            if(id === 0) { continue; }
            if(Data.IsClover(id) || Data.IsGiantClover(id)) { return true; }
        }
        return false;
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
            accumulate(self.CoreBonus());
            return val;
        };
    }

    protected override _compute_level = this._compute_number_helper(RF5StatVector.KEY_level, 0);
    protected override _compute_rarity = this._compute_number_helper(RF5StatVector.KEY_rarity, 0);
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
    protected override _compute_def_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_def_FNT, 0);
    protected override _compute_def_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_def_DRN, 0);
    protected override _compute_stat_chargespeed = this._compute_number_helper(RF5StatVector.KEY_stat_chargespeed, 0);
    protected override _compute_stat_attacklength = this._compute_number_helper(RF5StatVector.KEY_stat_attacklength, 0);

}
export = RF5Item;
