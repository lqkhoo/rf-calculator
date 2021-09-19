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
import VectorLevelBonus = require('./VectorLevelBonus');
import VectorRarityBonus = require('./VectorRarityBonus');
import VectorCoreBonus = require('./VectorCoreBonus');
// VM
import VMRF5Item = require('../vm/VMRF5Item');
// Data
import RF5Data = require('./RF5Data');


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

    constructor(character: IRF5Character,
                equipment_type: EquipmentType,
                item_id: number=RF5Item.DEFAULT_ITEM_ID,
                deserializedObject: any=undefined) {
        
        super(item_id);
        const self = this;

        this.id = ko.pureComputed(function() {
            if(self.BaseItem() === undefined) { return 0; }
            else { return self.BaseItem().id(); }
        }).extend({ deferred: true });

        this.level = ko.pureComputed(self._compute_level).extend({ deferred: true });
        this.rarity = ko.pureComputed(self._compute_rarity).extend({ deferred: true });
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
        this.stat_chargespeed = ko.pureComputed((function() {
            return 0;
        })).extend({ deferred: true });
        this.stat_attacklength = ko.pureComputed((function() {
            return 0;
        })).extend({ deferred: true });

        this.FinalizeVectorOverride();

        this.LevelBonus = ko.observable(new VectorLevelBonus(this)).extend({ deferred: true });
        this.RarityBonus = ko.observable(new VectorRarityBonus(this)).extend({ deferred: true });
        this.CoreBonus = ko.observable(new VectorCoreBonus(this)).extend({ deferred: true });

        this.Character = ko.observable(character).extend({ deferred: true });
        this.EquipmentType = equipment_type;
        this.IsActive = ko.observable(false).extend({ deferred: true });

        this.ViewModel = new VMRF5Item(this); // Needs to be before slots

        let i = 0;
        let ids: number[];
        let levels: number[];
        if(deserializedObject !== undefined) {
            this.IsActive(deserializedObject.isActive);
            ids = deserializedObject.ids;
            levels = deserializedObject.levels;
        } else {
            ids = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            levels = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
        }
        this.BaseItem = ko.observable(new RF5SlotBaseItem(this, i, ids[i], levels[i]))
                            .extend({ deferred: true });
        i++;

        this.RecipeSlots = ko.observableArray([])
                                .extend({ deferred: true });
        for(let j=0; j<RF5Item.NSLOTS_RECIPE; j++) {
            this.RecipeSlots.push(new RF5SlotRecipe(this, i, ids[i], levels[i]));
            i++;
        }

        this.ArrangeSlots = ko.observableArray([])
                                .extend({ deferred: true });
        for(let j=0; j<RF5Item.NSLOTS_ARRANGE; j++) {
            this.ArrangeSlots.push(new RF5SlotArrange(this, i, ids[i], levels[i]));
            i++
        }

        this.UpgradeSlots = ko.observableArray([])
                                .extend({ deferred: true });
        for(let j=0; j<RF5Item.NSLOTS_UPGRADE; j++) {
            this.UpgradeSlots.push(new RF5SlotUpgrade(this, i, ids[i], levels[i]));
            i++;
        }
        
        this.ApplyRecipeRestrictions(this.BaseItem());

        // Certain attributes have to be initialized after all slots, because otherwise
        // we get undefined references as slots are still missing.
        this.HasClover = ko.pureComputed(self._compute_hasClover).extend({ deferred: true });
    }


    public ApplyRecipeRestrictions = (baseItem: RF5SlotBaseItem): void => {
        const self = this;
        const baseitemId: number = baseItem.id();
        const recipes: any = (RF5Data.Recipes as any);
        const n = this.RecipeSlots().length; // should be 6;

        let ids: number[];
        if(recipes.hasOwnProperty(baseitemId)) {
            ids = (RF5Data.Recipes as any)[baseitemId];
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
    
    protected toJSON_scoper = (): any => {
        let itemIds: number[] = [];
        let levels: number[] = [];

        itemIds.push(this.BaseItem().id());
        levels.push(this.BaseItem().level());
        for(let i=0; i<this.RecipeSlots().length; i++) {
            itemIds.push(this.RecipeSlots()[i].id());
            levels.push(this.RecipeSlots()[i].level());
        }
        for(let i=0; i<this.ArrangeSlots().length; i++) {
            itemIds.push(this.ArrangeSlots()[i].id());
            levels.push(this.ArrangeSlots()[i].level());
        }
        for(let i=0; i<this.UpgradeSlots().length; i++) {
            itemIds.push(this.UpgradeSlots()[i].id());
            levels.push(this.UpgradeSlots()[i].level());
        }
        let obj: any = {
            isActive: this.IsActive(),
            ids: itemIds,
            levels: levels
        };
        return obj;
    }

    public toJSON(): any {
        return this.toJSON_scoper();
    }

    protected _compute_hasClover = (): boolean => {
        for(let i=RF5AbstractSlot.ARRANGE_START_IDX; i<RF5AbstractSlot.SLOT_END_IDX; i++) {
            let id = this.GetSlotByIndex(i).id();
            if(id === 0) { continue; }
            if(RF5Data.IsClover(id) || RF5Data.IsGiantClover(id)) { return true; }
        }
        return false;
    }

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

}
export = RF5Item;
