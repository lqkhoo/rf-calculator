import _RAWDATA = require('../rawdata');

class Data {

    static readonly Item_ids:               object = Data.ArrayToObject2(_RAWDATA.item_ids);
    static readonly Category_ids:           object = Data.ArrayToObject2(_RAWDATA.category_ids);
    static readonly Character_ids:          object = Data.ArrayToObject2(_RAWDATA.character_ids);
    static readonly Is_eq_2hsword:          object = Data.ArrayToObject2(_RAWDATA.is_eq_2hsword);
    static readonly Is_eq_accessory:        object = Data.ArrayToObject2(_RAWDATA.is_eq_accessory);
    static readonly Is_eq_armor:            object = Data.ArrayToObject2(_RAWDATA.is_eq_armor);
    static readonly Is_eq_axe:              object = Data.ArrayToObject2(_RAWDATA.is_eq_axe);
    static readonly Is_eq_dualblades:       object = Data.ArrayToObject2(_RAWDATA.is_eq_dualblades);
    static readonly Is_eq_farm_axe:         object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_axe);
    static readonly Is_eq_farm_fishingpole: object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_fishingpole);
    static readonly Is_eq_farm_hammer:      object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_hammer);
    static readonly Is_eq_farm_hoe:         object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_hoe);
    static readonly Is_eq_farm_sickle:      object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_sickle);
    static readonly Is_eq_farm_waterpot:    object = Data.ArrayToObject2(_RAWDATA.is_eq_farm_waterpot);
    static readonly Is_eq_fists:            object = Data.ArrayToObject2(_RAWDATA.is_eq_fists);
    static readonly Is_eq_hammer:           object = Data.ArrayToObject2(_RAWDATA.is_eq_hammer);
    static readonly Is_eq_headgear:         object = Data.ArrayToObject2(_RAWDATA.is_eq_headgear);
    static readonly Is_eq_shield:           object = Data.ArrayToObject2(_RAWDATA.is_eq_shield);
    static readonly Is_eq_shoes:            object = Data.ArrayToObject2(_RAWDATA.is_eq_shoes);
    static readonly Is_eq_spear:            object = Data.ArrayToObject2(_RAWDATA.is_eq_spear);
    static readonly Is_eq_staff:            object = Data.ArrayToObject2(_RAWDATA.is_eq_staff);
    static readonly Is_eq_sword:            object = Data.ArrayToObject2(_RAWDATA.is_eq_sword);
    static readonly Is_eq_weapon:           object = Data.ArrayToObject2(_RAWDATA.is_eq_weapon);
    static readonly Is_mat_2foldsteel:      object = Data.ArrayToObject2(_RAWDATA.is_mat_2foldsteel);
    static readonly Is_mat_10foldsteel:     object = Data.ArrayToObject2(_RAWDATA.is_mat_10foldsteel);
    static readonly Is_mat_clawsandfangs:   object = Data.ArrayToObject2(_RAWDATA.is_mat_clawsandfangs);
    static readonly Is_mat_clothsandskins:  object = Data.ArrayToObject2(_RAWDATA.is_mat_clothsandskins);
    static readonly Is_mat_core:            object = Data.ArrayToObject2(_RAWDATA.is_mat_core);
    static readonly Is_mat_crystals:        object = Data.ArrayToObject2(_RAWDATA.is_mat_crystals);
    static readonly Is_mat_feathers:        object = Data.ArrayToObject2(_RAWDATA.is_mat_feathers);
    static readonly Is_mat_furs:            object = Data.ArrayToObject2(_RAWDATA.is_mat_furs);
    static readonly Is_mat_jewels:          object = Data.ArrayToObject2(_RAWDATA.is_mat_jewels);
    static readonly Is_mat_lightore:        object = Data.ArrayToObject2(_RAWDATA.is_mat_lightore);
    static readonly Is_mat_liquids:         object = Data.ArrayToObject2(_RAWDATA.is_mat_liquids);
    static readonly Is_mat_minerals:        object = Data.ArrayToObject2(_RAWDATA.is_mat_minerals);
    static readonly Is_mat_objectx:         object = Data.ArrayToObject2(_RAWDATA.is_mat_objectx);
    static readonly Is_mat_powdersandspores:object = Data.ArrayToObject2(_RAWDATA.is_mat_powdersandspores);
    static readonly Is_mat_scales:          object = Data.ArrayToObject2(_RAWDATA.is_mat_scales);
    static readonly Is_mat_shards:          object = Data.ArrayToObject2(_RAWDATA.is_mat_shards);
    static readonly Is_mat_shellsandbones:  object = Data.ArrayToObject2(_RAWDATA.is_mat_shellsandbones);
    static readonly Is_mat_sticksandstems:  object = Data.ArrayToObject2(_RAWDATA.is_mat_sticksandstems);
    static readonly Is_mat_stones:          object = Data.ArrayToObject2(_RAWDATA.is_mat_stones);
    static readonly Is_mat_strings:         object = Data.ArrayToObject2(_RAWDATA.is_mat_strings);
    static readonly Categories:             object = Data.ObjectToObject2(_RAWDATA.categories);
    static readonly Items:                  object = Data.ObjectToObject2(_RAWDATA.items);
    static readonly BaseItems:              object = Data.ObjectToObject2(_RAWDATA.base_items);
    static readonly Characters:             object = Data.ObjectToObject2(_RAWDATA.characters);
    static readonly Recipes:                object = Data.ObjectToObject2(_RAWDATA.recipes);

    public static ArrayToObject(obj: any, arr: number[]): void {
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
    }

    public static ObjectToObject(obj: any, sourceObj: any): void {
        for (var prop in sourceObj) {
            if(sourceObj.hasOwnProperty(prop)) {
                obj[prop] = sourceObj[prop];
            }
        }
    }

    public static ArrayToObject2(arr: number[]): object {
        var obj: any = {};
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
        return obj;
    }

    public static ObjectToObject2(sourceObj: any): object {
        var obj: any = {};
        for (var prop in sourceObj) {
            if(sourceObj.hasOwnProperty(prop)) {
                obj[prop] = sourceObj[prop];
            }
        }
        return obj;
    }

}
export = Data;