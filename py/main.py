from __future__ import annotations
from typing import List, Set
import csv
from dataclasses import dataclass
import json
from pprint import pprint


class RF5Category(object):
    def __init__(self, _id):
        id: int = _id
        name_en: str = ''
        name_jp: str = ''
        image_uri: str = ''
        item_ids: List[int] = []

@dataclass
class RF5Effect(object):
    id: int
    desc_en: str = ''
    desc_jp: str = ''


@dataclass
class RF5Character(object):
    id: int
    name_en: str = ''
    name_jp: str = ''
    image_uri: str = ''
    sprite_uri: str = ''

    stat_ATK: int = 0
    stat_DEF: int = 0
    stat_MAT: int = 0
    stat_MDF: int = 0
    stat_STR: int = 0
    stat_INT: int = 0
    stat_VIT: int = 0
    stat_def_ele_FIRE: float = 0
    stat_def_ele_WATER: float = 0
    stat_def_ele_EARTH: float = 0
    stat_def_ele_WIND: float = 0
    stat_def_ele_LIGHT: float = 0
    stat_def_ele_DARK: float = 0
    stat_def_ele_LOVE: float = 0
    stat_def_ele_VOID: float = 0
    stat_atk_CRT: float = 0
    stat_atk_KNO: float = 0
    stat_atk_STN: float = 0
    stat_atk_DIZ: float = 0
    stat_atk_PSN: float = 0
    stat_atk_SEA: float = 0
    stat_atk_PAR: float = 0
    stat_atk_SLP: float = 0
    stat_atk_FTG: float = 0
    stat_atk_SCK: float = 0
    stat_atk_FNT: float = 0
    stat_atk_DRN: float = 0
    stat_def_ele_FIRE: float = 0
    stat_def_ele_WATER: float = 0
    stat_def_ele_EARTH: float = 0
    stat_def_ele_WIND: float = 0
    stat_def_ele_LIGHT: float = 0
    stat_def_ele_DARK: float = 0
    stat_def_ele_LOVE: float = 0
    stat_def_ele_VOID: float = 0 # elementless
    stat_def_CRT: float = 0   # ----
    stat_def_DIZ: float = 0   # In RF5/RF4 data these two rows are always swapped
    stat_def_KNO: float = 0
    stat_def_STN: float = 0
    stat_def_PSN: float = 0
    stat_def_SEA: float = 0
    stat_def_PAR: float = 0
    stat_def_SLP: float = 0
    stat_def_FTG: float = 0
    stat_def_SCK: float = 0
    stat_def_FNT: float = 0
    stat_def_DRN: float = 0


@dataclass
class RF5Item(object):
    """This is a 'row' in an item. Think of it as an upgrade ingredient."""
    id: int
    name_en: str = ''
    name_jp: str = ''
    image_uri: str = ''

    rarity: int = 0
    level: int = 10 # Default to max
    rarity_stat_type: str = 'NONE' # stat upgrade from rarity bonus.

    element: str = 'NONE' # weapon element

    # Equipment stats.
    stat_ATK: int = 0
    stat_DEF: int = 0
    stat_MAT: int = 0
    stat_MDF: int = 0
    stat_STR: int = 0
    stat_INT: int = 0
    stat_VIT: int = 0
    stat_def_ele_FIRE: float = 0
    stat_def_ele_WATER: float = 0
    stat_def_ele_EARTH: float = 0
    stat_def_ele_WIND: float = 0
    stat_def_ele_LIGHT: float = 0
    stat_def_ele_DARK: float = 0
    stat_def_ele_LOVE: float = 0
    stat_def_ele_VOID: float = 0
    stat_atk_CRT: float = 0
    stat_atk_KNO: float = 0
    stat_atk_STN: float = 0
    stat_atk_DIZ: float = 0
    stat_atk_PSN: float = 0
    stat_atk_SEA: float = 0
    stat_atk_PAR: float = 0
    stat_atk_SLP: float = 0
    stat_atk_FTG: float = 0
    stat_atk_SCK: float = 0
    stat_atk_FNT: float = 0
    stat_atk_DRN: float = 0
    stat_def_ele_FIRE: float = 0
    stat_def_ele_WATER: float = 0
    stat_def_ele_EARTH: float = 0
    stat_def_ele_WIND: float = 0
    stat_def_ele_LIGHT: float = 0
    stat_def_ele_DARK: float = 0
    stat_def_ele_LOVE: float = 0
    stat_def_ele_VOID: float = 0 # elementless
    stat_def_CRT: float = 0   # ----
    stat_def_DIZ: float = 0   # In RF5/RF4 data these two rows are always swapped
    stat_def_KNO: float = 0
    stat_def_STN: float = 0
    stat_def_PSN: float = 0
    stat_def_SEA: float = 0
    stat_def_PAR: float = 0
    stat_def_SLP: float = 0
    stat_def_FTG: float = 0
    stat_def_SCK: float = 0
    stat_def_FNT: float = 0
    stat_def_DRN: float = 0
    stat_chargespeed: float = 0
    stat_attacklength: float = 0

    magic_charge1: int = 0
    magic_charge2: int = 0
    magic_charge3: int = 0


class TsvReader(object):

    @staticmethod
    def read_set_tsv(filepath: str) -> set[int]:
        ids: set = set()
        with open(filepath) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                ids.add(int(row[0]))
        return ids


    @staticmethod
    def parse_name_tsv_row(row: List[str]) -> List[object]:
        ls: List[object] = [int(row[0]), row[1]]
        return ls


    @staticmethod
    def read_category_names(category_ids: set[int], categories: dict[int, RF5Category]):

        with open('../tsv/rf5/map_categoryid_to_english_name.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    categories[id] = RF5Category(_id=id)
                category = categories[id]
                category.name_en = name_en
        
        with open('../tsv/rf5/map_categoryid_to_japanese_name_shiftjis.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_jp) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    raise KeyError(id) # This should not happen.
                category = categories[id]
                category.name_jp = name_jp

        for id in category_ids:
            assert(id in categories)
        
        return categories


    @staticmethod
    def read_item_names(item_ids: set[int], items: dict[int, RF5Item]):

        with open('../tsv/rf5/map_itemid_to_english_name.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    items[id] = RF5Item(id=id)
                item = items[id]
                item.name_en = name_en
        
        with open('../tsv/rf5/map_itemid_to_japanese_name_shiftjis.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_jp) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    raise KeyError(id) # This should not happen.
                item = items[id]
                item.name_jp = name_jp

        for id in item_ids:
            assert(id in items)

        return items


    @staticmethod
    def read_character_names(character_ids: set[int], characters: dict[int, RF5Character]):

        with open('../tsv/rf5/map_characterid_to_english_name.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in characters.keys():
                    characters[id] = RF5Character(id=id)
                item = characters[id]
                item.name_en = name_en
        
        with open('../tsv/rf5/map_characterid_to_japanese_name_shiftjis.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_jp) = TsvReader.parse_name_tsv_row(row)
                if id not in characters.keys():
                    raise KeyError(id) # This should not happen.
                item = characters[id]
                item.name_jp = name_jp

        for id in character_ids:
            assert(id in characters)

        return characters


    @staticmethod
    def read_category_images(category_ids: set[int], categories: dict[int, RF5Category]):
        
        with open('../tsv/rf5/map_categoryid_to_image.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    raise KeyError(id) # This should not happen.
                category = categories[id]
                category.image_uri = image_uri

    @staticmethod
    def read_item_images(item_ids: set[int], items: dict[int, RF5Item]):
        
        with open('../tsv/rf5/map_itemid_to_image.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    raise KeyError(id) # This should not happen.
                item = items[id]
                item.image_uri = image_uri

    @staticmethod
    def read_character_images(character_ids: set[int], characters: dict[int, RF5Character]):
        
        with open('../tsv/rf5/map_characterid_to_icon.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in characters.keys():
                    raise KeyError(id) # This should not happen.
                character = characters[id]
                character.image_uri = image_uri

        with open('../tsv/rf5/map_characterid_to_sprites.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                character = characters[id]
                character.sprite_uri = row[1]


    @staticmethod
    def read_character_stats(filepath: str, characters: dict[int,RF5Character]):
        with open(filepath) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id: int = int(row[0])
                character: RF5Character = characters[id]

                character.stat_ATK = int(row[1])
                character.stat_DEF = int(row[2])
                character.stat_MAT = int(row[3])
                character.stat_MDF = int(row[4])
                character.stat_STR = int(row[5])
                character.stat_INT = int(row[6])
                character.stat_VIT = int(row[7])
                character.stat_atk_CRT = float(row[8])
                character.stat_atk_KNO = float(row[9])
                # character.stat_atk_KNOTM = float(row[10])
                # character.stat_atk_STN = float(row[11])
                character.stat_atk_STN = float(row[10]) # labeled as knockback time in data dump
                character.stat_atk_DIZ = float(row[11]) # labered as stun in data dump
                character.stat_atk_PSN = float(row[12])
                character.stat_atk_SEA = float(row[13])
                character.stat_atk_PAR = float(row[14])
                character.stat_atk_SLP = float(row[15])
                character.stat_atk_FTG = float(row[16])
                character.stat_atk_SCK = float(row[17])
                character.stat_atk_FNT = float(row[18])
                character.stat_atk_DRN = float(row[19])
                character.stat_def_ele_FIRE = float(row[20])
                character.stat_def_ele_WATER = float(row[21])
                character.stat_def_ele_EARTH = float(row[22])
                character.stat_def_ele_WIND = float(row[23])
                character.stat_def_ele_LIGHT = float(row[24])
                character.stat_def_ele_DARK = float(row[25])
                character.stat_def_ele_LOVE = float(row[26])
                character.stat_def_ele_VOID = float(row[27])
                # character.stat_def_STN = float(row[28])
                character.stat_def_DIZ = float(row[28]) # labeled as stun in data dump
                character.stat_def_CRT = float(row[29])
                character.stat_def_KNO = float(row[30])
                # character.stat_def_KNOTM = float(row[31])
                character.stat_def_STN = float(row[31]) # labeled as knockback time in data dump
                character.stat_def_PSN = float(row[32])
                character.stat_def_SEA = float(row[33])
                character.stat_def_PAR = float(row[34])
                character.stat_def_SLP = float(row[35])
                character.stat_def_FTG = float(row[36])
                character.stat_def_SCK = float(row[37])
                character.stat_def_FNT = float(row[38])
                character.stat_def_DRN = float(row[39])


    @staticmethod
    def read_item_stats(filepath: str, items: dict[int, RF5Item]) -> Set[int]:

        read_ids: Set[int] = set()

        with open(filepath) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id: int = int(row[0])

                read_ids.add(id)

                # For the confusing STN/DIZ/KNO/knockback time,
                # align data between games using e.g. "Bat", "Blessed Hoe"

                item: RF5Item = items[id]
                item.stat_ATK = int(row[1])
                item.stat_DEF = int(row[2])
                item.stat_MAT = int(row[3])
                item.stat_MDF = int(row[4])
                item.stat_STR = int(row[5])
                item.stat_INT = int(row[6])
                item.stat_VIT = int(row[7])
                item.stat_atk_CRT = float(row[8])
                item.stat_atk_KNO = float(row[9])
                # item.stat_atk_KNOTM = float(row[10])
                # item.stat_atk_STN = float(row[11])
                item.stat_atk_STN = float(row[10]) # labeled as knockback time in data dump
                item.stat_atk_DIZ = float(row[11]) # labered as stun in data dump
                item.stat_atk_PSN = float(row[12])
                item.stat_atk_SEA = float(row[13])
                item.stat_atk_PAR = float(row[14])
                item.stat_atk_SLP = float(row[15])
                item.stat_atk_FTG = float(row[16])
                item.stat_atk_SCK = float(row[17])
                item.stat_atk_FNT = float(row[18])
                item.stat_atk_DRN = float(row[19])
                item.stat_def_ele_FIRE = float(row[20])
                item.stat_def_ele_WATER = float(row[21])
                item.stat_def_ele_EARTH = float(row[22])
                item.stat_def_ele_WIND = float(row[23])
                item.stat_def_ele_LIGHT = float(row[24])
                item.stat_def_ele_DARK = float(row[25])
                item.stat_def_ele_LOVE = float(row[26])
                item.stat_def_ele_VOID = float(row[27])
                # item.stat_def_STN = float(row[28])
                item.stat_def_DIZ = float(row[28]) # labeled as stun in data dump
                item.stat_def_CRT = float(row[29])
                item.stat_def_KNO = float(row[30])
                # item.stat_def_KNOTM = float(row[31])
                item.stat_def_STN = float(row[31]) # labeled as knockback time in data dump
                item.stat_def_PSN = float(row[32])
                item.stat_def_SEA = float(row[33])
                item.stat_def_PAR = float(row[34])
                item.stat_def_SLP = float(row[35])
                item.stat_def_FTG = float(row[36])
                item.stat_def_SCK = float(row[37])
                item.stat_def_FNT = float(row[38])
                item.stat_def_DRN = float(row[39])
                item.stat_chargespeed = float(row[40])
                item.stat_attacklength = float(row[41])
        return read_ids
        
    @staticmethod
    def read_item_rarity(items: dict[int, RF5Item]):
        with open('../tsv/rf5/map_itemid_to_rarity.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.rarity = int(row[1])

    @staticmethod
    def read_item_rarity_stat_type(items: dict[int, RF5Item]):
        with open('../tsv/rf5/map_itemid_to_rarity_stat_type.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.rarity_stat_type = row[1] # str

    @staticmethod
    def read_item_weapon_element(items: dict[int, RF5Item]):
        with open('../tsv/rf5/map_itemid_to_weapon_element.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.element = row[1]

    @staticmethod
    def read_item_crystal_element(items: dict[int, RF5Item]):
        with open('../tsv/rf5/map_itemid_to_crystal_element.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.element = row[1]

    @staticmethod
    def read_item_magic(items: dict[int, RF5Item]):
        with open('../tsv/rf5/map_itemid_to_magicid.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.magic_charge1 = int(row[1])
                item.magic_charge2 = int(row[2])
                item.magic_charge3 = int(row[3])

    @staticmethod
    def read_recipes(recipes: dict[int, List[int]]):
        with open('../tsv/rf5/map_itemid_to_recipe.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                ls = [int(x) for x in row[1:]]
                recipes[id] = ls

    @staticmethod
    def read_magics(magics: dict[int, str]):
        with open('../tsv/rf5/map_magicid_to_name_shiftjis.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                name = row[2]
                magics[id] = name

    @staticmethod
    def read_effects(effects: dict[int, RF5Effect]):
        with open('../tsv/rf5/map_itemid_to_effect_japanese_shiftjis.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                desc_jp = row[1]
                effects[id] = RF5Effect(id=id, desc_jp=desc_jp)

        with open('../tsv/rf5/map_itemid_to_effect_english.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                desc_en = row[1]
                effects[id].desc_en = desc_en



if __name__ == '__main__':
    
    category_ids:           set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_categoryid.tsv')
    item_ids:               set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_itemid.tsv')
    character_ids:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_characterid.tsv')

    is_eq_2hsword:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_2hsword.tsv')
    is_eq_accessory:        set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_accessory.tsv')
    is_eq_armor:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_armor.tsv')
    is_eq_axe:              set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_axe.tsv')
    is_eq_dualblades:       set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_dualblades.tsv')
    is_eq_farm_axe:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_axe.tsv')
    is_eq_farm_fishingpole: set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_fishingpole.tsv')
    is_eq_farm_hammer:      set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_hammer.tsv')
    is_eq_farm_hoe:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_hoe.tsv')
    is_eq_farm_sickle:      set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_sickle.tsv')
    is_eq_farm_waterpot:    set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_farm_waterpot.tsv')
    is_eq_fists:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_fists.tsv')
    is_eq_hammer:           set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_hammer.tsv')
    is_eq_headgear:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_headgear.tsv')
    is_eq_shield:           set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_shield.tsv')
    is_eq_shoes:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_shoes.tsv')
    is_eq_spear:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_spear.tsv')
    is_eq_staff:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_staff.tsv')
    is_eq_sword:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_eq_sword.tsv')
    is_eq_weapon:           set[int] = (is_eq_2hsword | is_eq_axe | is_eq_dualblades | is_eq_farm_axe
                                        | is_eq_farm_fishingpole | is_eq_farm_hammer | is_eq_farm_hoe
                                        | is_eq_farm_sickle | is_eq_farm_waterpot | is_eq_fists
                                        | is_eq_hammer | is_eq_spear  | is_eq_staff | is_eq_sword)
    is_equipment:           set[int] = (is_eq_weapon | is_eq_shield | is_eq_headgear | is_eq_armor
                                        | is_eq_shoes | is_eq_accessory)

    is_mat_2foldsteel:      set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_2foldsteel.tsv')
    is_mat_10foldsteel:     set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_10foldsteel.tsv')
    is_mat_clawsandfangs:   set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_clawsandfangs.tsv')
    is_mat_clothsandskins:  set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_clothsandskins.tsv')
    is_mat_core:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_core.tsv')
    is_mat_crystals:        set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_crystals.tsv')
    is_mat_elecrystals:      set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_elecrystals.tsv')
    is_mat_feathers:        set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_feathers.tsv')
    is_mat_furs:            set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_furs.tsv')
    is_mat_jewels:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_jewels.tsv')
    is_mat_lightore:        set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_lightore.tsv')
    is_mat_liquids:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_liquids.tsv')
    is_mat_minerals:        set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_minerals.tsv')
    is_mat_objectx:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_objectx.tsv')
    is_mat_powdersandspores: set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_powdersandspores.tsv')
    is_mat_scales:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_scales.tsv')
    is_mat_shards:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_shards.tsv')
    is_mat_shellsandbones:  set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_shellsandbones.tsv')
    is_mat_sticksandstems:  set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_sticksandstems.tsv')
    is_mat_stones:          set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_stones.tsv')
    is_mat_strings:         set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_strings.tsv')
    # Scales which provide scale bonus in shields.
    is_mat_truescale:       set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_is_mat_truescale.tsv')

    has_effect:             set[int] = TsvReader.read_set_tsv('../tsv/rf5/set_has_effect.tsv')


    categories:   dict[int, RF5Category] = {}
    items:        dict[int, RF5Item] = {}
    base_items:   dict[int, RF5Item] = {}
    characters:   dict[int, RF5Character] = {}
    recipes:      dict[int, List[int]] = {}
    magics:       dict[int, str] = {}
    effects:      dict[int, RF5Effect] = {}


    # All names and images
    TsvReader.read_category_names(category_ids, categories)
    TsvReader.read_item_names(item_ids, items)
    TsvReader.read_character_names(character_ids, characters)

    TsvReader.read_category_images(category_ids, categories)
    TsvReader.read_item_images(item_ids, items)
    TsvReader.read_character_images(character_ids, characters)

    # Raw stats
    TsvReader.read_item_stats('../tsv/rf5/map_itemid_to_strengthening_data.tsv', items)
    TsvReader.read_character_stats('../tsv/rf5/map_characterid_to_stats.tsv', characters)

    # Handle base item subset
    TsvReader.read_item_names(item_ids, base_items)
    TsvReader.read_item_images(item_ids, base_items)
    base_item_ids = TsvReader.read_item_stats('../tsv/rf5/map_itemid_to_baseitem_stats_data.tsv', base_items)
    
    for key in list(base_items.keys()):
        if not key in base_item_ids:
            base_items.pop(key, None)    

    # Item stats
    TsvReader.read_item_rarity(items)
    TsvReader.read_item_rarity_stat_type(items)
    TsvReader.read_item_weapon_element(items)
    TsvReader.read_item_crystal_element(items)
    TsvReader.read_item_magic(items)

    # Recipes
    TsvReader.read_recipes(recipes)

    # Magics
    TsvReader.read_magics(magics)

    # Special effects (boots + acce)
    TsvReader.read_effects(effects)

    # Link material groups
    categories[3000].item_ids = list(is_mat_minerals)
    categories[3001].item_ids = list(is_mat_liquids)
    categories[3002].item_ids = list(is_mat_clawsandfangs)
    categories[3003].item_ids = list(is_mat_sticksandstems)
    categories[3004].item_ids = list(is_mat_clothsandskins)
    categories[3005].item_ids = list(is_mat_furs)
    categories[3006].item_ids = list(is_mat_strings)
    categories[3007].item_ids = list(is_mat_shards)
    categories[3008].item_ids = list(is_mat_powdersandspores)
    categories[3009].item_ids = list(is_mat_scales)
    categories[3010].item_ids = list(is_mat_shellsandbones)
    categories[3011].item_ids = list(is_mat_stones)
    # categories[3012].item_ids = list(is_mat_turnips)
    categories[3013].item_ids = list(is_mat_crystals)
    categories[3014].item_ids = list(is_mat_jewels)
    categories[3015].item_ids = list(is_mat_feathers)
    # categories[3016].item_ids = list(is_mat_jam)
    # categories[3017].item_ids = list(is_mat_curry)
    # categories[3018].item_ids = list(is_mat_squid)
    # categories[3019].item_ids = list(is_mat_eggs)
    # categories[3020].item_ids = list(is_mat_milk)
    # categories[3021].item_ids = list(is_mat_mushrooms)


    def write_json(f, var_name: str, json: str):
        f.write('"' + var_name + '": ')
        f.write(json)
        f.write(',\n')

    def json_dump_object(obj: object) -> str:
        return json.dumps(obj, default=lambda o: o.__dict__, sort_keys=True, indent=2)

    filename: str = '../ts/rf5-rawdata.ts'
    variablename: str = '_RAWDATA'

    with open(filename, 'w+') as f:
        f.write('// File generated by Python script.\n')
        f.write('const ' +variablename+' = {\n')
        write_json(f, 'item_ids', json.dumps(sorted(list(item_ids))))
        write_json(f, 'category_ids', json.dumps(sorted(list(category_ids))))
        write_json(f, 'character_ids', json.dumps(sorted(list(character_ids))))
        write_json(f, 'is_eq_2hsword', json.dumps(sorted(list(is_eq_2hsword))))
        write_json(f, 'is_eq_accessory', json.dumps(sorted(list(is_eq_accessory))))
        write_json(f, 'is_eq_armor', json.dumps(sorted(list(is_eq_armor))))
        write_json(f, 'is_eq_axe', json.dumps(sorted(list(is_eq_axe))))
        write_json(f, 'is_eq_dualblades', json.dumps(sorted(list(is_eq_dualblades))))
        write_json(f, 'is_eq_farm_axe', json.dumps(sorted(list(is_eq_farm_axe))))
        write_json(f, 'is_eq_farm_fishingpole', json.dumps(sorted(list(is_eq_farm_fishingpole))))
        write_json(f, 'is_eq_farm_hammer', json.dumps(sorted(list(is_eq_farm_hammer))))
        write_json(f, 'is_eq_farm_hoe', json.dumps(sorted(list(is_eq_farm_hoe))))
        write_json(f, 'is_eq_farm_sickle', json.dumps(sorted(list(is_eq_farm_sickle))))
        write_json(f, 'is_eq_farm_waterpot', json.dumps(sorted(list(is_eq_farm_waterpot))))
        write_json(f, 'is_eq_fists', json.dumps(sorted(list(is_eq_fists))))
        write_json(f, 'is_eq_hammer', json.dumps(sorted(list(is_eq_hammer))))
        write_json(f, 'is_eq_headgear', json.dumps(sorted(list(is_eq_headgear))))
        write_json(f, 'is_eq_shield', json.dumps(sorted(list(is_eq_shield))))
        write_json(f, 'is_eq_shoes', json.dumps(sorted(list(is_eq_shoes))))
        write_json(f, 'is_eq_spear', json.dumps(sorted(list(is_eq_spear))))
        write_json(f, 'is_eq_staff', json.dumps(sorted(list(is_eq_staff))))
        write_json(f, 'is_eq_sword', json.dumps(sorted(list(is_eq_sword))))
        write_json(f, 'is_eq_weapon', json.dumps(sorted(list(is_eq_weapon))))
        write_json(f, 'is_equipment', json.dumps(sorted(list(is_equipment))))

        write_json(f, 'is_mat_2foldsteel', json.dumps(sorted(list(is_mat_2foldsteel))))
        write_json(f, 'is_mat_10foldsteel', json.dumps(sorted(list(is_mat_10foldsteel))))
        write_json(f, 'is_mat_clawsandfangs', json.dumps(sorted(list(is_mat_clawsandfangs))))
        write_json(f, 'is_mat_clothsandskins', json.dumps(sorted(list(is_mat_clothsandskins))))
        write_json(f, 'is_mat_core', json.dumps(sorted(list(is_mat_core))))
        write_json(f, 'is_mat_crystals', json.dumps(sorted(list(is_mat_crystals))))
        write_json(f, 'is_mat_elecrystals', json.dumps(sorted(list(is_mat_elecrystals))))
        write_json(f, 'is_mat_feathers', json.dumps(sorted(list(is_mat_feathers))))
        write_json(f, 'is_mat_furs', json.dumps(sorted(list(is_mat_furs))))
        write_json(f, 'is_mat_jewels', json.dumps(sorted(list(is_mat_jewels))))
        write_json(f, 'is_mat_lightore', json.dumps(sorted(list(is_mat_lightore))))
        write_json(f, 'is_mat_liquids', json.dumps(sorted(list(is_mat_liquids))))
        write_json(f, 'is_mat_minerals', json.dumps(sorted(list(is_mat_minerals))))
        write_json(f, 'is_mat_objectx', json.dumps(sorted(list(is_mat_objectx))))
        write_json(f, 'is_mat_powdersandspores', json.dumps(sorted(list(is_mat_powdersandspores))))
        write_json(f, 'is_mat_scales', json.dumps(sorted(list(is_mat_scales))))
        write_json(f, 'is_mat_shards', json.dumps(sorted(list(is_mat_shards))))
        write_json(f, 'is_mat_shellsandbones', json.dumps(sorted(list(is_mat_shellsandbones))))
        write_json(f, 'is_mat_sticksandstems', json.dumps(sorted(list(is_mat_sticksandstems))))
        write_json(f, 'is_mat_stones', json.dumps(sorted(list(is_mat_stones))))
        write_json(f, 'is_mat_strings', json.dumps(sorted(list(is_mat_strings))))
        write_json(f, 'is_mat_truescale', json.dumps(sorted(list(is_mat_truescale))))

        write_json(f, 'has_effect',  json.dumps(sorted(list(has_effect))))

        write_json(f, 'categories', json_dump_object(categories))
        write_json(f, 'items', json_dump_object(items))
        write_json(f, 'base_items', json_dump_object(base_items))
        write_json(f, 'characters', json_dump_object(characters))
        write_json(f, 'recipes', json_dump_object(recipes))
        write_json(f, 'magics', json_dump_object(magics))
        write_json(f, 'effects', json_dump_object(effects))

        f.write('};\n')
        f.write('export = '+variablename+';')
