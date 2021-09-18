import ko = require('knockout');
import _ = require('lodash');
// Super
import RF5Slot = require('./RF5Slot');
// Parent
import IRF5Item = require('./IRF5Item');
// VM
import VMRF5SlotRecipe = require('../vm/VMRF5SlotRecipe');
// Data
import RF5Data = require('./RF5Data');
import RF5StatVector = require('./RF5StatVector');

class RF5SlotRecipe extends RF5Slot {

    readonly Restriction: ko.Observable<number>; // item or category id
    override readonly ViewModel: VMRF5SlotRecipe;

    constructor(item: IRF5Item,
        index: number,
        item_id: number=RF5Slot.DEFAULT_ITEM_ID,
        level: number=RF5Slot.DEFAULT_LEVEL) {

        super(item, index, item_id, level);
        const self = this;

        this.Restriction = ko.observable(0);

        this.image_uri = ko.pureComputed(function() {
            let image_uri: string = "icon/Empty.png";
            const categories: any = RF5Data.Categories;
            const categoryId = self.Restriction()
            if(categories.hasOwnProperty(categoryId)) {
                image_uri = categories[categoryId].image_uri;
            } else if (self.Context() !== undefined && (self.Context() as any).image_uri !== undefined) {
                image_uri = (self.Context() as any).image_uri;
            }
            return image_uri;
        });

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

        this.IsRestricted = ko.pureComputed(function() {
            return self.Restriction() !== 0;
        });
        this.IsLocked = ko.pureComputed(function() {
            const itemIds: any = RF5Data.Item_ids;
            return self.IsRestricted() && itemIds.hasOwnProperty(self.Restriction());
        })

        this.ViewModel = new VMRF5SlotRecipe(this);
    }

    public ApplyRestriction = (restrictionId: number): void => {
        this.Restriction(restrictionId);

        if(restrictionId === 0) {
            return;
        }
        if(!RF5Data.Category_ids.hasOwnProperty(restrictionId)) {
            // Means this is a nonempty itemId, not a categoryId.
            this.ChangeId(restrictionId);
        } else {
            // Category restriction. If current item not in category, set to zero.
            const itemIds: number[] = (RF5Data.Categories as any)[restrictionId].item_ids;
            let found: boolean = false;
            for(var i=0; i<itemIds.length; i++) {
                if(this.id() === itemIds[i]) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                this.ChangeId(0);
            }
        }
    }

    public override ChangeId(newId: number) {
        this.id(newId);
        this.Item().ApplyArrangeRestrictions();
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number, isPercent: boolean=false) => {
        const self = this;
        return function(): number {
            if(! self.IsOverriding()) {
                return 0;
            }
            let val: number = defaultValue;
            let ctx: any = self.Context();
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            if (isPercent) { val *= 100; }
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
export = RF5SlotRecipe;
