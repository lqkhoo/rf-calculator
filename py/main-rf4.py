from __future__ import annotations
from typing import List, Set
from dataclasses import dataclass
import math
import json
from pprint import pprint

from common import (RF5Category, RF5Effect, RF5Character, RF5Item, TsvReader)

if __name__ == '__main__':
    
    category_ids:           set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_categoryid.tsv')
    item_ids:               set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_itemid.tsv')
    character_ids:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_characterid.tsv')

    is_eq_2hsword:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_2hsword.tsv')
    is_eq_accessory:        set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_accessory.tsv')
    is_eq_armor:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_armor.tsv')
    is_eq_axe:              set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_axe.tsv')
    is_eq_dualblades:       set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_dualblades.tsv')
    is_eq_farm_axe:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_axe.tsv')
    is_eq_farm_fishingpole: set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_fishingpole.tsv')
    is_eq_farm_hammer:      set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_hammer.tsv')
    is_eq_farm_hoe:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_hoe.tsv')
    is_eq_farm_sickle:      set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_sickle.tsv')
    is_eq_farm_waterpot:    set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_farm_waterpot.tsv')
    is_eq_fists:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_fists.tsv')
    is_eq_hammer:           set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_hammer.tsv')
    is_eq_headgear:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_headgear.tsv')
    is_eq_shield:           set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_shield.tsv')
    is_eq_shoes:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_shoes.tsv')
    is_eq_spear:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_spear.tsv')
    is_eq_staff:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_staff.tsv')
    is_eq_sword:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_eq_sword.tsv')
    is_eq_weapon:           set[int] = (is_eq_2hsword | is_eq_axe | is_eq_dualblades | is_eq_farm_axe
                                        | is_eq_farm_fishingpole | is_eq_farm_hammer | is_eq_farm_hoe
                                        | is_eq_farm_sickle | is_eq_farm_waterpot | is_eq_fists
                                        | is_eq_hammer | is_eq_spear  | is_eq_staff | is_eq_sword)
    is_equipment:           set[int] = (is_eq_weapon | is_eq_shield | is_eq_headgear | is_eq_armor
                                        | is_eq_shoes | is_eq_accessory)

    is_mat_2foldsteel:      set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_2foldsteel.tsv')
    is_mat_10foldsteel:     set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_10foldsteel.tsv')
    is_mat_clawsandfangs:   set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_clawsandfangs.tsv')
    is_mat_clothsandskins:  set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_clothsandskins.tsv')
    is_mat_core:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_core.tsv')
    is_mat_crystals:        set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_crystals.tsv')
    is_mat_elecrystals:     set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_elecrystals.tsv')
    is_mat_feathers:        set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_feathers.tsv')
    is_mat_furs:            set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_furs.tsv')
    is_mat_jewels:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_jewels.tsv')
    is_mat_lightore:        set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_lightore.tsv')
    is_mat_liquids:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_liquids.tsv')
    is_mat_minerals:        set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_minerals.tsv')
    is_mat_objectx:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_objectx.tsv')
    is_mat_powdersandspores:set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_powdersandspores.tsv')
    is_mat_scales:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_scales.tsv')
    is_mat_shards:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_shards.tsv')
    is_mat_shellsandbones:  set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_shellsandbones.tsv')
    is_mat_sticksandstems:  set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_sticksandstems.tsv')
    is_mat_stones:          set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_stones.tsv')
    is_mat_strings:         set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_strings.tsv')
    # Scales which provide scale bonus in shields.
    is_mat_truescale:       set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_is_mat_truescale.tsv')

    has_effect:             set[int] = TsvReader.read_set_tsv('../tsv/rf4/set_has_effect.tsv')


    categories:   dict[int, RF5Category] = {}
    items:        dict[int, RF5Item] = {}
    base_items:   dict[int, RF5Item] = {}
    characters:   dict[int, RF5Character] = {}
    recipes:      dict[int, List[int]] = {}
    magics:       dict[int, str] = {}
    effects:      dict[int, RF5Effect] = {}


    TsvReader.read_item_names(item_ids, items, '../tsv/rf4/map_itemid_to_english_name.tsv', '../tsv/rf4/map_itemid_to_japanese_name_shiftjis.tsv')
    TsvReader.read_item_images(item_ids, items, '../tsv/rf4/map_itemid_to_image.tsv')
    TsvReader.read_item_stats('../tsv/rf4/map_itemid_to_strengthening_data.tsv', items)

    # Handle base item subset
    TsvReader.read_item_names(item_ids, base_items, '../tsv/rf4/map_itemid_to_english_name.tsv', '../tsv/rf4/map_itemid_to_japanese_name_shiftjis.tsv')
    TsvReader.read_item_images(item_ids, base_items, '../tsv/rf4/map_itemid_to_image.tsv')
    base_item_ids = TsvReader.read_item_stats('../tsv/rf4/map_itemid_to_baseitem_stats_data.tsv', base_items)
    
    for key in list(base_items.keys()):
        if not key in base_item_ids:
            base_items.pop(key, None)   

    TsvReader.read_category_names(category_ids, categories, '../tsv/rf4/map_categoryid_to_english_name.tsv', '../tsv/rf4/map_categoryid_to_japanese_name_shiftjis.tsv')
    TsvReader.read_category_images(category_ids, categories, '../tsv/rf4/map_categoryid_to_image.tsv')

    TsvReader.read_character_names(character_ids, characters, '../tsv/rf4/map_characterid_to_english_name.tsv', '../tsv/rf4/map_characterid_to_japanese_name_shiftjis.tsv')
    TsvReader.read_character_images(character_ids, characters, '../tsv/rf4/map_characterid_to_icon.tsv', '../tsv/rf4/map_characterid_to_sprites.tsv')
    TsvReader.read_character_stats('../tsv/rf4/map_characterid_to_stats.tsv', characters)

    # Full item stats
    TsvReader.read_item_rarity(items, '../tsv/rf4/map_itemid_to_rarity.tsv')
    TsvReader.read_item_rarity_stat_type(items, '../tsv/rf4/map_itemid_to_rarity_stat_type.tsv')
    TsvReader.read_item_weapon_element(items, '../tsv/rf4/map_itemid_to_weapon_element.tsv')
    TsvReader.read_item_crystal_element(items, '../tsv/rf4/map_itemid_to_crystal_element.tsv')
    TsvReader.read_item_magic(items, '../tsv/rf4/map_itemid_to_magicid.tsv')

    # Recipes
    TsvReader.read_recipes(recipes, '../tsv/rf4/map_itemid_to_recipe.tsv')

    # Magics
    TsvReader.read_magics(magics, '../tsv/rf4/map_magicid_to_name_shiftjis.tsv')

    # Special effects (boots + acce)
    TsvReader.read_effects(effects, '../tsv/rf4/map_itemid_to_effect_japanese_shiftjis.tsv', '../tsv/rf4/map_itemid_to_effect_english.tsv')

    # Link material groups
    categories[1083].item_ids = list(is_mat_minerals)
    categories[1084].item_ids = list(is_mat_liquids)
    categories[1085].item_ids = list(is_mat_clawsandfangs)
    categories[1086].item_ids = list(is_mat_sticksandstems)
    categories[1087].item_ids = list(is_mat_clothsandskins)
    categories[1088].item_ids = list(is_mat_furs)
    categories[1089].item_ids = list(is_mat_strings)
    categories[1090].item_ids = list(is_mat_shards)
    categories[1091].item_ids = list(is_mat_powdersandspores)
    categories[1092].item_ids = list(is_mat_scales)
    categories[1093].item_ids = list(is_mat_shellsandbones)
    categories[1094].item_ids = list(is_mat_stones)
    # categories[1095].item_ids = list(is_mat_turnips)
    categories[1096].item_ids = list(is_mat_crystals)
    categories[1097].item_ids = list(is_mat_jewels)
    categories[1098].item_ids = list(is_mat_feathers)
    # categories[1099].item_ids = list(is_mat_jam)
    # categories[1100].item_ids = list(is_mat_curry)
    # categories[1101].item_ids = list(is_mat_squid)


    def write_json(f, var_name: str, json: str):
        f.write('"' + var_name + '": ')
        f.write(json)
        f.write(',\n')

    def json_dump_object(obj: object) -> str:
        return json.dumps(obj, default=lambda o: o.__dict__, sort_keys=True, indent=2)

    def write_rawdata(path_output: str, variablename: str):
        with open(path_output, 'w+') as f:
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


    def html_row_template(item: RF5Item):

        def get_row_class(itemid: int):
            ls = []
            if(itemid in is_equipment): ls.append("equipment")
            if(itemid in is_eq_weapon): ls.append("weapon")
            if(itemid in is_eq_shield): ls.append("shield")
            if(itemid in is_eq_headgear): ls.append("headgear")
            if(itemid in is_eq_armor): ls.append("armor")
            if(itemid in is_eq_shoes): ls.append("boots")
            if(itemid in is_eq_accessory): ls.append("accessory")
            if(itemid in is_eq_2hsword): ls.append("sword2h")
            if(itemid in is_eq_axe): ls.append("axe")
            if(itemid in is_eq_dualblades): ls.append("dualblades")
            if(itemid in is_eq_fists): ls.append("fists")
            if(itemid in is_eq_hammer): ls.append("hammer")
            if(itemid in is_eq_spear): ls.append("spear")
            if(itemid in is_eq_staff): ls.append("staff")
            if(itemid in is_eq_sword): ls.append("sword")
            if(itemid in is_eq_farm_axe): ls.append("farmAxe")
            if(itemid in is_eq_farm_fishingpole): ls.append("farmFishingPole")
            if(itemid in is_eq_farm_hammer): ls.append("farmHammer")
            if(itemid in is_eq_farm_hoe): ls.append("farmHoe")
            if(itemid in is_eq_farm_sickle): ls.append("farmSickle")
            if(itemid in is_eq_farm_waterpot): ls.append("farmWaterpot")
            if(itemid not in is_equipment): ls.append("material")
            if(itemid in is_mat_clawsandfangs): ls.append("clawsAndFangs")
            if(itemid in is_mat_clothsandskins): ls.append("clothsAndSkins")
            if(itemid in is_mat_crystals): ls.append("crystals")
            if(itemid in is_mat_feathers): ls.append("feathers")
            if(itemid in is_mat_furs): ls.append("furs")
            if(itemid in is_mat_jewels): ls.append("jewels")
            if(itemid in is_mat_liquids): ls.append("liquids")
            if(itemid in is_mat_minerals): ls.append("minerals")
            if(itemid in is_mat_powdersandspores): ls.append("powdersAndSpores")
            if(itemid in is_mat_scales): ls.append("scales")
            if(itemid in is_mat_shards): ls.append("shards")
            if(itemid in is_mat_shellsandbones): ls.append("shellsAndBones")
            if(itemid in is_mat_sticksandstems): ls.append("sticksAndStems")
            if(itemid in is_mat_stones): ls.append("stones")
            if(itemid in is_mat_strings): ls.append("strings")
            cls = ""
            for i in range(len(ls)):
                cls += ls[i]
                if(i != len(ls)-1):
                    cls += " "
            return cls
        
        def get_cell(value, isPercent: bool=True, isWide: bool=False):
            value = float(value)
            if value == 0:
                val = ""
                cls = 'class="wide"' if isWide else ""
            elif value > 0:
                val = value*100 if isPercent else value
                cls = 'class="wide"' if isWide else ""
            else:
                val = value*100 if isPercent else value
                cls = 'class="wide negative"' if isWide else 'class="negative"'
            if(type(val) != str):
                valInt = math.floor(val)
                if(val == valInt):
                    val = str(valInt)
                else:
                    val = "{0:.2f}".format(val)

            return """<td {}>{}</td>""".format(cls, val)

        return """                <tr class="item-table-entry {}">
                    <td>
                        <label class="icon-group small">
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td class="icon-td"><img class="icon small" src="{}" /></td>
                                        <td><span class="lang jp">{}</span><span class="lang en">{}</span></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </label>
                    </td>
                    {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}
                </tr>\n""".format(
                    get_row_class(item.id),
                    item.image_uri,
                    item.name_jp,
                    item.name_en,
                    get_cell(item.id, isPercent=False, isWide=True),
                    get_cell(item.rarity, isPercent=False),
                    get_cell(item.stat_ATK, isPercent=False, isWide=True),
                    get_cell(item.stat_DEF, isPercent=False, isWide=True),
                    get_cell(item.stat_MAT, isPercent=False, isWide=True),
                    get_cell(item.stat_MDF, isPercent=False, isWide=True),
                    get_cell(item.stat_STR, isPercent=False, isWide=True),
                    get_cell(item.stat_INT, isPercent=False, isWide=True),
                    get_cell(item.stat_VIT, isPercent=False, isWide=True),
                    get_cell(item.stat_atk_STN),
                    get_cell(item.stat_atk_CRT),
                    get_cell(item.stat_atk_KNO),
                    get_cell(item.stat_atk_DIZ),
                    get_cell(item.stat_atk_PSN),
                    get_cell(item.stat_atk_SEA),
                    get_cell(item.stat_atk_PAR),
                    get_cell(item.stat_atk_SLP),
                    get_cell(item.stat_atk_FTG),
                    get_cell(item.stat_atk_SCK),
                    get_cell(item.stat_atk_FNT),
                    get_cell(item.stat_atk_DRN),
                    get_cell(item.stat_def_ele_FIRE),
                    get_cell(item.stat_def_ele_WATER),
                    get_cell(item.stat_def_ele_EARTH),
                    get_cell(item.stat_def_ele_WIND),
                    get_cell(item.stat_def_ele_LIGHT),
                    get_cell(item.stat_def_ele_DARK),
                    get_cell(item.stat_def_ele_LOVE),
                    get_cell(item.stat_def_ele_VOID),
                    get_cell(item.stat_def_STN),
                    get_cell(item.stat_def_CRT),
                    get_cell(item.stat_def_KNO),
                    get_cell(item.stat_def_DIZ),
                    get_cell(item.stat_def_PSN),
                    get_cell(item.stat_def_SEA),
                    get_cell(item.stat_def_PAR),
                    get_cell(item.stat_def_SLP),
                    get_cell(item.stat_def_FTG),
                    get_cell(item.stat_def_SCK),
                    get_cell(item.stat_def_FNT),
                    get_cell(item.stat_def_DRN),
                    get_cell(item.stat_chargespeed, isPercent=False),
                    get_cell(item.stat_attacklength, isPercent=False),
                    get_cell(item.magic_charge1, isPercent=False),
                    get_cell(item.magic_charge2, isPercent=False),
                    get_cell(item.magic_charge3, isPercent=False),
                )

    def write_data_html(path_input: str, path_output: str):
        with open(path_input, 'r', encoding='utf-8') as f_in, open(path_output, 'w+', encoding='utf-8') as f_out:
            for line in f_in:
                f_out.write(line)
                if('PYTHON-SCRIPT-INSERTION-POINT-BASEITEM-TABLE' in line):
                    for itemid in base_items.keys():
                        f_out.write(html_row_template(base_items[itemid]))
                elif ('PYTHON-SCRIPT-INSERTION-POINT-UPGRADE-TABLE' in line):
                    for itemid in item_ids:
                        f_out.write(html_row_template(items[itemid]))


    write_rawdata(path_output='../ts/rf4-rawdata.ts', variablename='_RAWDATA')
    write_data_html(path_input='../rf4-data-base.html', path_output='../rf4-data.html')


