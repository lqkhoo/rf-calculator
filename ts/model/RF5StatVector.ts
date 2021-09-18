import ko = require('knockout');
import RF5Data = require('./RF5Data');
import IRF5StatVector = require('./IRF5StatVector');

abstract class RF5StatVector implements IRF5StatVector {

    // Field names
    static readonly KEY_name_id:        StatVectorKey = "id";
    static readonly KEY_name_en:        StatVectorKey = "name_en";
    static readonly KEY_name_jp:        StatVectorKey = "name_jp";
    static readonly KEY_image_uri:      StatVectorKey = "image_uri";
    static readonly KEY_level:          StatVectorKey = "level";
    static readonly KEY_rarity:         StatVectorKey = "rarity";
    static readonly KEY_stat_ATK:       StatVectorKey = "stat_ATK";
    static readonly KEY_stat_DEF:       StatVectorKey = "stat_DEF";
    static readonly KEY_stat_MAT:       StatVectorKey = "stat_MAT";
    static readonly KEY_stat_MDF:       StatVectorKey = "stat_MDF";
    static readonly KEY_stat_STR:       StatVectorKey = "stat_STR";
    static readonly KEY_stat_INT:       StatVectorKey = "stat_INT";
    static readonly KEY_stat_VIT:       StatVectorKey = "stat_VIT";
    static readonly KEY_stat_atk_CRT:   StatVectorKey = "stat_atk_CRT";
    static readonly KEY_stat_atk_KNO:   StatVectorKey = "stat_atk_KNO";
    static readonly KEY_stat_atk_STN:   StatVectorKey = "stat_atk_STN";
    static readonly KEY_stat_atk_DIZ:   StatVectorKey = "stat_atk_DIZ";
    static readonly KEY_stat_atk_PSN:   StatVectorKey = "stat_atk_PSN";
    static readonly KEY_stat_atk_SEA:   StatVectorKey = "stat_atk_SEA";
    static readonly KEY_stat_atk_PAR:   StatVectorKey = "stat_atk_PAR";
    static readonly KEY_stat_atk_SLP:   StatVectorKey = "stat_atk_SLP";
    static readonly KEY_stat_atk_FTG:   StatVectorKey = "stat_atk_FTG";
    static readonly KEY_stat_atk_SCK:   StatVectorKey = "stat_atk_SCK";
    static readonly KEY_stat_atk_FNT:   StatVectorKey = "stat_atk_FNT";
    static readonly KEY_stat_atk_DRN:   StatVectorKey = "stat_atk_DRN";
    static readonly KEY_stat_def_ele_FIRE:  StatVectorKey = "stat_def_ele_FIRE";
    static readonly KEY_stat_def_ele_WATER: StatVectorKey = "stat_def_ele_WATER";
    static readonly KEY_stat_def_ele_EARTH: StatVectorKey = "stat_def_ele_EARTH";
    static readonly KEY_stat_def_ele_WIND:  StatVectorKey = "stat_def_ele_WIND";
    static readonly KEY_stat_def_ele_LIGHT: StatVectorKey = "stat_def_ele_LIGHT";
    static readonly KEY_stat_def_ele_DARK:  StatVectorKey = "stat_def_ele_DARK";
    static readonly KEY_stat_def_ele_LOVE:  StatVectorKey = "stat_def_ele_LOVE";
    static readonly KEY_stat_def_ele_VOID:  StatVectorKey = "stat_def_ele_VOID";
    static readonly KEY_stat_def_CRT: StatVectorKey = "stat_def_CRT";
    static readonly KEY_stat_def_KNO: StatVectorKey = "stat_def_KNO";
    static readonly KEY_stat_def_STN: StatVectorKey = "stat_def_STN";
    static readonly KEY_stat_def_DIZ: StatVectorKey = "stat_def_DIZ";
    static readonly KEY_stat_def_PSN: StatVectorKey = "stat_def_PSN";
    static readonly KEY_stat_def_SEA: StatVectorKey = "stat_def_SEA";
    static readonly KEY_stat_def_PAR: StatVectorKey = "stat_def_PAR";
    static readonly KEY_stat_def_SLP: StatVectorKey = "stat_def_SLP";
    static readonly KEY_stat_def_FTG: StatVectorKey = "stat_def_FTG";
    static readonly KEY_stat_def_SCK: StatVectorKey = "stat_def_SCK";
    static readonly KEY_stat_def_FNT: StatVectorKey = "stat_def_FNT";
    static readonly KEY_stat_def_DRN: StatVectorKey = "stat_def_DRN";
    static readonly KEY_stat_chargespeed: StatVectorKey = "stat_chargespeed";
    static readonly KEY_stat_attacklength: StatVectorKey = "stat_attacklength";

    // Id
    readonly id:       ko.Observable<number>|ko.PureComputed<number>;

    // Context
    UseEquipmentStats: ko.PureComputed<boolean>;
    Context:           ko.PureComputed<any>;

    // Stats
    name_en:           ko.PureComputed<string>;
    name_jp:           ko.PureComputed<string>;
    image_uri:         ko.PureComputed<string>;
    level:             ko.PureComputed<number>;
    rarity:            ko.PureComputed<number>;
    stat_ATK:          ko.PureComputed<number>;
    stat_DEF:          ko.PureComputed<number>;
    stat_MAT:          ko.PureComputed<number>;
    stat_MDF:          ko.PureComputed<number>;
    stat_STR:          ko.PureComputed<number>;
    stat_INT:          ko.PureComputed<number>;
    stat_VIT:          ko.PureComputed<number>;
    stat_atk_CRT:      ko.PureComputed<number>;
    stat_atk_KNO:      ko.PureComputed<number>;
    stat_atk_STN:      ko.PureComputed<number>;
    stat_atk_DIZ:      ko.PureComputed<number>;
    stat_atk_PSN:      ko.PureComputed<number>;
    stat_atk_SEA:      ko.PureComputed<number>;
    stat_atk_PAR:      ko.PureComputed<number>;
    stat_atk_SLP:      ko.PureComputed<number>;
    stat_atk_FTG:      ko.PureComputed<number>;
    stat_atk_SCK:      ko.PureComputed<number>;
    stat_atk_FNT:      ko.PureComputed<number>;
    stat_atk_DRN:      ko.PureComputed<number>;
    stat_def_ele_FIRE: ko.PureComputed<number>;
    stat_def_ele_WATER: ko.PureComputed<number>;
    stat_def_ele_EARTH: ko.PureComputed<number>;
    stat_def_ele_WIND:  ko.PureComputed<number>;
    stat_def_ele_LIGHT: ko.PureComputed<number>;
    stat_def_ele_DARK:  ko.PureComputed<number>;
    stat_def_ele_LOVE:  ko.PureComputed<number>;
    stat_def_ele_VOID:  ko.PureComputed<number>;
    stat_def_CRT:      ko.PureComputed<number>;
    stat_def_KNO:      ko.PureComputed<number>;
    stat_def_STN:      ko.PureComputed<number>;
    stat_def_DIZ:      ko.PureComputed<number>;
    stat_def_PSN:      ko.PureComputed<number>;
    stat_def_SEA:      ko.PureComputed<number>;
    stat_def_PAR:      ko.PureComputed<number>;
    stat_def_SLP:      ko.PureComputed<number>;
    stat_def_FTG:      ko.PureComputed<number>;
    stat_def_SCK:      ko.PureComputed<number>;
    stat_def_FNT:      ko.PureComputed<number>;
    stat_def_DRN:      ko.PureComputed<number>;
    stat_chargespeed:  ko.PureComputed<number>;
    stat_attacklength: ko.PureComputed<number>;

    // Map
    readonly StatNameMap:       Record<string, ko.Observable|ko.Computed|ko.PureComputed> = {};

    constructor(id: number, useEquipmentStats: boolean=false) {

        const self = this;
        // Although the context has id, we don't use it directly.
        // We derive the context from id, rather than the other way around.
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

        this.StatNameMap = {};
    }

    public GetStatByName = (name: StatVectorKey): number | string => {
        return this.StatNameMap[name]();
    }

    // Only call this method after overwriting all necessary ko.Computed observables
    // in order to get the correct reference.
    public FinalizeVectorOverride = (): void => {
        this.StatNameMap[RF5StatVector.KEY_name_id] = this.id;
        this.StatNameMap[RF5StatVector.KEY_name_en] = this.name_en;
        this.StatNameMap[RF5StatVector.KEY_name_jp] = this.name_jp;
        this.StatNameMap[RF5StatVector.KEY_image_uri] = this.image_uri;
        this.StatNameMap[RF5StatVector.KEY_level] = this.level;
        this.StatNameMap[RF5StatVector.KEY_rarity] = this.rarity;
        this.StatNameMap[RF5StatVector.KEY_stat_ATK] = this.stat_ATK;
        this.StatNameMap[RF5StatVector.KEY_stat_DEF] = this.stat_DEF;
        this.StatNameMap[RF5StatVector.KEY_stat_MAT] = this.stat_MAT;
        this.StatNameMap[RF5StatVector.KEY_stat_MDF] = this.stat_MDF;
        this.StatNameMap[RF5StatVector.KEY_stat_STR] = this.stat_STR;
        this.StatNameMap[RF5StatVector.KEY_stat_INT] = this.stat_INT;
        this.StatNameMap[RF5StatVector.KEY_stat_VIT] = this.stat_VIT;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_CRT] = this.stat_atk_CRT;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_KNO] = this.stat_atk_KNO;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_STN] = this.stat_atk_STN;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_DIZ] = this.stat_atk_DIZ;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_PSN] = this.stat_atk_PSN;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_SEA] = this.stat_atk_SEA;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_PAR] = this.stat_atk_PAR;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_SLP] = this.stat_atk_SLP;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_FTG] = this.stat_atk_FTG;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_SCK] = this.stat_atk_SCK;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_FNT] = this.stat_atk_FNT;
        this.StatNameMap[RF5StatVector.KEY_stat_atk_DRN] = this.stat_atk_DRN;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_FIRE] = this.stat_def_ele_FIRE;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_WATER] = this.stat_def_ele_WATER;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_EARTH] = this.stat_def_ele_EARTH;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_WIND] = this.stat_def_ele_WIND;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_LIGHT] = this.stat_def_ele_LIGHT;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_DARK] = this.stat_def_ele_DARK;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_LOVE] = this.stat_def_ele_LOVE;
        this.StatNameMap[RF5StatVector.KEY_stat_def_ele_VOID] = this.stat_def_ele_VOID;
        this.StatNameMap[RF5StatVector.KEY_stat_def_CRT] = this.stat_def_CRT;
        this.StatNameMap[RF5StatVector.KEY_stat_def_KNO] = this.stat_def_KNO;
        this.StatNameMap[RF5StatVector.KEY_stat_def_STN] = this.stat_def_STN;
        this.StatNameMap[RF5StatVector.KEY_stat_def_DIZ] = this.stat_def_DIZ;
        this.StatNameMap[RF5StatVector.KEY_stat_def_PSN] = this.stat_def_PSN;
        this.StatNameMap[RF5StatVector.KEY_stat_def_SEA] = this.stat_def_SEA;
        this.StatNameMap[RF5StatVector.KEY_stat_def_PAR] = this.stat_def_PAR;
        this.StatNameMap[RF5StatVector.KEY_stat_def_SLP] = this.stat_def_SLP;
        this.StatNameMap[RF5StatVector.KEY_stat_def_FTG] = this.stat_def_FTG;
        this.StatNameMap[RF5StatVector.KEY_stat_def_SCK] = this.stat_def_SCK;
        this.StatNameMap[RF5StatVector.KEY_stat_def_FNT] = this.stat_def_FNT;
        this.StatNameMap[RF5StatVector.KEY_stat_def_DRN] = this.stat_def_DRN;
        this.StatNameMap[RF5StatVector.KEY_stat_chargespeed] = this.stat_chargespeed;
        this.StatNameMap[RF5StatVector.KEY_stat_attacklength] = this.stat_attacklength;
    }

    protected _compute_string_helper = (fieldName: StatVectorKey, defaultValue: string) => {
        const self = this;
        return function(): string {
            let val: string = defaultValue;
            let ctx: any = (self.Context() as any);
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            return val;
        };
    }

    protected _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number, isPercent: boolean=false) => {
        const self = this;
        return function(): number {
            let val: number = defaultValue;
            let ctx: any = (self.Context() as any);
            if (ctx[fieldName] !== undefined) {
                val = ctx[fieldName];
            }
            return isPercent ? val*100 : val;
        };
    }

    protected _compute_context = (): any => {
        if(this.UseEquipmentStats()) {
            // Baseitem doesn't contain the empty item "0" so fallback to Data.Items
            return (RF5Data.BaseItems as any)[this.id()] || (RF5Data.Items as any)["0"];
        } else {
            return (RF5Data.Items as any)[this.id()] || (RF5Data.Items as any)["0"];
        }
    }

    // Default functions. They just retrieve the value from context unmodified if it exists,
    // otherwise falls back to item id zero.
    protected _compute_name_en = this._compute_string_helper(RF5StatVector.KEY_name_en, "None");
    protected _compute_name_jp = this._compute_string_helper(RF5StatVector.KEY_name_jp, "\u306a\u3057");
    protected _compute_image_uri = this._compute_string_helper(RF5StatVector.KEY_image_uri, "icon/Empty.png");
    // protected _compute_level = this._compute_number_helper(RF5StatVector.KEY_level, 1);
    protected _compute_level = (): number => { return 0; }
    protected _compute_rarity = this._compute_number_helper(RF5StatVector.KEY_rarity, 0);
    protected _compute_stat_ATK = this._compute_number_helper(RF5StatVector.KEY_stat_ATK, 0);
    protected _compute_stat_DEF = this._compute_number_helper(RF5StatVector.KEY_stat_DEF, 0);
    protected _compute_stat_MAT = this._compute_number_helper(RF5StatVector.KEY_stat_MAT, 0);
    protected _compute_stat_MDF = this._compute_number_helper(RF5StatVector.KEY_stat_MDF, 0);
    protected _compute_stat_STR = this._compute_number_helper(RF5StatVector.KEY_stat_STR, 0);
    protected _compute_stat_INT = this._compute_number_helper(RF5StatVector.KEY_stat_INT, 0);
    protected _compute_stat_VIT = this._compute_number_helper(RF5StatVector.KEY_stat_VIT, 0);
    protected _compute_stat_atk_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_CRT, 0, true);
    protected _compute_stat_atk_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_atk_KNO, 0, true);
    protected _compute_stat_atk_STN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_STN, 0, true);
    protected _compute_stat_atk_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DIZ, 0, true);
    protected _compute_stat_atk_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PSN, 0, true);
    protected _compute_stat_atk_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SEA, 0, true);
    protected _compute_stat_atk_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_atk_PAR, 0, true);
    protected _compute_stat_atk_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SLP, 0, true);
    protected _compute_stat_atk_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FTG, 0, true);
    protected _compute_stat_atk_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_atk_SCK, 0, true);
    protected _compute_stat_atk_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_atk_FNT, 0, true);
    protected _compute_stat_atk_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_atk_DRN, 0, true);
    protected _compute_def_ele_FIRE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_FIRE, 0, true);
    protected _compute_def_ele_WATER = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WATER, 0, true);
    protected _compute_def_ele_EARTH = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_EARTH, 0, true);
    protected _compute_def_ele_WIND = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_WIND, 0, true);
    protected _compute_def_ele_LIGHT = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LIGHT, 0, true);
    protected _compute_def_ele_DARK = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_DARK, 0, true);
    protected _compute_def_ele_LOVE = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_LOVE, 0, true);
    protected _compute_def_ele_VOID = this._compute_number_helper(RF5StatVector.KEY_stat_def_ele_VOID, 0, true);
    protected _compute_def_CRT = this._compute_number_helper(RF5StatVector.KEY_stat_def_CRT, 0, true);
    protected _compute_def_KNO = this._compute_number_helper(RF5StatVector.KEY_stat_def_KNO, 0, true);
    protected _compute_def_STN = this._compute_number_helper(RF5StatVector.KEY_stat_def_STN, 0, true);
    protected _compute_def_DIZ = this._compute_number_helper(RF5StatVector.KEY_stat_def_DIZ, 0, true);
    protected _compute_def_PSN = this._compute_number_helper(RF5StatVector.KEY_stat_def_PSN, 0, true);
    protected _compute_def_SEA = this._compute_number_helper(RF5StatVector.KEY_stat_def_SEA, 0, true);
    protected _compute_def_PAR = this._compute_number_helper(RF5StatVector.KEY_stat_def_PAR, 0, true);
    protected _compute_def_SLP = this._compute_number_helper(RF5StatVector.KEY_stat_def_SLP, 0, true);
    protected _compute_def_FTG = this._compute_number_helper(RF5StatVector.KEY_stat_def_FTG, 0, true);
    protected _compute_def_SCK = this._compute_number_helper(RF5StatVector.KEY_stat_def_SCK, 0, true);
    protected _compute_def_FNT = this._compute_number_helper(RF5StatVector.KEY_stat_def_FNT, 0, true);
    protected _compute_def_DRN = this._compute_number_helper(RF5StatVector.KEY_stat_def_DRN, 0, true);
    protected _compute_stat_chargespeed = this._compute_number_helper(RF5StatVector.KEY_stat_chargespeed, 0);
    protected _compute_stat_attacklength = this._compute_number_helper(RF5StatVector.KEY_stat_attacklength, 0);

}
export = RF5StatVector;
