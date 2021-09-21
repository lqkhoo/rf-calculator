import _ = require('lodash');
// Model
import ISlot = require('../model/ISlot');
// Super
import VMSlot = require('./VMSlot');
// Data
import Utils = require('../Utils');

class VMSlotBaseItem extends VMSlot {

    static override readonly SearchStringsCache: Record<string, any[]> = {};
    override readonly Model: ISlot;

    constructor(model: ISlot) {
        super(model);
    }

    protected override CacheSearchStrings = (_cacheKey: string): void => {
        const self = this;

        let cacheKey: EquipmentType = (_cacheKey as EquipmentType);
        let all_items: any = (this.Data.Items as any);
        let id_set: any;
        switch (cacheKey) {
            case "weapon": id_set = this.Data.Is_eq_weapon; break;
            case "shield": id_set = this.Data.Is_eq_shield; break;
            case "headgear": id_set = this.Data.Is_eq_headgear; break;
            case "armor": id_set = this.Data.Is_eq_armor; break;
            case "boots": id_set = this.Data.Is_eq_shoes; break;
            case "accessory": id_set = this.Data.Is_eq_accessory; break;
        }

        _.forOwn(id_set, function(_value: any, key: any) {
            let item_id: string = key;
            let name_en: string = all_items[item_id].name_en;
            let name_jp: string = all_items[item_id].name_jp;
            let image_uri: string = all_items[item_id].image_uri;
            let html_fragment: string = Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMSlot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }

    public override GetSearchStrings = (): any[] => {
        let key: string = this.Model.Item().EquipmentType;
        if(VMSlot.SearchStringsCache[key] === undefined) {
            VMSlot.SearchStringsCache[key] = [];
        }
        if(VMSlot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return VMSlot.SearchStringsCache[key];
    }

}
export = VMSlotBaseItem;