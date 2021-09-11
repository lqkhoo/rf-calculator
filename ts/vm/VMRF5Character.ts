import _ = require('lodash');
import ko = require('knockout');
// Model
import IRF5Item = require('../model/IRF5Item');
import IRF5Character = require('../model/IRF5Character');
// Super
import IVMRF5Slot = require('./IVMRF5Slot');
// Data
import Data = require('../model/Data');
import Utils = require('../Utils');


class VMRF5Character implements IVMRF5Slot {

    readonly Model: IRF5Character;
    static readonly SearchStringsCache: any[] = [];

    readonly IsItemGroupCollapsed: Record<EquipmentType, ko.Observable<boolean>>;

    constructor(model: IRF5Character) {
        this.Model = model;

        this.IsItemGroupCollapsed = {
            "weapon":    ko.observable(false),
            "shield":    ko.observable(true),
            "headgear":  ko.observable(true),
            "armor":     ko.observable(true),
            "boots":     ko.observable(true),
            "accessory": ko.observable(true)
        }
    }

    public ToggleGroupHeaderCollapsedState = (equipmentType: EquipmentType): boolean => {
        const isCollapsed: boolean = this.IsItemGroupCollapsed[equipmentType]();
        this.IsItemGroupCollapsed[equipmentType](! isCollapsed);

        for (const rf5Item of this.GetItemGroup(equipmentType)) {
            rf5Item.ViewModel.SetCollapsedState(!isCollapsed, !isCollapsed);
        }
        return ! isCollapsed;
    }

    protected GetItemGroup = (equipmentType: EquipmentType): IRF5Item[] => {
        switch(equipmentType) {
            case "weapon": return this.Model.Weapons();
            case "shield": return this.Model.Shields();
            case "headgear": return this.Model.Headgears();
            case "armor": return this.Model.Armors();
            case "boots": return this.Model.Boots();
            case "accessory": return this.Model.Accessories();
        }
    }

    // Autocomplete

    protected CacheSearchStrings = (): void => {
        let self = this;
        let character_ids: any = Data.Character_ids;
        let characters: any = (Data.Characters as any);
        _.forOwn(character_ids, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = characters[item_id].name_en;
            let name_jp: string = characters[item_id].name_jp;
            let image_uri: string = characters[item_id].image_uri;
            let html_fragment: string = Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMRF5Character.SearchStringsCache.push({
                'value': item_id,
                'label': html_fragment
            });
        });  
    }

    public GetSearchStrings = (): any[] => {
        if(VMRF5Character.SearchStringsCache.length === 0) {
            this.CacheSearchStrings();
        }
        return VMRF5Character.SearchStringsCache;
    }

    // Event handlers

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: string = ui.item.value;
        this.Model.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }

    public OnGroupHeaderClickHandler = (equipmentType: EquipmentType, dataContext: any, event: any): boolean => {
        this.ToggleGroupHeaderCollapsedState(equipmentType);
        return true;
    }

    public OnAddItemClickHandler = (equipmentType: EquipmentType, dataContext: any, _event: any): boolean => {
        const character: IRF5Character = dataContext;
        switch (equipmentType) {
            case "weapon": character.AddWeapon(); break;
            case "shield": character.AddShield(); break;
            case "headgear": character.AddHeadgear(); break;
            case "armor": character.AddArmor(); break;
            case "boots": character.AddBoots(); break;
            case "accessory": character.AddAccessory(); break;
        }
        return true;
    }

    public OnEquipmentRadioClickHandler = (equipmentType: EquipmentType, equipmentIdx: number,
                                                dataContext: any, _event: any): boolean => {
        const rf5Item: IRF5Item = (dataContext as IRF5Item);
        if(equipmentType !== null) {
            rf5Item.Character().SetActiveEquipment(equipmentType, equipmentIdx);
        }
        return true;
    }

}
export = VMRF5Character;