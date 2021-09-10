import _ = require('lodash');
import RF5SlotBaseItem = require('../model/RF5SlotBaseItem');
import VMRF5Slot = require('./VMRF5Slot');
import RF5Planner = require('../RF5Planner');

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
        let planner: RF5Planner = self.Model.Item().Character().Planner;
        let all_items: any = (planner.Items as any);
        let id_set: any;
        switch (cacheKey) {
            case "weapon": id_set = planner.Is_eq_weapon; break;
            case "shield": id_set = planner.Is_eq_shield; break;
            case "headgear": id_set = planner.Is_eq_headgear; break;
            case "armor": id_set = planner.Is_eq_armor; break;
            case "boots": id_set = planner.Is_eq_shoes; break;
            case "accessory": id_set = planner.Is_eq_accessory; break;
        }

        _.forOwn(id_set, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = all_items[item_id].name_en;
            let name_jp: string = all_items[item_id].name_jp;
            let image_uri: string = all_items[item_id].image_uri;
            let html_fragment: string = planner.Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMRF5Slot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }

    public override GetSearchStrings = (): any[] => {
        let key: string = this.Model.EquipmentType;
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