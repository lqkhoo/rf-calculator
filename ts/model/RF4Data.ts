import _ = require('lodash');
import _RAWDATA = require('../rf4-rawdata');

// All-static class facilitating lookups.
class RF4Data {

    static readonly Item_ids:               object = RF4Data.ArrayToObject(_RAWDATA.item_ids);
    static readonly Category_ids:           object = RF4Data.ArrayToObject(_RAWDATA.category_ids);
    static readonly Character_ids:          object = RF4Data.ArrayToObject(_RAWDATA.character_ids);
    static readonly Is_eq_2hsword:          object = RF4Data.ArrayToObject(_RAWDATA.is_eq_2hsword);
    static readonly Is_eq_accessory:        object = RF4Data.ArrayToObject(_RAWDATA.is_eq_accessory);
    static readonly Is_eq_armor:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_armor);
    static readonly Is_eq_axe:              object = RF4Data.ArrayToObject(_RAWDATA.is_eq_axe);
    static readonly Is_eq_dualblades:       object = RF4Data.ArrayToObject(_RAWDATA.is_eq_dualblades);
    static readonly Is_eq_farm_axe:         object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_axe);
    static readonly Is_eq_farm_fishingpole: object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_fishingpole);
    static readonly Is_eq_farm_hammer:      object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_hammer);
    static readonly Is_eq_farm_hoe:         object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_hoe);
    static readonly Is_eq_farm_sickle:      object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_sickle);
    static readonly Is_eq_farm_waterpot:    object = RF4Data.ArrayToObject(_RAWDATA.is_eq_farm_waterpot);
    static readonly Is_eq_fists:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_fists);
    static readonly Is_eq_hammer:           object = RF4Data.ArrayToObject(_RAWDATA.is_eq_hammer);
    static readonly Is_eq_headgear:         object = RF4Data.ArrayToObject(_RAWDATA.is_eq_headgear);
    static readonly Is_eq_shield:           object = RF4Data.ArrayToObject(_RAWDATA.is_eq_shield);
    static readonly Is_eq_shoes:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_shoes);
    static readonly Is_eq_spear:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_spear);
    static readonly Is_eq_staff:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_staff);
    static readonly Is_eq_sword:            object = RF4Data.ArrayToObject(_RAWDATA.is_eq_sword);
    static readonly Is_eq_weapon:           object = RF4Data.ArrayToObject(_RAWDATA.is_eq_weapon);
    static readonly Is_equipment:           object = RF4Data.ArrayToObject(_RAWDATA.is_equipment);
    static readonly Is_mat_2foldsteel:      object = RF4Data.ArrayToObject(_RAWDATA.is_mat_2foldsteel);
    static readonly Is_mat_10foldsteel:     object = RF4Data.ArrayToObject(_RAWDATA.is_mat_10foldsteel);
    static readonly Is_mat_clawsandfangs:   object = RF4Data.ArrayToObject(_RAWDATA.is_mat_clawsandfangs);
    static readonly Is_mat_clothsandskins:  object = RF4Data.ArrayToObject(_RAWDATA.is_mat_clothsandskins);
    static readonly Is_mat_core:            object = RF4Data.ArrayToObject(_RAWDATA.is_mat_core);
    static readonly Is_mat_crystals:        object = RF4Data.ArrayToObject(_RAWDATA.is_mat_crystals);
    static readonly Is_mat_elecrystals:     object = RF4Data.ArrayToObject(_RAWDATA.is_mat_elecrystals);
    static readonly Is_mat_feathers:        object = RF4Data.ArrayToObject(_RAWDATA.is_mat_feathers);
    static readonly Is_mat_furs:            object = RF4Data.ArrayToObject(_RAWDATA.is_mat_furs);
    static readonly Is_mat_jewels:          object = RF4Data.ArrayToObject(_RAWDATA.is_mat_jewels);
    static readonly Is_mat_lightore:        object = RF4Data.ArrayToObject(_RAWDATA.is_mat_lightore);
    static readonly Is_mat_liquids:         object = RF4Data.ArrayToObject(_RAWDATA.is_mat_liquids);
    static readonly Is_mat_minerals:        object = RF4Data.ArrayToObject(_RAWDATA.is_mat_minerals);
    static readonly Is_mat_objectx:         object = RF4Data.ArrayToObject(_RAWDATA.is_mat_objectx);
    static readonly Is_mat_powdersandspores:object = RF4Data.ArrayToObject(_RAWDATA.is_mat_powdersandspores);
    static readonly Is_mat_scales:          object = RF4Data.ArrayToObject(_RAWDATA.is_mat_scales);
    static readonly Is_mat_shards:          object = RF4Data.ArrayToObject(_RAWDATA.is_mat_shards);
    static readonly Is_mat_shellsandbones:  object = RF4Data.ArrayToObject(_RAWDATA.is_mat_shellsandbones);
    static readonly Is_mat_sticksandstems:  object = RF4Data.ArrayToObject(_RAWDATA.is_mat_sticksandstems);
    static readonly Is_mat_stones:          object = RF4Data.ArrayToObject(_RAWDATA.is_mat_stones);
    static readonly Is_mat_strings:         object = RF4Data.ArrayToObject(_RAWDATA.is_mat_strings);
    static readonly Is_mat_truescale:       object = RF4Data.ArrayToObject(_RAWDATA.is_mat_truescale); // Scales that provide the shield bonus
    static readonly Has_effect:             object = RF4Data.ArrayToObject(_RAWDATA.has_effect);
    static readonly Categories:             object = _RAWDATA.categories;
    static readonly Items:                  object = _RAWDATA.items;
    static readonly BaseItems:              object = _RAWDATA.base_items;
    static readonly Characters:             object = _RAWDATA.characters;
    static readonly Recipes:                object = _RAWDATA.recipes;
    static readonly Magics:                 object = _RAWDATA.magics;
    static readonly Effects:                object = _RAWDATA.effects;


    // Construct reverse type maps
    static readonly EquipmentTypeMap:       Record<string, EquipmentType|undefined> = (function() {
        var map: Record<string, EquipmentType> = {};
        _.forOwn(RF4Data.Is_eq_weapon,     (_value: any, key: any) => { map[key] = "weapon" });
        _.forOwn(RF4Data.Is_eq_shield,     (_value: any, key: any) => { map[key] = "shield" });
        _.forOwn(RF4Data.Is_eq_headgear,   (_value: any, key: any) => { map[key] = "headgear" });
        _.forOwn(RF4Data.Is_eq_armor,      (_value: any, key: any) => { map[key] = "armor" });
        _.forOwn(RF4Data.Is_eq_shoes,      (_value: any, key: any) => { map[key] = "boots" });
        _.forOwn(RF4Data.Is_eq_accessory,  (_value: any, key: any) => { map[key] = "accessory" });
        return map;
    }());

    static readonly WeaponTypeMap:         Record<string, WeaponType|undefined> = (function() {
        var map: Record<string, WeaponType> = {};
        _.forOwn(RF4Data.Is_eq_2hsword,        (_value: any, key: any) => { map[key] = "2hsword" });
        _.forOwn(RF4Data.Is_eq_axe,            (_value: any, key: any) => { map[key] = "axe" });
        _.forOwn(RF4Data.Is_eq_dualblades,     (_value: any, key: any) => { map[key] = "dualblades" });
        _.forOwn(RF4Data.Is_eq_hammer,         (_value: any, key: any) => { map[key] = "hammer" });
        _.forOwn(RF4Data.Is_eq_spear,          (_value: any, key: any) => { map[key] = "spear" });
        _.forOwn(RF4Data.Is_eq_staff,          (_value: any, key: any) => { map[key] = "staff" });
        _.forOwn(RF4Data.Is_eq_sword,          (_value: any, key: any) => { map[key] = "sword" });
        _.forOwn(RF4Data.Is_eq_farm_axe,       (_value: any, key: any) => { map[key] = "farm_axe" });
        _.forOwn(RF4Data.Is_eq_farm_fishingpole, (_value: any, key: any) => { map[key] = "farm_fishingpole" });
        _.forOwn(RF4Data.Is_eq_farm_hammer,    (_value: any, key: any) => { map[key] = "farm_hammer" });
        _.forOwn(RF4Data.Is_eq_farm_hoe,       (_value: any, key: any) => { map[key] = "farm_hoe" });
        _.forOwn(RF4Data.Is_eq_farm_sickle,    (_value: any, key: any) => { map[key] = "farm_sickle" });
        _.forOwn(RF4Data.Is_eq_farm_waterpot,  (_value: any, key: any) => { map[key] = "farm_waterpot" });
        return map;
    }());

    // Query methods
    public static IsEquipment(id: number): boolean { return RF4Data.Is_equipment.hasOwnProperty(id); }
    public static IsWeapon(id: number): boolean { return RF4Data.Is_eq_weapon.hasOwnProperty(id); }
    public static IsShield(id: number): boolean { return RF4Data.Is_eq_shield.hasOwnProperty(id); }
    public static IsHeadgear(id: number): boolean { return RF4Data.Is_eq_headgear.hasOwnProperty(id); }
    public static IsArmor(id: number): boolean { return RF4Data.Is_eq_armor.hasOwnProperty(id); }
    public static IsBoots(id: number): boolean { return RF4Data.Is_eq_shoes.hasOwnProperty(id); }
    public static IsAccessory(id: number): boolean { return RF4Data.Is_eq_accessory.hasOwnProperty(id); }

    public static Is2hSword(id: number): boolean { return RF4Data.Is_eq_2hsword.hasOwnProperty(id); }
    public static IsAxe(id: number): boolean { return RF4Data.Is_eq_axe.hasOwnProperty(id); }
    public static IsDualblades(id: number): boolean { return RF4Data.Is_eq_dualblades.hasOwnProperty(id); }
    public static IsFists(id: number): boolean { return RF4Data.Is_eq_fists.hasOwnProperty(id); }
    public static IsHammer(id: number): boolean { return RF4Data.Is_eq_hammer.hasOwnProperty(id); }
    public static IsSpear(id: number): boolean { return RF4Data.Is_eq_spear.hasOwnProperty(id); }
    public static IsStaff(id: number): boolean { return RF4Data.Is_eq_staff.hasOwnProperty(id); }
    public static IsSword(id: number): boolean { return RF4Data.Is_eq_sword.hasOwnProperty(id); }
    public static IsFarmAxe(id: number): boolean { return RF4Data.Is_eq_farm_axe.hasOwnProperty(id); }
    public static IsFarmFishingPole(id: number): boolean { return RF4Data.Is_eq_farm_fishingpole.hasOwnProperty(id); }
    public static IsFarmHammer(id: number): boolean { return RF4Data.Is_eq_farm_hammer.hasOwnProperty(id); }
    public static IsFarmHoe(id: number): boolean { return RF4Data.Is_eq_farm_hoe.hasOwnProperty(id); }
    public static IsFarmSickle(id: number): boolean { return RF4Data.Is_eq_farm_sickle.hasOwnProperty(id); }
    public static IsFarmWaterpot(id: number): boolean { return RF4Data.Is_eq_farm_waterpot.hasOwnProperty(id); }

    public static IsClawsAndFangs(id: number): boolean { return RF4Data.Is_mat_clawsandfangs.hasOwnProperty(id); }
    public static IsClothsAndSkins(id: number): boolean { return RF4Data.Is_mat_clothsandskins.hasOwnProperty(id); }
    public static IsCrystals(id: number): boolean { return RF4Data.Is_mat_crystals.hasOwnProperty(id); }
    public static IsFeathers(id: number): boolean { return RF4Data.Is_mat_feathers.hasOwnProperty(id); }
    public static IsFurs(id: number): boolean { return RF4Data.Is_mat_furs.hasOwnProperty(id); }
    public static IsJewels(id: number): boolean { return RF4Data.Is_mat_jewels.hasOwnProperty(id); }
    public static IsLiquids(id: number): boolean { return RF4Data.Is_mat_liquids.hasOwnProperty(id); }
    public static IsMinerals(id: number): boolean { return RF4Data.Is_mat_minerals.hasOwnProperty(id); }
    public static IsPowdersAndSpores(id: number): boolean { return RF4Data.Is_mat_powdersandspores.hasOwnProperty(id); }
    public static IsScales(id: number): boolean { return RF4Data.Is_mat_scales.hasOwnProperty(id); }
    public static IsShards(id: number): boolean { return RF4Data.Is_mat_shards.hasOwnProperty(id); }
    public static IsShellsAndBones(id: number): boolean { return RF4Data.Is_mat_shellsandbones.hasOwnProperty(id); }
    public static IsSticksAndStems(id: number): boolean { return RF4Data.Is_mat_sticksandstems.hasOwnProperty(id); }
    public static IsStones(id: number): boolean { return RF4Data.Is_mat_stones.hasOwnProperty(id); }
    public static IsStrings(id: number): boolean { return RF4Data.Is_mat_strings.hasOwnProperty(id); }

    public static HasEffect(id: number): boolean {
        return RF4Data.Has_effect.hasOwnProperty(id);
    }

    public static IsEleCrystal(id: number): boolean {
        return RF4Data.Is_mat_elecrystals.hasOwnProperty(id);
    }
    public static IsObjectX(id: number): boolean {
        return RF4Data.Is_mat_objectx.hasOwnProperty(id);
    }
    public static Is2foldSteel(id: number): boolean {
        return RF4Data.Is_mat_2foldsteel.hasOwnProperty(id);
    }
    public static Is10foldSteel(id: number): boolean {
        return RF4Data.Is_mat_10foldsteel.hasOwnProperty(id);
    }
    public static IsLightOre(id: number): boolean {
        return RF4Data.Is_mat_lightore.hasOwnProperty(id);
    }
    public static IsTrueScale(id: number): boolean {
        return RF4Data.Is_mat_truescale.hasOwnProperty(id);
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
    public static IsShadeStone(id: number): boolean {
        return (id === 2177);
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
    public static IsGeneralsHoe(id: number): boolean {
        return (id === 905);
    }
    public static IsGeneralsHat(id: number): boolean {
        return (id === 1130);
    }
    public static IsGeneralsRobe(id: number): boolean {
        return (id === 1219);
    }
    public static IsGeneralsShield(id: number): boolean {
        return (id === 1018);
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
export = RF4Data;