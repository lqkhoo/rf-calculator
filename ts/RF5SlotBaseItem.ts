import _ = require('lodash');
import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');
import RF5Planner = require('./RF5Planner');
class RF5SlotBaseItem extends RF5Slot {

    constructor(item: RF5Item, equipment_type: EquipmentType, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {
        super(item, item_id, equipment_type, "B");



    }

    protected override CacheSearchStrings = (_cacheKey: string): void => {

        let self = this;
        let cacheKey: EquipmentType = (_cacheKey as EquipmentType);
        let planner: RF5Planner = self.Item().Character().Planner;
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
            RF5Slot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }

    public override GetSearchStrings = (): any[] => {
        let key: string = this.EquipmentType;
        if(RF5Slot.SearchStringsCache[key] === undefined) {
            RF5Slot.SearchStringsCache[key] = [];
        }
        if(RF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return RF5Slot.SearchStringsCache[key];
    }

}
export = RF5SlotBaseItem;
