import _ = require('lodash');
import _RAWDATA = require('../rf5-rawdata');
import RF5AbstractData = require('./RF5AbstractData');

// All-static class facilitating lookups.
class RF5Data extends RF5AbstractData {

    static override readonly Item_ids:               object = RF5Data.ArrayToObject(_RAWDATA.item_ids);
    static override readonly Category_ids:           object = RF5Data.ArrayToObject(_RAWDATA.category_ids);
    static override readonly Character_ids:          object = RF5Data.ArrayToObject(_RAWDATA.character_ids);
    static override readonly Is_eq_2hsword:          object = RF5Data.ArrayToObject(_RAWDATA.is_eq_2hsword);
    static override readonly Is_eq_accessory:        object = RF5Data.ArrayToObject(_RAWDATA.is_eq_accessory);
    static override readonly Is_eq_armor:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_armor);
    static override readonly Is_eq_axe:              object = RF5Data.ArrayToObject(_RAWDATA.is_eq_axe);
    static override readonly Is_eq_dualblades:       object = RF5Data.ArrayToObject(_RAWDATA.is_eq_dualblades);
    static override readonly Is_eq_farm_axe:         object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_axe);
    static override readonly Is_eq_farm_fishingpole: object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_fishingpole);
    static override readonly Is_eq_farm_hammer:      object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_hammer);
    static override readonly Is_eq_farm_hoe:         object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_hoe);
    static override readonly Is_eq_farm_sickle:      object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_sickle);
    static override readonly Is_eq_farm_waterpot:    object = RF5Data.ArrayToObject(_RAWDATA.is_eq_farm_waterpot);
    static override readonly Is_eq_fists:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_fists);
    static override readonly Is_eq_hammer:           object = RF5Data.ArrayToObject(_RAWDATA.is_eq_hammer);
    static override readonly Is_eq_headgear:         object = RF5Data.ArrayToObject(_RAWDATA.is_eq_headgear);
    static override readonly Is_eq_shield:           object = RF5Data.ArrayToObject(_RAWDATA.is_eq_shield);
    static override readonly Is_eq_shoes:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_shoes);
    static override readonly Is_eq_spear:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_spear);
    static override readonly Is_eq_staff:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_staff);
    static override readonly Is_eq_sword:            object = RF5Data.ArrayToObject(_RAWDATA.is_eq_sword);
    static override readonly Is_eq_weapon:           object = RF5Data.ArrayToObject(_RAWDATA.is_eq_weapon);
    static override readonly Is_equipment:           object = RF5Data.ArrayToObject(_RAWDATA.is_equipment);
    static override readonly Is_mat_2foldsteel:      object = RF5Data.ArrayToObject(_RAWDATA.is_mat_2foldsteel);
    static override readonly Is_mat_10foldsteel:     object = RF5Data.ArrayToObject(_RAWDATA.is_mat_10foldsteel);
    static override readonly Is_mat_clawsandfangs:   object = RF5Data.ArrayToObject(_RAWDATA.is_mat_clawsandfangs);
    static override readonly Is_mat_clothsandskins:  object = RF5Data.ArrayToObject(_RAWDATA.is_mat_clothsandskins);
    static override readonly Is_mat_core:            object = RF5Data.ArrayToObject(_RAWDATA.is_mat_core);
    static override readonly Is_mat_crystals:        object = RF5Data.ArrayToObject(_RAWDATA.is_mat_crystals);
    static override readonly Is_mat_elecrystals:     object = RF5Data.ArrayToObject(_RAWDATA.is_mat_elecrystals);
    static override readonly Is_mat_feathers:        object = RF5Data.ArrayToObject(_RAWDATA.is_mat_feathers);
    static override readonly Is_mat_furs:            object = RF5Data.ArrayToObject(_RAWDATA.is_mat_furs);
    static override readonly Is_mat_jewels:          object = RF5Data.ArrayToObject(_RAWDATA.is_mat_jewels);
    static override readonly Is_mat_lightore:        object = RF5Data.ArrayToObject(_RAWDATA.is_mat_lightore);
    static override readonly Is_mat_liquids:         object = RF5Data.ArrayToObject(_RAWDATA.is_mat_liquids);
    static override readonly Is_mat_minerals:        object = RF5Data.ArrayToObject(_RAWDATA.is_mat_minerals);
    static override readonly Is_mat_objectx:         object = RF5Data.ArrayToObject(_RAWDATA.is_mat_objectx);
    static override readonly Is_mat_powdersandspores:object = RF5Data.ArrayToObject(_RAWDATA.is_mat_powdersandspores);
    static override readonly Is_mat_scales:          object = RF5Data.ArrayToObject(_RAWDATA.is_mat_scales);
    static override readonly Is_mat_shards:          object = RF5Data.ArrayToObject(_RAWDATA.is_mat_shards);
    static override readonly Is_mat_shellsandbones:  object = RF5Data.ArrayToObject(_RAWDATA.is_mat_shellsandbones);
    static override readonly Is_mat_sticksandstems:  object = RF5Data.ArrayToObject(_RAWDATA.is_mat_sticksandstems);
    static override readonly Is_mat_stones:          object = RF5Data.ArrayToObject(_RAWDATA.is_mat_stones);
    static override readonly Is_mat_strings:         object = RF5Data.ArrayToObject(_RAWDATA.is_mat_strings);
    static override readonly Is_mat_truescale:       object = RF5Data.ArrayToObject(_RAWDATA.is_mat_truescale); // Scales that provide the shield bonus
    static override readonly Has_effect:             object = RF5Data.ArrayToObject(_RAWDATA.has_effect);
    static override readonly Categories:             object = _RAWDATA.categories;
    static override readonly Items:                  object = _RAWDATA.items;
    static override readonly BaseItems:              object = _RAWDATA.base_items;
    static override readonly Characters:             object = _RAWDATA.characters;
    static override readonly Recipes:                object = _RAWDATA.recipes;
    static override readonly Magics:                 object = _RAWDATA.magics;
    static override readonly Effects:                object = _RAWDATA.effects;


    // Construct reverse type maps
    static override readonly EquipmentTypeMap:       Record<string, EquipmentType|undefined> = (function() {
        var map: Record<string, EquipmentType> = {};
        _.forOwn(RF5Data.Is_eq_weapon,     (_value: any, key: any) => { map[key] = "weapon" });
        _.forOwn(RF5Data.Is_eq_shield,     (_value: any, key: any) => { map[key] = "shield" });
        _.forOwn(RF5Data.Is_eq_headgear,   (_value: any, key: any) => { map[key] = "headgear" });
        _.forOwn(RF5Data.Is_eq_armor,      (_value: any, key: any) => { map[key] = "armor" });
        _.forOwn(RF5Data.Is_eq_shoes,      (_value: any, key: any) => { map[key] = "boots" });
        _.forOwn(RF5Data.Is_eq_accessory,  (_value: any, key: any) => { map[key] = "accessory" });
        return map;
    }());

    static override readonly WeaponTypeMap:         Record<string, WeaponType|undefined> = (function() {
        var map: Record<string, WeaponType> = {};
        _.forOwn(RF5Data.Is_eq_2hsword,        (_value: any, key: any) => { map[key] = "2hsword" });
        _.forOwn(RF5Data.Is_eq_axe,            (_value: any, key: any) => { map[key] = "axe" });
        _.forOwn(RF5Data.Is_eq_dualblades,     (_value: any, key: any) => { map[key] = "dualblades" });
        _.forOwn(RF5Data.Is_eq_hammer,         (_value: any, key: any) => { map[key] = "hammer" });
        _.forOwn(RF5Data.Is_eq_spear,          (_value: any, key: any) => { map[key] = "spear" });
        _.forOwn(RF5Data.Is_eq_staff,          (_value: any, key: any) => { map[key] = "staff" });
        _.forOwn(RF5Data.Is_eq_sword,          (_value: any, key: any) => { map[key] = "sword" });
        _.forOwn(RF5Data.Is_eq_farm_axe,       (_value: any, key: any) => { map[key] = "farm_axe" });
        _.forOwn(RF5Data.Is_eq_farm_fishingpole, (_value: any, key: any) => { map[key] = "farm_fishingpole" });
        _.forOwn(RF5Data.Is_eq_farm_hammer,    (_value: any, key: any) => { map[key] = "farm_hammer" });
        _.forOwn(RF5Data.Is_eq_farm_hoe,       (_value: any, key: any) => { map[key] = "farm_hoe" });
        _.forOwn(RF5Data.Is_eq_farm_sickle,    (_value: any, key: any) => { map[key] = "farm_sickle" });
        _.forOwn(RF5Data.Is_eq_farm_waterpot,  (_value: any, key: any) => { map[key] = "farm_waterpot" });
        return map;
    }());

    // Query methods
    public static override IsEquipment(id: number): boolean { return RF5Data.Is_equipment.hasOwnProperty(id); }
    public static override IsWeapon(id: number): boolean { return RF5Data.Is_eq_weapon.hasOwnProperty(id); }
    public static override IsShield(id: number): boolean { return RF5Data.Is_eq_shield.hasOwnProperty(id); }
    public static override IsHeadgear(id: number): boolean { return RF5Data.Is_eq_headgear.hasOwnProperty(id); }
    public static override IsArmor(id: number): boolean { return RF5Data.Is_eq_armor.hasOwnProperty(id); }
    public static override IsBoots(id: number): boolean { return RF5Data.Is_eq_shoes.hasOwnProperty(id); }
    public static override IsAccessory(id: number): boolean { return RF5Data.Is_eq_accessory.hasOwnProperty(id); }

    public static override Is2hSword(id: number): boolean { return RF5Data.Is_eq_2hsword.hasOwnProperty(id); }
    public static override IsAxe(id: number): boolean { return RF5Data.Is_eq_axe.hasOwnProperty(id); }
    public static override IsDualblades(id: number): boolean { return RF5Data.Is_eq_dualblades.hasOwnProperty(id); }
    public static override IsFists(id: number): boolean { return RF5Data.Is_eq_fists.hasOwnProperty(id); }
    public static override IsHammer(id: number): boolean { return RF5Data.Is_eq_hammer.hasOwnProperty(id); }
    public static override IsSpear(id: number): boolean { return RF5Data.Is_eq_spear.hasOwnProperty(id); }
    public static override IsStaff(id: number): boolean { return RF5Data.Is_eq_staff.hasOwnProperty(id); }
    public static override IsSword(id: number): boolean { return RF5Data.Is_eq_sword.hasOwnProperty(id); }
    public static override IsFarmAxe(id: number): boolean { return RF5Data.Is_eq_farm_axe.hasOwnProperty(id); }
    public static override IsFarmFishingPole(id: number): boolean { return RF5Data.Is_eq_farm_fishingpole.hasOwnProperty(id); }
    public static override IsFarmHammer(id: number): boolean { return RF5Data.Is_eq_farm_hammer.hasOwnProperty(id); }
    public static override IsFarmHoe(id: number): boolean { return RF5Data.Is_eq_farm_hoe.hasOwnProperty(id); }
    public static override IsFarmSickle(id: number): boolean { return RF5Data.Is_eq_farm_sickle.hasOwnProperty(id); }
    public static override IsFarmWaterpot(id: number): boolean { return RF5Data.Is_eq_farm_waterpot.hasOwnProperty(id); }

    public static override IsClawsAndFangs(id: number): boolean { return RF5Data.Is_mat_clawsandfangs.hasOwnProperty(id); }
    public static override IsClothsAndSkins(id: number): boolean { return RF5Data.Is_mat_clothsandskins.hasOwnProperty(id); }
    public static override IsCrystals(id: number): boolean { return RF5Data.Is_mat_crystals.hasOwnProperty(id); }
    public static override IsFeathers(id: number): boolean { return RF5Data.Is_mat_feathers.hasOwnProperty(id); }
    public static override IsFurs(id: number): boolean { return RF5Data.Is_mat_furs.hasOwnProperty(id); }
    public static override IsJewels(id: number): boolean { return RF5Data.Is_mat_jewels.hasOwnProperty(id); }
    public static override IsLiquids(id: number): boolean { return RF5Data.Is_mat_liquids.hasOwnProperty(id); }
    public static override IsMinerals(id: number): boolean { return RF5Data.Is_mat_minerals.hasOwnProperty(id); }
    public static override IsPowdersAndSpores(id: number): boolean { return RF5Data.Is_mat_powdersandspores.hasOwnProperty(id); }
    public static override IsScales(id: number): boolean { return RF5Data.Is_mat_scales.hasOwnProperty(id); }
    public static override IsShards(id: number): boolean { return RF5Data.Is_mat_shards.hasOwnProperty(id); }
    public static override IsShellsAndBones(id: number): boolean { return RF5Data.Is_mat_shellsandbones.hasOwnProperty(id); }
    public static override IsSticksAndStems(id: number): boolean { return RF5Data.Is_mat_sticksandstems.hasOwnProperty(id); }
    public static override IsStones(id: number): boolean { return RF5Data.Is_mat_stones.hasOwnProperty(id); }
    public static override IsStrings(id: number): boolean { return RF5Data.Is_mat_strings.hasOwnProperty(id); }

    public static override HasEffect(id: number): boolean {
        return RF5Data.Has_effect.hasOwnProperty(id);
    }

    public static override IsEleCrystal(id: number): boolean {
        return RF5Data.Is_mat_elecrystals.hasOwnProperty(id);
    }
    public static override IsObjectX(id: number): boolean {
        return RF5Data.Is_mat_objectx.hasOwnProperty(id);
    }
    public static override Is2foldSteel(id: number): boolean {
        return RF5Data.Is_mat_2foldsteel.hasOwnProperty(id);
    }
    public static override Is10foldSteel(id: number): boolean {
        return RF5Data.Is_mat_10foldsteel.hasOwnProperty(id);
    }
    public static override IsLightOre(id: number): boolean {
        return RF5Data.Is_mat_lightore.hasOwnProperty(id);
    }
    public static override IsTrueScale(id: number): boolean {
        return RF5Data.Is_mat_truescale.hasOwnProperty(id);
    }
    public static override IsClover(id: number): boolean {
        return (id === 168);
    }
    public static override IsGiantClover(id: number): boolean {
        return (id === 169);
    }
    public static override IsRareCan(id: number): boolean {
        return (id === 1902);
    }
    public static override IsScrapMetalPlus(id: number): boolean {
        return (id === 2153);
    }
    public static override IsShadeStone(id: number): boolean {
        return (id === 2177);
    }
    public static override IsGreenCore(id: number): boolean {
        return (id === 2166);
    }
    public static override IsRedCore(id: number): boolean {
        return (id === 2167);
    }
    public static override IsYellowCore(id: number): boolean {
        return (id === 2168);
    }
    public static override IsBlueCore(id: number): boolean {
        return (id === 2169);
    }
    public static override IsGeneralsHoe(id: number): boolean {
        return (id === 905);
    }
    public static override IsGeneralsHat(id: number): boolean {
        return (id === 1130);
    }
    public static override IsGeneralsRobe(id: number): boolean {
        return (id === 1219);
    }
    public static override IsGeneralsShield(id: number): boolean {
        return (id === 1018);
    }

    protected static override ArrayToObject(arr: number[]): object {
        var obj: any = {};
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
        return obj;
    }

    protected static override ObjectToObject(sourceObj: any): object {
        var obj: any = {};
        for (var prop in sourceObj) {
            if(sourceObj.hasOwnProperty(prop)) {
                obj[prop] = sourceObj[prop];
            }
        }
        return obj;
    }

}
export = RF5Data;