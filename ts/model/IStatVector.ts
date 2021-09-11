import ko = require('knockout');

interface IStatVector {

    readonly id:                ko.Observable<number>;
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

}
export = IStatVector;