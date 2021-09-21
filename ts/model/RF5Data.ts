import _ = require('lodash');
import _RAWDATA = require('../rf5-rawdata');
import IData = require('./IData');

// All-static class facilitating lookups.
class RF5Data implements IData {

    readonly Item_ids:               object;
    readonly Category_ids:           object;
    readonly Character_ids:          object;
    readonly Is_eq_2hsword:          object;
    readonly Is_eq_accessory:        object;
    readonly Is_eq_armor:            object;
    readonly Is_eq_axe:              object;
    readonly Is_eq_dualblades:       object;
    readonly Is_eq_farm_axe:         object;
    readonly Is_eq_farm_fishingpole: object;
    readonly Is_eq_farm_hammer:      object;
    readonly Is_eq_farm_hoe:         object;
    readonly Is_eq_farm_sickle:      object;
    readonly Is_eq_farm_waterpot:    object;
    readonly Is_eq_fists:            object;
    readonly Is_eq_hammer:           object;
    readonly Is_eq_headgear:         object;
    readonly Is_eq_shield:           object;
    readonly Is_eq_shoes:            object;
    readonly Is_eq_spear:            object;
    readonly Is_eq_staff:            object;
    readonly Is_eq_sword:            object;
    readonly Is_eq_weapon:           object;
    readonly Is_equipment:           object;
    readonly Is_mat_2foldsteel:      object;
    readonly Is_mat_10foldsteel:     object;
    readonly Is_mat_clawsandfangs:   object;
    readonly Is_mat_clothsandskins:  object;
    readonly Is_mat_core:            object;
    readonly Is_mat_crystals:        object;
    readonly Is_mat_elecrystals:     object;
    readonly Is_mat_feathers:        object;
    readonly Is_mat_furs:            object;
    readonly Is_mat_jewels:          object;
    readonly Is_mat_lightore:        object;
    readonly Is_mat_liquids:         object;
    readonly Is_mat_minerals:        object;
    readonly Is_mat_objectx:         object;
    readonly Is_mat_powdersandspores:object;
    readonly Is_mat_scales:          object;
    readonly Is_mat_shards:          object;
    readonly Is_mat_shellsandbones:  object;
    readonly Is_mat_sticksandstems:  object;
    readonly Is_mat_stones:          object;
    readonly Is_mat_strings:         object;
    readonly Is_mat_truescale:       object; // Scales that provide the shield bonus
    readonly Has_effect:             object;
    readonly Categories:             object;
    readonly Items:                  object;
    readonly BaseItems:              object;
    readonly Characters:             object;
    readonly Recipes:                object;
    readonly Magics:                 object;
    readonly Effects:                object;

    readonly EquipmentTypeMap:      Record<string, EquipmentType|undefined>;
    readonly WeaponTypeMap:         Record<string, WeaponType|undefined>;

    constructor() {
        const self = this;

        this.Item_ids              = this.ArrayToObject(_RAWDATA.item_ids);
        this.Category_ids          = this.ArrayToObject(_RAWDATA.category_ids);
        this.Character_ids         = this.ArrayToObject(_RAWDATA.character_ids);
        this.Is_eq_2hsword         = this.ArrayToObject(_RAWDATA.is_eq_2hsword);
        this.Is_eq_accessory       = this.ArrayToObject(_RAWDATA.is_eq_accessory);
        this.Is_eq_armor           = this.ArrayToObject(_RAWDATA.is_eq_armor);
        this.Is_eq_axe             = this.ArrayToObject(_RAWDATA.is_eq_axe);
        this.Is_eq_dualblades      = this.ArrayToObject(_RAWDATA.is_eq_dualblades);
        this.Is_eq_farm_axe        = this.ArrayToObject(_RAWDATA.is_eq_farm_axe);
        this.Is_eq_farm_fishingpole= this.ArrayToObject(_RAWDATA.is_eq_farm_fishingpole);
        this.Is_eq_farm_hammer     = this.ArrayToObject(_RAWDATA.is_eq_farm_hammer);
        this.Is_eq_farm_hoe        = this.ArrayToObject(_RAWDATA.is_eq_farm_hoe);
        this.Is_eq_farm_sickle     = this.ArrayToObject(_RAWDATA.is_eq_farm_sickle);
        this.Is_eq_farm_waterpot   = this.ArrayToObject(_RAWDATA.is_eq_farm_waterpot);
        this.Is_eq_fists           = this.ArrayToObject(_RAWDATA.is_eq_fists);
        this.Is_eq_hammer          = this.ArrayToObject(_RAWDATA.is_eq_hammer);
        this.Is_eq_headgear        = this.ArrayToObject(_RAWDATA.is_eq_headgear);
        this.Is_eq_shield          = this.ArrayToObject(_RAWDATA.is_eq_shield);
        this.Is_eq_shoes           = this.ArrayToObject(_RAWDATA.is_eq_shoes);
        this.Is_eq_spear           = this.ArrayToObject(_RAWDATA.is_eq_spear);
        this.Is_eq_staff           = this.ArrayToObject(_RAWDATA.is_eq_staff);
        this.Is_eq_sword           = this.ArrayToObject(_RAWDATA.is_eq_sword);
        this.Is_eq_weapon          = this.ArrayToObject(_RAWDATA.is_eq_weapon);
        this.Is_equipment          = this.ArrayToObject(_RAWDATA.is_equipment);
        this.Is_mat_2foldsteel     = this.ArrayToObject(_RAWDATA.is_mat_2foldsteel);
        this.Is_mat_10foldsteel    = this.ArrayToObject(_RAWDATA.is_mat_10foldsteel);
        this.Is_mat_clawsandfangs  = this.ArrayToObject(_RAWDATA.is_mat_clawsandfangs);
        this.Is_mat_clothsandskins = this.ArrayToObject(_RAWDATA.is_mat_clothsandskins);
        this.Is_mat_core           = this.ArrayToObject(_RAWDATA.is_mat_core);
        this.Is_mat_crystals       = this.ArrayToObject(_RAWDATA.is_mat_crystals);
        this.Is_mat_elecrystals    = this.ArrayToObject(_RAWDATA.is_mat_elecrystals);
        this.Is_mat_feathers       = this.ArrayToObject(_RAWDATA.is_mat_feathers);
        this.Is_mat_furs           = this.ArrayToObject(_RAWDATA.is_mat_furs);
        this.Is_mat_jewels         = this.ArrayToObject(_RAWDATA.is_mat_jewels);
        this.Is_mat_lightore       = this.ArrayToObject(_RAWDATA.is_mat_lightore);
        this.Is_mat_liquids        = this.ArrayToObject(_RAWDATA.is_mat_liquids);
        this.Is_mat_minerals       = this.ArrayToObject(_RAWDATA.is_mat_minerals);
        this.Is_mat_objectx        = this.ArrayToObject(_RAWDATA.is_mat_objectx);
        this.Is_mat_powdersandspores = this.ArrayToObject(_RAWDATA.is_mat_powdersandspores);
        this.Is_mat_scales         = this.ArrayToObject(_RAWDATA.is_mat_scales);
        this.Is_mat_shards         = this.ArrayToObject(_RAWDATA.is_mat_shards);
        this.Is_mat_shellsandbones = this.ArrayToObject(_RAWDATA.is_mat_shellsandbones);
        this.Is_mat_sticksandstems = this.ArrayToObject(_RAWDATA.is_mat_sticksandstems);
        this.Is_mat_stones         = this.ArrayToObject(_RAWDATA.is_mat_stones);
        this.Is_mat_strings        = this.ArrayToObject(_RAWDATA.is_mat_strings);
        this.Is_mat_truescale      = this.ArrayToObject(_RAWDATA.is_mat_truescale); // Scales that provide the shield bonus
        this.Has_effect            = this.ArrayToObject(_RAWDATA.has_effect);
        this.Categories            = _RAWDATA.categories;
        this.Items                 = _RAWDATA.items;
        this.BaseItems             = _RAWDATA.base_items;
        this.Characters            = _RAWDATA.characters;
        this.Recipes               = _RAWDATA.recipes;
        this.Magics                = _RAWDATA.magics;
        this.Effects               = _RAWDATA.effects;

        // Construct reverse type maps
        this.EquipmentTypeMap = (function() {
            var map: Record<string, EquipmentType> = {};
            _.forOwn(self.Is_eq_weapon,     (_value: any, key: any) => { map[key] = "weapon" });
            _.forOwn(self.Is_eq_shield,     (_value: any, key: any) => { map[key] = "shield" });
            _.forOwn(self.Is_eq_headgear,   (_value: any, key: any) => { map[key] = "headgear" });
            _.forOwn(self.Is_eq_armor,      (_value: any, key: any) => { map[key] = "armor" });
            _.forOwn(self.Is_eq_shoes,      (_value: any, key: any) => { map[key] = "boots" });
            _.forOwn(self.Is_eq_accessory,  (_value: any, key: any) => { map[key] = "accessory" });
            return map;
        }());

        this.WeaponTypeMap = (function() {
            var map: Record<string, WeaponType> = {};
            _.forOwn(self.Is_eq_2hsword,        (_value: any, key: any) => { map[key] = "2hsword" });
            _.forOwn(self.Is_eq_axe,            (_value: any, key: any) => { map[key] = "axe" });
            _.forOwn(self.Is_eq_dualblades,     (_value: any, key: any) => { map[key] = "dualblades" });
            _.forOwn(self.Is_eq_fists,          (_value: any, key: any) => { map[key] = "fists" });
            _.forOwn(self.Is_eq_hammer,         (_value: any, key: any) => { map[key] = "hammer" });
            _.forOwn(self.Is_eq_spear,          (_value: any, key: any) => { map[key] = "spear" });
            _.forOwn(self.Is_eq_staff,          (_value: any, key: any) => { map[key] = "staff" });
            _.forOwn(self.Is_eq_sword,          (_value: any, key: any) => { map[key] = "sword" });
            _.forOwn(self.Is_eq_farm_axe,       (_value: any, key: any) => { map[key] = "farm_axe" });
            _.forOwn(self.Is_eq_farm_fishingpole, (_value: any, key: any) => { map[key] = "farm_fishingpole" });
            _.forOwn(self.Is_eq_farm_hammer,    (_value: any, key: any) => { map[key] = "farm_hammer" });
            _.forOwn(self.Is_eq_farm_hoe,       (_value: any, key: any) => { map[key] = "farm_hoe" });
            _.forOwn(self.Is_eq_farm_sickle,    (_value: any, key: any) => { map[key] = "farm_sickle" });
            _.forOwn(self.Is_eq_farm_waterpot,  (_value: any, key: any) => { map[key] = "farm_waterpot" });
            return map;
        }());

    }

    // Query methods
    public IsEquipment(id: number): boolean { return this.Is_equipment.hasOwnProperty(id); }
    public IsWeapon(id: number): boolean { return this.Is_eq_weapon.hasOwnProperty(id); }
    public IsShield(id: number): boolean { return this.Is_eq_shield.hasOwnProperty(id); }
    public IsHeadgear(id: number): boolean { return this.Is_eq_headgear.hasOwnProperty(id); }
    public IsArmor(id: number): boolean { return this.Is_eq_armor.hasOwnProperty(id); }
    public IsBoots(id: number): boolean { return this.Is_eq_shoes.hasOwnProperty(id); }
    public IsAccessory(id: number): boolean { return this.Is_eq_accessory.hasOwnProperty(id); }

    public Is2hSword(id: number): boolean { return this.Is_eq_2hsword.hasOwnProperty(id); }
    public IsAxe(id: number): boolean { return this.Is_eq_axe.hasOwnProperty(id); }
    public IsDualblades(id: number): boolean { return this.Is_eq_dualblades.hasOwnProperty(id); }
    public IsFists(id: number): boolean { return this.Is_eq_fists.hasOwnProperty(id); }
    public IsHammer(id: number): boolean { return this.Is_eq_hammer.hasOwnProperty(id); }
    public IsSpear(id: number): boolean { return this.Is_eq_spear.hasOwnProperty(id); }
    public IsStaff(id: number): boolean { return this.Is_eq_staff.hasOwnProperty(id); }
    public IsSword(id: number): boolean { return this.Is_eq_sword.hasOwnProperty(id); }
    public IsFarmAxe(id: number): boolean { return this.Is_eq_farm_axe.hasOwnProperty(id); }
    public IsFarmFishingPole(id: number): boolean { return this.Is_eq_farm_fishingpole.hasOwnProperty(id); }
    public IsFarmHammer(id: number): boolean { return this.Is_eq_farm_hammer.hasOwnProperty(id); }
    public IsFarmHoe(id: number): boolean { return this.Is_eq_farm_hoe.hasOwnProperty(id); }
    public IsFarmSickle(id: number): boolean { return this.Is_eq_farm_sickle.hasOwnProperty(id); }
    public IsFarmWaterpot(id: number): boolean { return this.Is_eq_farm_waterpot.hasOwnProperty(id); }

    public IsClawsAndFangs(id: number): boolean { return this.Is_mat_clawsandfangs.hasOwnProperty(id); }
    public IsClothsAndSkins(id: number): boolean { return this.Is_mat_clothsandskins.hasOwnProperty(id); }
    public IsCrystals(id: number): boolean { return this.Is_mat_crystals.hasOwnProperty(id); }
    public IsFeathers(id: number): boolean { return this.Is_mat_feathers.hasOwnProperty(id); }
    public IsFurs(id: number): boolean { return this.Is_mat_furs.hasOwnProperty(id); }
    public IsJewels(id: number): boolean { return this.Is_mat_jewels.hasOwnProperty(id); }
    public IsLiquids(id: number): boolean { return this.Is_mat_liquids.hasOwnProperty(id); }
    public IsMinerals(id: number): boolean { return this.Is_mat_minerals.hasOwnProperty(id); }
    public IsPowdersAndSpores(id: number): boolean { return this.Is_mat_powdersandspores.hasOwnProperty(id); }
    public IsScales(id: number): boolean { return this.Is_mat_scales.hasOwnProperty(id); }
    public IsShards(id: number): boolean { return this.Is_mat_shards.hasOwnProperty(id); }
    public IsShellsAndBones(id: number): boolean { return this.Is_mat_shellsandbones.hasOwnProperty(id); }
    public IsSticksAndStems(id: number): boolean { return this.Is_mat_sticksandstems.hasOwnProperty(id); }
    public IsStones(id: number): boolean { return this.Is_mat_stones.hasOwnProperty(id); }
    public IsStrings(id: number): boolean { return this.Is_mat_strings.hasOwnProperty(id); }

    public HasEffect(id: number): boolean {
        return this.Has_effect.hasOwnProperty(id);
    }

    public IsEleCrystal(id: number): boolean {
        return this.Is_mat_elecrystals.hasOwnProperty(id);
    }
    public IsObjectX(id: number): boolean {
        return this.Is_mat_objectx.hasOwnProperty(id);
    }
    public Is2foldSteel(id: number): boolean {
        return this.Is_mat_2foldsteel.hasOwnProperty(id);
    }
    public Is10foldSteel(id: number): boolean {
        return this.Is_mat_10foldsteel.hasOwnProperty(id);
    }
    public IsLightOre(id: number): boolean {
        return this.Is_mat_lightore.hasOwnProperty(id);
    }
    public IsTrueScale(id: number): boolean {
        return this.Is_mat_truescale.hasOwnProperty(id);
    }
    public IsClover(id: number): boolean {
        return (id === 168);
    }
    public IsGiantClover(id: number): boolean {
        return (id === 169);
    }
    public IsRareCan(id: number): boolean {
        return (id === 1902);
    }
    public IsScrapMetalPlus(id: number): boolean {
        return (id === 2153);
    }
    public IsShadeStone(id: number): boolean {
        return (id === 2177);
    }
    public IsGreenCore(id: number): boolean {
        return (id === 2166);
    }
    public IsRedCore(id: number): boolean {
        return (id === 2167);
    }
    public IsYellowCore(id: number): boolean {
        return (id === 2168);
    }
    public IsBlueCore(id: number): boolean {
        return (id === 2169);
    }
    public IsGeneralsHoe(id: number): boolean {
        return (id === 905);
    }
    public IsGeneralsHat(id: number): boolean {
        return (id === 1130);
    }
    public IsGeneralsRobe(id: number): boolean {
        return (id === 1219);
    }
    public IsGeneralsShield(id: number): boolean {
        return (id === 1018);
    }

    protected ArrayToObject(arr: number[]): object {
        var obj: any = {};
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
        return obj;
    }

    protected ObjectToObject(sourceObj: any): object {
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