from __future__ import annotations
from typing import List, Set
import csv
from dataclasses import dataclass

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
    stat_atk_DIZ: float = 0
    stat_atk_STN: float = 0
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
    stat_def_STN: float = 0   # In RF5/RF4 data these two rows are always swapped
    stat_def_KNO: float = 0
    stat_def_DIZ: float = 0
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
    stat_atk_DIZ: float = 0
    stat_atk_STN: float = 0
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
    stat_def_STN: float = 0   # In RF5/RF4 data these two rows are always swapped
    stat_def_KNO: float = 0
    stat_def_DIZ: float = 0
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
    def read_category_names(category_ids: set[int],
                            categories: dict[int, RF5Category],
                            path_categoryid_to_english_name: str,
                            path_categoryid_to_japanese_name: str):

        with open(path_categoryid_to_english_name) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    categories[id] = RF5Category(_id=id)
                category = categories[id]
                category.name_en = name_en
        
        with open(path_categoryid_to_japanese_name) as f:
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
    def read_item_names(item_ids: set[int],
                        items: dict[int, RF5Item],
                        path_itemid_to_english_name: str,
                        path_itemid_to_japanese_name: str):

        with open(path_itemid_to_english_name) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    items[id] = RF5Item(id=id)
                item = items[id]
                item.name_en = name_en
        
        with open(path_itemid_to_japanese_name) as f:
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
    def read_character_names(character_ids: set[int],
                            characters: dict[int, RF5Character],
                            path_characterid_to_english_name: str,
                            path_characterid_to_japanese_name: str):

        with open(path_characterid_to_english_name) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in characters.keys():
                    characters[id] = RF5Character(id=id)
                item = characters[id]
                item.name_en = name_en
        
        with open(path_characterid_to_japanese_name) as f:
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
    def read_category_images(category_ids: set[int],
                            categories: dict[int, RF5Category],
                            path_categoryid_to_image: str):
        
        with open(path_categoryid_to_image) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    raise KeyError(id) # This should not happen.
                category = categories[id]
                category.image_uri = image_uri

    @staticmethod
    def read_item_images(item_ids: set[int],
                        items: dict[int, RF5Item],
                        path_itemid_to_image: str):
        
        with open(path_itemid_to_image) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    raise KeyError(id) # This should not happen.
                item = items[id]
                item.image_uri = image_uri

    @staticmethod
    def read_character_images(character_ids: set[int],
                                characters: dict[int, RF5Character],
                                path_characterid_to_icon: str,
                                path_characterid_to_sprites: str):
        
        with open(path_characterid_to_icon) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, image_uri) = TsvReader.parse_name_tsv_row(row)
                if id not in characters.keys():
                    raise KeyError(id) # This should not happen.
                character = characters[id]
                character.image_uri = image_uri

        with open(path_characterid_to_sprites) as f:
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
                character.stat_atk_DIZ = float(row[10]) # labeled as knockback time in data dump
                character.stat_atk_STN = float(row[11]) # labered as stun in data dump
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
                character.stat_def_STN = float(row[28])
                character.stat_def_CRT = float(row[29])
                character.stat_def_KNO = float(row[30])
                character.stat_def_DIZ = float(row[31]) # labeled as knockback time in data dump
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
                item.stat_atk_DIZ = float(row[10]) # labeled as knockback time in data dump
                item.stat_atk_STN = float(row[11])
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
                item.stat_def_STN = float(row[28]) # labeled as stun in data dump
                item.stat_def_CRT = float(row[29])
                item.stat_def_KNO = float(row[30])
                item.stat_def_DIZ = float(row[31]) # labeled as knockback time in data dump
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
    def read_item_rarity(items: dict[int, RF5Item], path_itemid_to_rarity: str):
        with open(path_itemid_to_rarity) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.rarity = int(row[1])

    @staticmethod
    def read_item_rarity_stat_type(items: dict[int, RF5Item], path_itemid_to_rarity_stat_type: str):
        with open(path_itemid_to_rarity_stat_type) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.rarity_stat_type = row[1] # str

    @staticmethod
    def read_item_weapon_element(items: dict[int, RF5Item], path_itemid_to_weapon_element: str):
        with open(path_itemid_to_weapon_element) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.element = row[1]

    @staticmethod
    def read_item_crystal_element(items: dict[int, RF5Item], path_itemid_to_crystal_element: str):
        with open(path_itemid_to_crystal_element) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.element = row[1]

    @staticmethod
    def read_item_magic(items: dict[int, RF5Item], path_itemid_to_magicid: str):
        with open(path_itemid_to_magicid) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                item = items[id]
                item.magic_charge1 = int(row[1])
                item.magic_charge2 = int(row[2])
                item.magic_charge3 = int(row[3])

    @staticmethod
    def read_recipes(recipes: dict[int, List[int]], path_itemid_to_recipe: str):
        with open(path_itemid_to_recipe) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                ls = [int(x) for x in row[1:]]
                recipes[id] = ls

    @staticmethod
    def read_magics(magics: dict[int, str], path_magicid_to_name: str):
        with open(path_magicid_to_name) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                name = row[2]
                magics[id] = name

    @staticmethod
    def read_effects(effects: dict[int, RF5Effect], path_itemid_to_effect_japanese: str, path_itemid_to_effect_english):
        with open(path_itemid_to_effect_japanese) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                desc_jp = row[1]
                effects[id] = RF5Effect(id=id, desc_jp=desc_jp)

        with open(path_itemid_to_effect_english) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                id = int(row[0])
                desc_en = row[1]
                effects[id].desc_en = desc_en