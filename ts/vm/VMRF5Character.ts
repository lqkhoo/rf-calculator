import _ = require('lodash');
import ko = require('knockout');
// Model
import IRF5Item = require('../model/IRF5Item');
import IRF5Character = require('../model/IRF5Character');
// Super
import IVMRF5Slot = require('./IVMRF5Slot');
// Data
import Data = require('../model/RF5Data');
import Utils = require('../Utils');


class VMRF5Character implements IVMRF5Slot {

    readonly Model: IRF5Character;
    static readonly SearchStringsCache: any[] = [];

    readonly IsSafetyOn: ko.Observable<boolean>;
    readonly IsItemGroupCollapsed: Record<EquipmentType, ko.Observable<boolean>>;
    readonly SpriteUri: ko.Computed<string>;
    readonly SpriteAdjustment: ko.Observable<string>;

    constructor(model: IRF5Character) {
        const self = this;
        this.Model = model;

        this.IsSafetyOn = ko.observable(true).extend({ deferred: true });
        this.IsItemGroupCollapsed = {
            "weapon":    ko.observable(false).extend({ deferred: true }),
            "shield":    ko.observable(false).extend({ deferred: true }),
            "headgear":  ko.observable(false).extend({ deferred: true }),
            "armor":     ko.observable(false).extend({ deferred: true }),
            "boots":     ko.observable(false).extend({ deferred: true }),
            "accessory": ko.observable(false).extend({ deferred: true })
        }

        this.SpriteUri = ko.computed(function() {
            let img = new Image();
            let uri: string = (Data.Characters as any )[self.Model.id()].sprite_uri;
            img.src = uri;
            img.onload = function(): void {
                const BIAS = 50;
                const MAX_HEIGHT = 600; // px. Set this in css
                const COL_WIDTH = 300; // px.
                let height = img.naturalHeight;
                let width = img.naturalWidth;
                let scalingCoeff = Math.min(MAX_HEIGHT / height, 1.0);
                let scaledWidth = scalingCoeff * width;
                self.SpriteAdjustment(((COL_WIDTH - scaledWidth) / 2 + BIAS).toString()+'px');
            }
            return uri;
        }).extend({ deferred: true });

        this.SpriteAdjustment = ko.observable('initial').extend({ deferred: true });
    }

    public ToggleGroupHeaderCollapsedState = (equipmentType: EquipmentType): boolean => {
        const isCollapsed: boolean = this.IsItemGroupCollapsed[equipmentType]();
        this.IsItemGroupCollapsed[equipmentType](! isCollapsed);

        for (const rf5Item of this.GetItemGroup(equipmentType)) {
            rf5Item.ViewModel.SetCollapsedState(!isCollapsed, !isCollapsed);
        }
        return ! isCollapsed;
    }

    public GetSearchStrings = (): any[] => {
        if(VMRF5Character.SearchStringsCache.length === 0) {
            this.CacheSearchStrings();
        }
        return VMRF5Character.SearchStringsCache;
    }

    // Event handlers

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: number = parseInt(ui.item.value);
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

    public OnDeleteCharacterClickHandler = (_dataContext: any, _event: any): void => {
        this.Model.Calculator.DeleteCharacter(this.Model);
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

}
export = VMRF5Character;