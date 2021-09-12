import ko = require('knockout');
import Data = require('./Data');
import IStatVector = require('./IStatVector');

class RF5StatVector implements IStatVector {

    readonly id:                ko.Observable<number>;
    readonly UseEquipmentStats: ko.PureComputed<boolean>;
    readonly Context:           ko.PureComputed<any>;

    readonly name_en:           ko.PureComputed<string>;
    readonly name_jp:           ko.PureComputed<string>;
    readonly image_uri:         ko.PureComputed<string>;
    readonly level:             ko.PureComputed<number>;
    readonly rarity:            ko.PureComputed<number>;
    readonly stat_ATK:          ko.PureComputed<number>;
    readonly stat_DEF:          ko.PureComputed<number>;
    readonly stat_MAT:          ko.PureComputed<number>;
    readonly stat_MDF:          ko.PureComputed<number>;
    readonly stat_STR:          ko.PureComputed<number>;
    readonly stat_INT:          ko.PureComputed<number>;
    readonly stat_VIT:          ko.PureComputed<number>;
    readonly stat_atk_CRT:      ko.PureComputed<number>;
    readonly stat_atk_KNO:      ko.PureComputed<number>;
    readonly stat_atk_KNOTM:    ko.PureComputed<number>;
    readonly stat_atk_STN:      ko.PureComputed<number>;
    readonly stat_atk_PSN:      ko.PureComputed<number>;
    readonly stat_atk_SEA:      ko.PureComputed<number>;
    readonly stat_atk_PAR:      ko.PureComputed<number>;
    readonly stat_atk_SLP:      ko.PureComputed<number>;
    readonly stat_atk_FTG:      ko.PureComputed<number>;
    readonly stat_atk_SCK:      ko.PureComputed<number>;
    readonly stat_atk_FNT:      ko.PureComputed<number>;
    readonly stat_atk_DRN:      ko.PureComputed<number>;
    readonly stat_def_ele_FIRE: ko.PureComputed<number>;
    readonly stat_def_ele_WATER: ko.PureComputed<number>;
    readonly stat_def_ele_EARTH: ko.PureComputed<number>;
    readonly stat_def_ele_WIND:  ko.PureComputed<number>;
    readonly stat_def_ele_LIGHT: ko.PureComputed<number>;
    readonly stat_def_ele_DARK:  ko.PureComputed<number>;
    readonly stat_def_ele_LOVE:  ko.PureComputed<number>;
    readonly stat_def_ele_VOID:  ko.PureComputed<number>;
    readonly stat_def_CRT:      ko.PureComputed<number>;
    readonly stat_def_KNO:      ko.PureComputed<number>;
    readonly stat_def_KNOTM:    ko.PureComputed<number>;
    readonly stat_def_STN:      ko.PureComputed<number>;
    readonly stat_def_PSN:      ko.PureComputed<number>;
    readonly stat_def_SEA:      ko.PureComputed<number>;
    readonly stat_def_PAR:      ko.PureComputed<number>;
    readonly stat_def_SLP:      ko.PureComputed<number>;
    readonly stat_def_FTG:      ko.PureComputed<number>;
    readonly stat_def_SCK:      ko.PureComputed<number>;
    readonly stat_def_FNT:      ko.PureComputed<number>;
    readonly stat_def_DRN:      ko.PureComputed<number>;
    readonly stat_chargespeed:  ko.PureComputed<number>;
    readonly stat_attacklength: ko.PureComputed<number>;


    constructor(id: number, useEquipmentStats: boolean=false) {

        var self = this;

        this.id = ko.observable(id);
        this.UseEquipmentStats = ko.pureComputed(function() {
            return useEquipmentStats;
        });

        this.Context = ko.pureComputed(self._compute_context);

        // Override these as necessary. These are default / unmodified / last-resort values.
        
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

    protected _compute_string_helper = (fieldName: string, defaultValue: string) => {
        var self = this;
        return function(): string {
            let val: string = defaultValue;
            let ctx: any = (self.Context() as any);
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            return val;
        };
    }

    protected _compute_number_helper = (fieldName: string, defaultValue: number) => {
        var self = this;
        return function(): number {
            let val: number = defaultValue;
            let ctx: any = (self.Context() as any);
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            return val;
        };
    }

    protected _compute_context = (): any => {
        if(this.UseEquipmentStats()) {
            // Baseitem doesn't contain the empty item "0" so fallback to Data.Items
            return (Data.BaseItems as any)[this.id()] || (Data.Items as any)["0"];
        } else {
            return (Data.Items as any)[this.id()] || (Data.Items as any)["0"];
        }
    }

    protected _compute_name_en = this._compute_string_helper("name_en", "None");
    protected _compute_name_jp = this._compute_string_helper("name_jp", "\u306a\u3057");
    protected _compute_image_uri = this._compute_string_helper("image_uri", "icon/Empty.png");
    protected _compute_level = this._compute_number_helper("level", 0);
    protected _compute_rarity = this._compute_number_helper("rarity", 0);
    protected _compute_stat_ATK = this._compute_number_helper("stat_ATK", 0);
    protected _compute_stat_DEF = this._compute_number_helper("stat_DEF", 0);
    protected _compute_stat_MAT = this._compute_number_helper("stat_MAT", 0);
    protected _compute_stat_MDF = this._compute_number_helper("stat_MDF", 0);
    protected _compute_stat_STR = this._compute_number_helper("stat_STR", 0);
    protected _compute_stat_INT = this._compute_number_helper("stat_INT", 0);
    protected _compute_stat_VIT = this._compute_number_helper("stat_VIT", 0);
    protected _compute_atk_CRT = this._compute_number_helper("stat_atk_CRT", 0);
    protected _compute_atk_KNO = this._compute_number_helper("stat_atk_KNO", 0);
    protected _compute_atk_KNOTM = this._compute_number_helper("stat_atk_KNOTM", 0);
    protected _compute_atk_STN = this._compute_number_helper("stat_atk_STN", 0);
    protected _compute_atk_PSN = this._compute_number_helper("stat_atk_PSN", 0);
    protected _compute_atk_SEA = this._compute_number_helper("stat_atk_SEA", 0);
    protected _compute_atk_PAR = this._compute_number_helper("stat_atk_PAR", 0);
    protected _compute_atk_SLP = this._compute_number_helper("stat_atk_SLP", 0);
    protected _compute_atk_FTG = this._compute_number_helper("stat_atk_FTG", 0);
    protected _compute_atk_SCK = this._compute_number_helper("stat_atk_SCK", 0);
    protected _compute_atk_FNT = this._compute_number_helper("stat_atk_FNT", 0);
    protected _compute_atk_DRN = this._compute_number_helper("stat_atk_DRN", 0);
    protected _compute_def_ele_FIRE = this._compute_number_helper("stat_def_ele_FIRE", 0);
    protected _compute_def_ele_WATER = this._compute_number_helper("stat_def_ele_WATER", 0);
    protected _compute_def_ele_EARTH = this._compute_number_helper("stat_def_ele_EARTH", 0);
    protected _compute_def_ele_WIND = this._compute_number_helper("stat_def_ele_WIND", 0);
    protected _compute_def_ele_LIGHT = this._compute_number_helper("stat_def_ele_LIGHT", 0);
    protected _compute_def_ele_DARK = this._compute_number_helper("stat_def_ele_DARK", 0);
    protected _compute_def_ele_LOVE = this._compute_number_helper("stat_def_ele_LOVE", 0);
    protected _compute_def_ele_VOID = this._compute_number_helper("stat_def_ele_VOID", 0);
    protected _compute_def_CRT = this._compute_number_helper("stat_def_CRT", 0);
    protected _compute_def_KNO = this._compute_number_helper("stat_def_KNO", 0);
    protected _compute_def_KNOTM = this._compute_number_helper("stat_def_KNOTM", 0);
    protected _compute_def_STN = this._compute_number_helper("stat_def_STN", 0);
    protected _compute_def_PSN = this._compute_number_helper("stat_def_PSN", 0);
    protected _compute_def_SEA = this._compute_number_helper("stat_def_SEA", 0);
    protected _compute_def_PAR = this._compute_number_helper("stat_def_PAR", 0);
    protected _compute_def_SLP = this._compute_number_helper("stat_def_SLP", 0);
    protected _compute_def_FTG = this._compute_number_helper("stat_def_FTG", 0);
    protected _compute_def_SCK = this._compute_number_helper("stat_def_SCK", 0);
    protected _compute_def_FNT = this._compute_number_helper("stat_def_FNT", 0);
    protected _compute_def_DRN = this._compute_number_helper("stat_def_DRN", 0);
    protected _compute_stat_chargespeed = this._compute_number_helper("stat_chargespeed", 0);
    protected _compute_stat_attacklength = this._compute_number_helper("stat_attacklength", 0);

}
export = RF5StatVector;
