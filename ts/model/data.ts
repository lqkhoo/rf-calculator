import _ = require('lodash');
import _RAWDATA = require('../rawdata');

// All-static class facilitating lookups.
class Data {

    static readonly Item_ids:               object = Data.ArrayToObject(_RAWDATA.item_ids);
    static readonly Category_ids:           object = Data.ArrayToObject(_RAWDATA.category_ids);
    static readonly Character_ids:          object = Data.ArrayToObject(_RAWDATA.character_ids);
    static readonly Is_eq_2hsword:          object = Data.ArrayToObject(_RAWDATA.is_eq_2hsword);
    static readonly Is_eq_accessory:        object = Data.ArrayToObject(_RAWDATA.is_eq_accessory);
    static readonly Is_eq_armor:            object = Data.ArrayToObject(_RAWDATA.is_eq_armor);
    static readonly Is_eq_axe:              object = Data.ArrayToObject(_RAWDATA.is_eq_axe);
    static readonly Is_eq_dualblades:       object = Data.ArrayToObject(_RAWDATA.is_eq_dualblades);
    static readonly Is_eq_farm_axe:         object = Data.ArrayToObject(_RAWDATA.is_eq_farm_axe);
    static readonly Is_eq_farm_fishingpole: object = Data.ArrayToObject(_RAWDATA.is_eq_farm_fishingpole);
    static readonly Is_eq_farm_hammer:      object = Data.ArrayToObject(_RAWDATA.is_eq_farm_hammer);
    static readonly Is_eq_farm_hoe:         object = Data.ArrayToObject(_RAWDATA.is_eq_farm_hoe);
    static readonly Is_eq_farm_sickle:      object = Data.ArrayToObject(_RAWDATA.is_eq_farm_sickle);
    static readonly Is_eq_farm_waterpot:    object = Data.ArrayToObject(_RAWDATA.is_eq_farm_waterpot);
    static readonly Is_eq_fists:            object = Data.ArrayToObject(_RAWDATA.is_eq_fists);
    static readonly Is_eq_hammer:           object = Data.ArrayToObject(_RAWDATA.is_eq_hammer);
    static readonly Is_eq_headgear:         object = Data.ArrayToObject(_RAWDATA.is_eq_headgear);
    static readonly Is_eq_shield:           object = Data.ArrayToObject(_RAWDATA.is_eq_shield);
    static readonly Is_eq_shoes:            object = Data.ArrayToObject(_RAWDATA.is_eq_shoes);
    static readonly Is_eq_spear:            object = Data.ArrayToObject(_RAWDATA.is_eq_spear);
    static readonly Is_eq_staff:            object = Data.ArrayToObject(_RAWDATA.is_eq_staff);
    static readonly Is_eq_sword:            object = Data.ArrayToObject(_RAWDATA.is_eq_sword);
    static readonly Is_eq_weapon:           object = Data.ArrayToObject(_RAWDATA.is_eq_weapon);
    static readonly Is_equipment:           object = Data.ArrayToObject(_RAWDATA.is_equipment);
    static readonly Is_mat_2foldsteel:      object = Data.ArrayToObject(_RAWDATA.is_mat_2foldsteel);
    static readonly Is_mat_10foldsteel:     object = Data.ArrayToObject(_RAWDATA.is_mat_10foldsteel);
    static readonly Is_mat_clawsandfangs:   object = Data.ArrayToObject(_RAWDATA.is_mat_clawsandfangs);
    static readonly Is_mat_clothsandskins:  object = Data.ArrayToObject(_RAWDATA.is_mat_clothsandskins);
    static readonly Is_mat_core:            object = Data.ArrayToObject(_RAWDATA.is_mat_core);
    static readonly Is_mat_crystals:        object = Data.ArrayToObject(_RAWDATA.is_mat_crystals);
    static readonly Is_mat_feathers:        object = Data.ArrayToObject(_RAWDATA.is_mat_feathers);
    static readonly Is_mat_furs:            object = Data.ArrayToObject(_RAWDATA.is_mat_furs);
    static readonly Is_mat_jewels:          object = Data.ArrayToObject(_RAWDATA.is_mat_jewels);
    static readonly Is_mat_lightore:        object = Data.ArrayToObject(_RAWDATA.is_mat_lightore);
    static readonly Is_mat_liquids:         object = Data.ArrayToObject(_RAWDATA.is_mat_liquids);
    static readonly Is_mat_minerals:        object = Data.ArrayToObject(_RAWDATA.is_mat_minerals);
    static readonly Is_mat_objectx:         object = Data.ArrayToObject(_RAWDATA.is_mat_objectx);
    static readonly Is_mat_powdersandspores:object = Data.ArrayToObject(_RAWDATA.is_mat_powdersandspores);
    static readonly Is_mat_scales:          object = Data.ArrayToObject(_RAWDATA.is_mat_scales);
    static readonly Is_mat_shards:          object = Data.ArrayToObject(_RAWDATA.is_mat_shards);
    static readonly Is_mat_shellsandbones:  object = Data.ArrayToObject(_RAWDATA.is_mat_shellsandbones);
    static readonly Is_mat_sticksandstems:  object = Data.ArrayToObject(_RAWDATA.is_mat_sticksandstems);
    static readonly Is_mat_stones:          object = Data.ArrayToObject(_RAWDATA.is_mat_stones);
    static readonly Is_mat_strings:         object = Data.ArrayToObject(_RAWDATA.is_mat_strings);
    static readonly Is_mat_truescale:       object = Data.ArrayToObject(_RAWDATA.is_mat_truescale); // Scales that provide the shield bonus
    static readonly Categories:             object = _RAWDATA.categories;
    static readonly Items:                  object = _RAWDATA.items;
    static readonly BaseItems:              object = _RAWDATA.base_items;
    static readonly Characters:             object = _RAWDATA.characters;
    static readonly Recipes:                object = _RAWDATA.recipes;


    // Construct reverse type maps
    static readonly EquipmentTypeMap:       Record<string, EquipmentType|undefined> = (function() {
        var map: Record<string, EquipmentType> = {};
        _.forOwn(Data.Is_eq_weapon,     (_value: any, key: any) => { map[key] = "weapon" });
        _.forOwn(Data.Is_eq_shield,     (_value: any, key: any) => { map[key] = "shield" });
        _.forOwn(Data.Is_eq_headgear,   (_value: any, key: any) => { map[key] = "headgear" });
        _.forOwn(Data.Is_eq_armor,      (_value: any, key: any) => { map[key] = "armor" });
        _.forOwn(Data.Is_eq_shoes,      (_value: any, key: any) => { map[key] = "boots" });
        _.forOwn(Data.Is_eq_accessory,  (_value: any, key: any) => { map[key] = "accessory" });
        return map;
    }());

    static readonly WeaponTypeMap:         Record<string, WeaponType|undefined> = (function() {
        var map: Record<string, WeaponType> = {};
        _.forOwn(Data.Is_eq_2hsword,        (_value: any, key: any) => { map[key] = "2hsword" });
        _.forOwn(Data.Is_eq_axe,            (_value: any, key: any) => { map[key] = "axe" });
        _.forOwn(Data.Is_eq_dualblades,     (_value: any, key: any) => { map[key] = "dualblades" });
        _.forOwn(Data.Is_eq_hammer,         (_value: any, key: any) => { map[key] = "hammer" });
        _.forOwn(Data.Is_eq_spear,          (_value: any, key: any) => { map[key] = "spear" });
        _.forOwn(Data.Is_eq_staff,          (_value: any, key: any) => { map[key] = "staff" });
        _.forOwn(Data.Is_eq_sword,          (_value: any, key: any) => { map[key] = "sword" });
        _.forOwn(Data.Is_eq_farm_axe,       (_value: any, key: any) => { map[key] = "farm_axe" });
        _.forOwn(Data.Is_eq_farm_fishingpole, (_value: any, key: any) => { map[key] = "farm_fishingpole" });
        _.forOwn(Data.Is_eq_farm_hammer,    (_value: any, key: any) => { map[key] = "farm_hammer" });
        _.forOwn(Data.Is_eq_farm_hoe,       (_value: any, key: any) => { map[key] = "farm_hoe" });
        _.forOwn(Data.Is_eq_farm_sickle,    (_value: any, key: any) => { map[key] = "farm_sickle" });
        _.forOwn(Data.Is_eq_farm_waterpot,  (_value: any, key: any) => { map[key] = "farm_waterpot" });
        return map;
    }());

    // Query methods
    public static IsEquipment(id: number): boolean {
        return Data.Is_equipment.hasOwnProperty(id);
    }
    public static IsWeapon(id: number): boolean {
        return Data.Is_eq_weapon.hasOwnProperty(id);
    }
    public static IsObjectX(id: number): boolean {
        return Data.Is_mat_objectx.hasOwnProperty(id);
    }
    public static Is2foldSteel(id: number): boolean {
        return Data.Is_mat_2foldsteel.hasOwnProperty(id);
    }
    public static Is10foldSteel(id: number): boolean {
        return Data.Is_mat_10foldsteel.hasOwnProperty(id);
    }
    public static IsLightOre(id: number): boolean {
        return Data.Is_mat_lightore.hasOwnProperty(id);
    }
    public static IsScale(id: number): boolean {
        return Data.Is_mat_scales.hasOwnProperty(id);
    }
    public static IsTrueScale(id: number): boolean {
        return Data.Is_mat_truescale.hasOwnProperty(id);
    }
    public static IsClover(id: number): boolean {
        return (id === 168);
    }
    public static IsGiantClover(id: number): boolean {
        return (id === 169);
    }
    public static IsRareCan(id: number): boolean {
        return (id === 1902);
    }
    public static IsScrapMetalPlus(id: number): boolean {
        return (id === 2153);
    }
    public static IsGreenCore(id: number): boolean {
        return (id === 2166);
    }
    public static IsRedCore(id: number): boolean {
        return (id === 2167);
    }
    public static IsYellowCore(id: number): boolean {
        return (id === 2168);
    }
    public static IsBlueCore(id: number): boolean {
        return (id === 2169);
    }


    protected static ArrayToObject(arr: number[]): object {
        var obj: any = {};
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
        return obj;
    }

    protected static ObjectToObject(sourceObj: any): object {
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