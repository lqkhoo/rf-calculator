export {};
declare global {

    type EquipmentType = "weapon" | "shield" | "headgear" | "armor" | "boots" | "accessory";
    type WeaponType = "2hsword" | "axe" | "dualblades" | "fists" | "hammer" | "spear" | "staff" | "sword"
                        | "farm_axe" | "farm_fishingpole" | "farm_hammer" | "farm_hoe" | "farm_sickle" | "farm_waterpot";

    type ElementType = "FIREWATER" | "EARTHWIND" | "FIRE" | "WATER" | "EARTH" | "WIND" | "LIGHT" | "DARK" | "LOVE" | "NONE";
    type DualSmithBonusType = "NONE"|"ATK"|"DEF"|"MAT"|"MDF"|"STR"|"INT"|"VIT"|"CRT"|"STN"|"DEF_FIR"|"DEF_WTR"|"DEF_EAR"|"DEF_WND"|"DEF_LGT"|"DEF_DRK"; // no LOV or NUL

    type StatVectorKey = "id"
                        | "name_en"
                        | "name_jp"
                        | "image_uri"
                        | "level"
                        | "rarity"
                        | "stat_ATK"
                        | "stat_DEF"
                        | "stat_MAT"
                        | "stat_MDF"
                        | "stat_STR"
                        | "stat_INT"
                        | "stat_VIT"
                        | "stat_atk_CRT"
                        | "stat_atk_KNO"
                        | "stat_atk_STN"
                        | "stat_atk_DIZ"
                        | "stat_atk_PSN"
                        | "stat_atk_SEA"
                        | "stat_atk_PAR"
                        | "stat_atk_SLP"
                        | "stat_atk_FTG"
                        | "stat_atk_SCK"
                        | "stat_atk_FNT"
                        | "stat_atk_DRN"
                        | "stat_def_ele_FIRE"
                        | "stat_def_ele_WATER"
                        | "stat_def_ele_EARTH"
                        | "stat_def_ele_WIND"
                        | "stat_def_ele_LIGHT"
                        | "stat_def_ele_DARK"
                        | "stat_def_ele_LOVE"
                        | "stat_def_ele_VOID"
                        | "stat_def_CRT"
                        | "stat_def_KNO"
                        | "stat_def_STN"
                        | "stat_def_DIZ"
                        | "stat_def_PSN"
                        | "stat_def_SEA"
                        | "stat_def_PAR"
                        | "stat_def_SLP"
                        | "stat_def_FTG"
                        | "stat_def_SCK"
                        | "stat_def_FNT"
                        | "stat_def_DRN"
                        | "stat_chargespeed"
                        | "stat_attacklength";

}

