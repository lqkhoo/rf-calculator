import _ = require('lodash');
// Model
import RF5SlotBaseItem = require('../model/RF5SlotBaseItem');
// Super
import VMRF5Slot = require('./VMRF5Slot');
// Data
import Data = require('../model/Data');
import Utils = require('../Utils');

class VMRF5SlotBaseItem extends VMRF5Slot {

    static override readonly SearchStringsCache: Record<string, any[]> = {};
    override readonly Model: RF5SlotBaseItem;

    constructor(model: RF5SlotBaseItem) {
        super(model);
        this.Model = model;
    }

    protected override CacheSearchStrings = (_cacheKey: string): void => {

        let self = this;
        let cacheKey: EquipmentType = (_cacheKey as EquipmentType);
        let all_items: any = (Data.Items as any);
        let id_set: any;
        switch (cacheKey) {
            case "weapon": id_set = Data.Is_eq_weapon; break;
            case "shield": id_set = Data.Is_eq_shield; break;
            case "headgear": id_set = Data.Is_eq_headgear; break;
            case "armor": id_set = Data.Is_eq_armor; break;
            case "boots": id_set = Data.Is_eq_shoes; break;
            case "accessory": id_set = Data.Is_eq_accessory; break;
        }

        _.forOwn(id_set, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = all_items[item_id].name_en;
            let name_jp: string = all_items[item_id].name_jp;
            let image_uri: string = all_items[item_id].image_uri;
            let html_fragment: string = Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMRF5Slot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }

    public override GetSearchStrings = (): any[] => {
        let key: string = this.Model.Item().EquipmentType;
        if(VMRF5Slot.SearchStringsCache[key] === undefined) {
            VMRF5Slot.SearchStringsCache[key] = [];
        }
        if(VMRF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return VMRF5Slot.SearchStringsCache[key];
    }

}
export = VMRF5SlotBaseItem;