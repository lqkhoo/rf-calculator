import ko = require('knockout');

class RF5StatVector {
    
    readonly item_id:           ko.Observable<string> = ko.observable("0");
    
    readonly name_en:           ko.Observable<string> = ko.observable("None");
    readonly name_jp:           ko.Observable<string> = ko.observable("\u306a\u3057");
    readonly level:             ko.Observable<number> = ko.observable(10);
    readonly rarity:            ko.Observable<number> = ko.observable(0);
    readonly stat_ATK:          ko.Observable<number> = ko.observable(0);
    readonly stat_DEF:          ko.Observable<number> = ko.observable(0);
    readonly stat_MAT:          ko.Observable<number> = ko.observable(0);
    readonly stat_MDF:          ko.Observable<number> = ko.observable(0);
    readonly stat_STR:          ko.Observable<number> = ko.observable(0);
    readonly stat_INT:          ko.Observable<number> = ko.observable(0);
    readonly stat_VIT:          ko.Observable<number> = ko.observable(0);
    readonly stat_atk_CRT:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_KNO:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_KNOTM:    ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_STN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_PSN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_SEA:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_PAR:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_SLP:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_FTG:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_SCK:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_FNT:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_atk_DRN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_FIRE: ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_WATER: ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_EARTH: ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_WIND:  ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_LIGHT: ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_DARK:  ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_LOVE:  ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_ele_VOID:  ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_CRT:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_KNO:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_KNOTM:    ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_STN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_PSN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_SEA:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_PAR:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_SLP:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_FTG:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_SCK:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_FNT:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_def_DRN:      ko.Observable<number> = ko.observable(0.0);
    readonly stat_chargespeed:  ko.Observable<number> = ko.observable(0.0);
    readonly stat_attacklength: ko.Observable<number> = ko.observable(0.0);

    constructor(obj: any | undefined) {
        if(obj !== undefined) {
            if (obj.item_id !== undefined) { this.item_id(obj.item_id); }
            if (obj.name_en !== undefined) { this.name_en(obj.name_en); }
            if (obj.name_jp !== undefined) { this.name_jp(obj.name_jp); }
            if (obj.level !== undefined) { this.level(obj.level); }
            if (obj.rarity !== undefined) { this.rarity(obj.rarity); }
            if (obj.stat_ATK !== undefined) { this.stat_ATK(obj.stat_ATK); }
            if (obj.stat_DEF !== undefined) { this.stat_DEF(obj.stat_DEF); }
            if (obj.stat_MAT !== undefined) { this.stat_MAT(obj.stat_MAT); }
            if (obj.stat_MDF !== undefined) { this.stat_MDF(obj.stat_MDF); }
            if (obj.stat_STR !== undefined) { this.stat_STR(obj.stat_STR); }
            if (obj.stat_INT !== undefined) { this.stat_INT(obj.stat_INT); }
            if (obj.stat_VIT !== undefined) { this.stat_VIT(obj.stat_VIT); }
            if (obj.stat_atk_CRT !== undefined) { this.stat_atk_CRT(obj.stat_CRT); }
            if (obj.stat_atk_KNO !== undefined) { this.stat_atk_KNO(obj.stat_atk_KNO); }
            if (obj.stat_atk_KNOTM !== undefined) { this.stat_atk_KNOTM(obj.stat_atk_KNOTM); }
            if (obj.stat_atk_STN !== undefined) { this.stat_atk_STN(obj.stat_STN); }
            if (obj.stat_atk_PSN !== undefined) { this.stat_atk_PSN(obj.stat_PSN); }
            if (obj.stat_atk_SEA !== undefined) { this.stat_atk_SEA(obj.stat_SEA); }
            if (obj.stat_atk_PAR !== undefined) { this.stat_atk_PAR(obj.stat_PAR); }
            if (obj.stat_atk_SLP !== undefined) { this.stat_atk_SLP(obj.stat_SLP); }
            if (obj.stat_atk_FTG !== undefined) { this.stat_atk_FTG(obj.stat_FTG); }
            if (obj.stat_atk_SCK !== undefined) { this.stat_atk_SCK(obj.stat_SCK); }
            if (obj.stat_atk_FNT !== undefined) { this.stat_atk_FNT(obj.stat_FNT); }
            if (obj.stat_atk_DRN !== undefined) { this.stat_atk_DRN(obj.stat_DRN); }
            if (obj.stat_def_ele_FIRE !== undefined) { this.stat_def_ele_FIRE(obj.stat_def_ele_FIRE); }
            if (obj.stat_def_ele_WATER !== undefined) { this.stat_def_ele_WATER(obj.stat_def_ele_WATER); }
            if (obj.stat_def_ele_EARTH !== undefined) { this.stat_def_ele_EARTH(obj.stat_def_ele_EARTH); }
            if (obj.stat_def_ele_WIND !== undefined) { this.stat_def_ele_WIND(obj.stat_def_ele_WIND); }
            if (obj.stat_def_ele_LIGHT !== undefined) { this.stat_def_ele_LIGHT(obj.stat_def_ele_LIGHT); }
            if (obj.stat_def_ele_DARK !== undefined) { this.stat_def_ele_DARK(obj.stat_def_ele_DARK); }
            if (obj.stat_def_ele_LOVE !== undefined) { this.stat_def_ele_LOVE(obj.stat_def_ele_LOVE); }
            if (obj.stat_def_ele_VOID !== undefined) { this.stat_def_ele_VOID(obj.stat_def_ele_VOID); }
            if (obj.stat_def_CRT !== undefined) { this.stat_def_CRT(obj.stat_CRT); }
            if (obj.stat_def_KNO !== undefined) { this.stat_def_KNO(obj.stat_def_KNO); }
            if (obj.stat_def_KNOTM !== undefined) { this.stat_def_KNOTM(obj.stat_def_KNOTM); }
            if (obj.stat_def_STN !== undefined) { this.stat_def_STN(obj.stat_STN); }
            if (obj.stat_def_PSN !== undefined) { this.stat_def_PSN(obj.stat_PSN); }
            if (obj.stat_def_SEA !== undefined) { this.stat_def_SEA(obj.stat_SEA); }
            if (obj.stat_def_PAR !== undefined) { this.stat_def_PAR(obj.stat_PAR); }
            if (obj.stat_def_SLP !== undefined) { this.stat_def_SLP(obj.stat_SLP); }
            if (obj.stat_def_FTG !== undefined) { this.stat_def_FTG(obj.stat_FTG); }
            if (obj.stat_def_SCK !== undefined) { this.stat_def_SCK(obj.stat_SCK); }
            if (obj.stat_def_FNT !== undefined) { this.stat_def_FNT(obj.stat_FNT); }
            if (obj.stat_def_DRN !== undefined) { this.stat_def_DRN(obj.stat_DRN); }
            if (obj.stat_chargespeed !== undefined) { this.stat_chargespeed(obj.stat_chargespeed); }
            if (obj.stat_attacklength !== undefined) { this.stat_attacklength(obj.stat_attacklength); }
        }
    }

}
export = RF5StatVector;
