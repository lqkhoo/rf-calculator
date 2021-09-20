import _ = require('lodash');

// All-static class facilitating lookups.
abstract class RF5AbstractData {

    static readonly Item_ids:               object;
    static readonly Category_ids:           object;
    static readonly Character_ids:          object;
    static readonly Is_eq_2hsword:          object;
    static readonly Is_eq_accessory:        object;
    static readonly Is_eq_armor:            object;
    static readonly Is_eq_axe:              object;
    static readonly Is_eq_dualblades:       object;
    static readonly Is_eq_farm_axe:         object;
    static readonly Is_eq_farm_fishingpole: object;
    static readonly Is_eq_farm_hammer:      object;
    static readonly Is_eq_farm_hoe:         object;
    static readonly Is_eq_farm_sickle:      object;
    static readonly Is_eq_farm_waterpot:    object;
    static readonly Is_eq_fists:            object;
    static readonly Is_eq_hammer:           object;
    static readonly Is_eq_headgear:         object;
    static readonly Is_eq_shield:           object;
    static readonly Is_eq_shoes:            object;
    static readonly Is_eq_spear:            object;
    static readonly Is_eq_staff:            object;
    static readonly Is_eq_sword:            object;
    static readonly Is_eq_weapon:           object;
    static readonly Is_equipment:           object;
    static readonly Is_mat_2foldsteel:      object;
    static readonly Is_mat_10foldsteel:     object;
    static readonly Is_mat_clawsandfangs:   object;
    static readonly Is_mat_clothsandskins:  object;
    static readonly Is_mat_core:            object;
    static readonly Is_mat_crystals:        object;
    static readonly Is_mat_elecrystals:     object;
    static readonly Is_mat_feathers:        object;
    static readonly Is_mat_furs:            object;
    static readonly Is_mat_jewels:          object;
    static readonly Is_mat_lightore:        object;
    static readonly Is_mat_liquids:         object;
    static readonly Is_mat_minerals:        object;
    static readonly Is_mat_objectx:         object;
    static readonly Is_mat_powdersandspores:object;
    static readonly Is_mat_scales:          object;
    static readonly Is_mat_shards:          object;
    static readonly Is_mat_shellsandbones:  object;
    static readonly Is_mat_sticksandstems:  object;
    static readonly Is_mat_stones:          object;
    static readonly Is_mat_strings:         object;
    static readonly Is_mat_truescale:       object; // Scales that provide the shield bonus
    static readonly Has_effect:             object;
    static readonly Categories:             object;
    static readonly Items:                  object;
    static readonly BaseItems:              object;
    static readonly Characters:             object;
    static readonly Recipes:                object;
    static readonly Magics:                 object;
    static readonly Effects:                object;

    // Construct reverse type maps
    static readonly EquipmentTypeMap:      Record<string, EquipmentType|undefined>;
    static readonly WeaponTypeMap:         Record<string, WeaponType|undefined>;

    // Query methods
    public static IsEquipment(id: number): boolean { throw new Error("Not implemented."); }
    public static IsWeapon(id: number): boolean { throw new Error("Not implemented."); }
    public static IsShield(id: number): boolean { throw new Error("Not implemented."); }
    public static IsHeadgear(id: number): boolean { throw new Error("Not implemented."); }
    public static IsArmor(id: number): boolean { throw new Error("Not implemented."); }
    public static IsBoots(id: number): boolean { throw new Error("Not implemented."); }
    public static IsAccessory(id: number): boolean { throw new Error("Not implemented."); }

    public static Is2hSword(id: number): boolean { throw new Error("Not implemented."); }
    public static IsAxe(id: number): boolean { throw new Error("Not implemented."); }
    public static IsDualblades(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFists(id: number): boolean { throw new Error("Not implemented."); }
    public static IsHammer(id: number): boolean { throw new Error("Not implemented."); }
    public static IsSpear(id: number): boolean { throw new Error("Not implemented."); }
    public static IsStaff(id: number): boolean { throw new Error("Not implemented."); }
    public static IsSword(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmAxe(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmFishingPole(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmHammer(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmHoe(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmSickle(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFarmWaterpot(id: number): boolean { throw new Error("Not implemented."); }

    public static IsClawsAndFangs(id: number): boolean { throw new Error("Not implemented."); }
    public static IsClothsAndSkins(id: number): boolean { throw new Error("Not implemented."); }
    public static IsCrystals(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFeathers(id: number): boolean { throw new Error("Not implemented."); }
    public static IsFurs(id: number): boolean { throw new Error("Not implemented."); }
    public static IsJewels(id: number): boolean { throw new Error("Not implemented."); }
    public static IsLiquids(id: number): boolean { throw new Error("Not implemented."); }
    public static IsMinerals(id: number): boolean { throw new Error("Not implemented."); }
    public static IsPowdersAndSpores(id: number): boolean { throw new Error("Not implemented."); }
    public static IsScales(id: number): boolean { throw new Error("Not implemented."); }
    public static IsShards(id: number): boolean { throw new Error("Not implemented."); }
    public static IsShellsAndBones(id: number): boolean { throw new Error("Not implemented."); }
    public static IsSticksAndStems(id: number): boolean { throw new Error("Not implemented."); }
    public static IsStones(id: number): boolean { throw new Error("Not implemented."); }
    public static IsStrings(id: number): boolean { throw new Error("Not implemented."); }

    public static HasEffect(id: number): boolean { throw new Error("Not implemented."); }

    public static IsEleCrystal(id: number): boolean { throw new Error("Not implemented."); }
    public static IsObjectX(id: number): boolean { throw new Error("Not implemented."); }
    public static Is2foldSteel(id: number): boolean { throw new Error("Not implemented."); }
    public static Is10foldSteel(id: number): boolean { throw new Error("Not implemented."); }
    public static IsLightOre(id: number): boolean { throw new Error("Not implemented."); }
    public static IsTrueScale(id: number): boolean { throw new Error("Not implemented."); }
    public static IsClover(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGiantClover(id: number): boolean { throw new Error("Not implemented."); }
    public static IsRareCan(id: number): boolean { throw new Error("Not implemented."); }
    public static IsScrapMetalPlus(id: number): boolean { throw new Error("Not implemented."); }
    public static IsShadeStone(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGreenCore(id: number): boolean { throw new Error("Not implemented."); }
    public static IsRedCore(id: number): boolean { throw new Error("Not implemented."); }
    public static IsYellowCore(id: number): boolean { throw new Error("Not implemented."); }
    public static IsBlueCore(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGeneralsHoe(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGeneralsHat(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGeneralsRobe(id: number): boolean { throw new Error("Not implemented."); }
    public static IsGeneralsShield(id: number): boolean { throw new Error("Not implemented."); }

    protected static ArrayToObject(arr: number[]): object { throw new Error("Not implemented."); }
    protected static ObjectToObject(sourceObj: any): object { throw new Error("Not implemented."); }
}
export = RF5AbstractData;