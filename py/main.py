from __future__ import annotations
from typing import List
import csv
from dataclasses import dataclass
from pprint import pprint


@dataclass
class RF5Category(object):
    item_id: int
    name_en: str = ''
    name_jp: str = ''


@dataclass
class RF5Item(object):
    """This is a 'row' in an item. Think of it as an upgrade ingredient."""
    item_id: int
    name_en: str = ''
    name_jp: str = ''

    rarity: int = 0
    level: int = 10 # Default to max
    rarity_stat_type: str = 'NONE' # stat upgrade from rarity bonus.

    element: str = 'NONE' # weapon element

    # Equipment stats. These are combined
    # base stats / upgrade stats because they
    # are mutually-exclusive.
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
    stat_atk_KNOTM: float = 0 # knockback time
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
    stat_def_CRT: float = 0
    stat_def_KNO: float = 0
    stat_def_KNOTM: float = 0
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
    def read_itemids() -> set[int]:
        item_ids: set = set()
        with open('../tsv/set_itemid.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_ids.add(int(row[0]))
        return item_ids


    @staticmethod
    def read_categoryids() -> set[int]:
        category_ids: set = set()
        with open('../tsv/set_categoryid.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                category_ids.add(int(row[0]))
        return category_ids


    @staticmethod
    def parse_name_tsv_row(row: List[str]) -> List[object]:
        ls: List[object] = [int(row[0]), row[1]]
        return ls


    @staticmethod
    def read_category_names(category_ids: set[int], categories: dict[int, RF5Category]):

        with open('../tsv/map_categoryid_to_english_name.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in categories.keys():
                    categories[id] = RF5Category(item_id=id)
                category = categories[id]
                category.name_en = name_en
        
        with open('../tsv/map_categoryid_to_japanese_name_shiftjis.tsv') as f:
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

        with open('../tsv/map_itemid_to_english_name.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                (id, name_en) = TsvReader.parse_name_tsv_row(row)
                if id not in items.keys():
                    items[id] = RF5Item(item_id=id)
                item = items[id]
                item.name_en = name_en
        
        with open('../tsv/map_itemid_to_japanese_name_shiftjis.tsv') as f:
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
    def read_item_stats(filepath: str, items: dict[int, RF5Item]):

        with open(filepath) as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id: int = int(row[0])
                item: RF5Item = items[item_id]
                item.stat_ATK = int(row[1])
                item.stat_DEF = int(row[2])
                item.stat_MAT = int(row[3])
                item.stat_MDF = int(row[4])
                item.stat_STR = int(row[5])
                item.stat_INT = int(row[6])
                item.stat_VIT = int(row[7])
                item.stat_atk_CRT = float(row[8])
                item.stat_atk_KNO = float(row[9])
                item.stat_atk_KNOTM = float(row[10])
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
                item.stat_def_STN = float(row[28])
                item.stat_def_CRT = float(row[29])
                item.stat_def_KNO = float(row[30])
                item.stat_def_KNOTM = float(row[31])
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
        
        return items
        
    @staticmethod
    def read_item_rarity(items: dict[int, RF5Item]):
        with open('../tsv/map_itemid_to_rarity.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id = int(row[0])
                item = items[item_id]
                item.rarity = int(row[1])

    @staticmethod
    def read_item_rarity_stat_type(items: dict[int, RF5Item]):
        with open('../tsv/map_itemid_to_rarity_stat_type.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id = int(row[0])
                item = items[item_id]
                item.rarity_stat_type = row[1] # str

    @staticmethod
    def read_item_weapon_element(items: dict[int, RF5Item]):
        with open('../tsv/map_itemid_to_weapon_element.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id = int(row[0])
                item = items[item_id]
                item.element = row[1]

    @staticmethod
    def read_item_crystal_element(items: dict[int, RF5Item]):
        with open('../tsv/map_itemid_to_crystal_element.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id = int(row[0])
                item = items[item_id]
                item.element = row[1]

    @staticmethod
    def read_item_magic(items: dict[int, RF5Item]):
        with open('../tsv/map_itemid_to_magic.tsv') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                item_id = int(row[0])
                item = items[item_id]
                item.magic_charge1 = int(row[1])
                item.magic_charge2 = int(row[2])
                item.magic_charge3 = int(row[3])


if __name__ == '__main__':
    
    item_ids:     set[int] = TsvReader.read_itemids()
    category_ids: set[int] = TsvReader.read_categoryids()

    categories:   dict[int, RF5Category] = {}
    items:        dict[int, RF5Item] = {}

    # Names
    TsvReader.read_category_names(category_ids, categories)
    TsvReader.read_item_names(item_ids, items)

    # Raw stats
    TsvReader.read_item_stats('../tsv/map_itemid_to_baseitem_stats_data.tsv', items)
    TsvReader.read_item_stats('../tsv/map_itemid_to_strengthening_data.tsv', items)

    TsvReader.read_item_rarity(items)
    TsvReader.read_item_rarity_stat_type(items)
    TsvReader.read_item_weapon_element(items)
    TsvReader.read_item_crystal_element(items)
    TsvReader.read_item_magic(items)

    
