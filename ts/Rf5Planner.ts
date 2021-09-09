import ko = require('knockout');
import RF5Character = require('./RF5Character');
import Utils = require('./Utils');

class RF5Planner {

    // Data
    readonly Item_ids:              object = {};
    readonly Category_ids:          object = {};
    readonly Character_ids:         object = {};
    readonly Is_eq_2hsword:         object = {};
    readonly Is_eq_accessory:       object = {};
    readonly Is_eq_armor:           object = {};
    readonly Is_eq_axe:             object = {};
    readonly Is_eq_dualblades:      object = {};
    readonly Is_eq_farm_axe:        object = {};
    readonly Is_eq_farm_fishingpole: object = {};
    readonly Is_eq_farm_hammer:     object = {};
    readonly Is_eq_farm_hoe:        object = {};
    readonly Is_eq_farm_sickle:     object = {};
    readonly Is_eq_farm_waterpot:   object = {};
    readonly Is_eq_fists:           object = {};
    readonly Is_eq_hammer:          object = {};
    readonly Is_eq_headgear:        object = {};
    readonly Is_eq_shield:          object = {};
    readonly Is_eq_shoes:           object = {};
    readonly Is_eq_spear:           object = {};
    readonly Is_eq_staff:           object = {};
    readonly Is_eq_sword:           object = {};
    readonly Is_mat_2foldsteel:     object = {};
    readonly Is_mat_10foldsteel:    object = {};
    readonly Is_mat_clawsandfangs:  object = {};
    readonly Is_mat_clothsandskins: object = {};
    readonly Is_mat_core:           object = {};
    readonly Is_mat_crystals:       object = {};
    readonly Is_mat_feathers:       object = {};
    readonly Is_mat_furs:           object = {};
    readonly Is_mat_jewels:         object = {};
    readonly Is_mat_lightore:       object = {};
    readonly Is_mat_liquids:        object = {};
    readonly Is_mat_minerals:       object = {};
    readonly Is_mat_objectx:        object = {};
    readonly Is_mat_powdersandspores: object = {};
    readonly Is_mat_scales:         object = {};
    readonly Is_mat_shards:         object = {};
    readonly Is_mat_shellsandbones: object = {};
    readonly Is_mat_sticksandstems: object = {};
    readonly Is_mat_stones:         object = {};
    readonly Is_mat_strings:        object = {};
    readonly Categories:            object = {};
    readonly Items:                 object = {};
    readonly Characters:            object = {};

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean> = ko.observable(true);
    readonly IsJapaneseSelected: ko.Observable<boolean> = ko.observable(true);
    readonly CharacterList: ko.ObservableArray<RF5Character>;

    // Utils
    readonly Utils: Utils;


    protected ArrayToObject(obj: any, arr: number[]): void {
        for (const val of arr) {
            obj[val.toString()] = undefined;
        }
    }

    constructor(DATA: any) {

        // Data
        this.ArrayToObject(this.Item_ids, DATA.item_ids);
        this.ArrayToObject(this.Category_ids, DATA.category_ids);
        this.ArrayToObject(this.Character_ids, DATA.character_ids);
        this.ArrayToObject(this.Is_eq_2hsword, DATA.is_eq_2hsword);
        this.ArrayToObject(this.Is_eq_accessory, DATA.is_eq_accessory);
        this.ArrayToObject(this.Is_eq_armor, DATA.is_eq_armor);
        this.ArrayToObject(this.Is_eq_axe, DATA.is_eq_axe);
        this.ArrayToObject(this.Is_eq_dualblades, DATA.is_eq_dualblades);
        this.ArrayToObject(this.Is_eq_farm_axe, DATA.is_eq_farm_axe);
        this.ArrayToObject(this.Is_eq_farm_fishingpole, DATA.is_eq_farm_fishingpole);
        this.ArrayToObject(this.Is_eq_farm_hammer, DATA.is_eq_farm_hammer);
        this.ArrayToObject(this.Is_eq_farm_hoe, DATA.is_eq_farm_hoe);
        this.ArrayToObject(this.Is_eq_farm_sickle, DATA.is_eq_farm_sickle);
        this.ArrayToObject(this.Is_eq_farm_waterpot, DATA.is_eq_farm_waterpot);
        this.ArrayToObject(this.Is_eq_fists, DATA.is_eq_fists);
        this.ArrayToObject(this.Is_eq_hammer, DATA.is_eq_hammer);
        this.ArrayToObject(this.Is_eq_headgear, DATA.is_eq_headgear);
        this.ArrayToObject(this.Is_eq_shield, DATA.is_eq_shield);
        this.ArrayToObject(this.Is_eq_shoes, DATA.is_eq_shoes);
        this.ArrayToObject(this.Is_eq_spear, DATA.is_eq_spear);
        this.ArrayToObject(this.Is_eq_staff, DATA.is_eq_staff);
        this.ArrayToObject(this.Is_eq_sword, DATA.is_eq_sword);
        this.ArrayToObject(this.Is_mat_2foldsteel, DATA.is_mat_2foldsteel);
        this.ArrayToObject(this.Is_mat_10foldsteel, DATA.is_mat_10foldsteel);
        this.ArrayToObject(this.Is_mat_clawsandfangs, DATA.is_mat_clawsandfangs);
        this.ArrayToObject(this.Is_mat_clothsandskins, DATA.is_mat_clothsandskins);
        this.ArrayToObject(this.Is_mat_core, DATA.is_mat_core);
        this.ArrayToObject(this.Is_mat_crystals, DATA.is_mat_crystals);
        this.ArrayToObject(this.Is_mat_feathers, DATA.is_mat_feathers);
        this.ArrayToObject(this.Is_mat_furs, DATA.is_mat_furs);
        this.ArrayToObject(this.Is_mat_jewels, DATA.is_mat_jewels);
        this.ArrayToObject(this.Is_mat_lightore, DATA.is_mat_lightore);
        this.ArrayToObject(this.Is_mat_liquids, DATA.is_mat_liquids);
        this.ArrayToObject(this.Is_mat_minerals, DATA.is_mat_minerals);
        this.ArrayToObject(this.Is_mat_objectx, DATA.is_mat_objectx);
        this.ArrayToObject(this.Is_mat_powdersandspores, DATA.is_mat_powdersandspores);
        this.ArrayToObject(this.Is_mat_scales, DATA.is_mat_scales);
        this.ArrayToObject(this.Is_mat_shards, DATA.is_mat_shards);
        this.ArrayToObject(this.Is_mat_shellsandbones, DATA.is_mat_shellsandbones);
        this.ArrayToObject(this.Is_mat_sticksandstems, DATA.is_mat_sticksandstems);
        this.ArrayToObject(this.Is_mat_stones, DATA.is_mat_stones);
        this.ArrayToObject(this.Is_mat_strings, DATA.is_mat_strings);
        this.Categories = DATA.categories;
        this.Items = DATA.items;
        this.Characters = DATA.characters;

        // Model
        this.CharacterList = ko.observableArray([]);

        // Utils
        this.Utils = new Utils();


        this.AddCharacter.call(this);
    }

    public AddCharacter = (): void => {
        this.CharacterList.push(new RF5Character(this));
        console.log('add character');
    }

    public DisplayFirstCharacterSheet = (): void => {
        var elem: Element | null = document.querySelector('#character-tabs button');
        if(elem !== null) {
            (elem as HTMLElement).click();
        }
    }


    // Handlers

    protected OnGroupClickHelper = (character_idx: string, ui_class: UiEquipmentType): boolean => {
        var elems: NodeListOf<Element> = document.querySelectorAll('.char-'+ character_idx +'-'+ ui_class +'-toggler');
        for (let i=0; i<elems.length; i++) {
            const elem = elems[i];
            if(! elem.classList.contains('collapsed')) {
                (elem as HTMLElement).click();
            }
        }
        return true;
    }

    // Collapses all sub-rows when weapon group is closed. No recursion necessary
    // as there are only two layers.
    public OnWeaponGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "weapon");
    }
    public OnShieldGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "shield");
    }
    public OnHeadgearGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "headgear");
    }
    public OnArmorGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "armor");
    }
    public OnBootsGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "boots");
    }
    public OnAccessoryGroupClickHandler = (character_idx: string, event: any, ui: any): boolean => {
        return this.OnGroupClickHelper(character_idx, "accessory");
    }


}
export = RF5Planner;