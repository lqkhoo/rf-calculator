import ko = require('knockout');
import IData = require('./IData');

interface IStatVector {

    Context:           ko.PureComputed<any>;

    Data: IData;
    id:                ko.Observable<number>|ko.PureComputed<number>;
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

    GetStatByName(name: StatVectorKey): number | string;

}
export = IStatVector;