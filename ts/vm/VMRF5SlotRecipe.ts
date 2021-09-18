import ko = require('knockout');
import _ = require('lodash');
// Super
import VMRF5Slot = require('./VMRF5Slot');
// Model
import IRF5SlotRecipe = require('../model/IRF5SlotRecipe');
// Data
import RF5Data = require('../model/RF5Data');
import Utils = require('../Utils');

class VMRF5SlotRecipe extends VMRF5Slot {

    override readonly Model: IRF5SlotRecipe;

    constructor(model: IRF5SlotRecipe) {
        super(model)
        this.Model = model;
    }

    protected override CacheSearchStrings = (cacheKey: string): void => {
        const self = this;

        let items: any;
        if(cacheKey === "0") {
            items = RF5Data.Item_ids; // All items
        } else if (cacheKey in RF5Data.Item_ids) { // Single item
            items = {};
            items[cacheKey] = undefined;
        } else { // Category
            items = {};
            var itemIds: number[] = (RF5Data.Categories as any)[cacheKey].item_ids;
            for(var i=0; i<itemIds.length; i++) {
                items[itemIds[i].toString()] = undefined;
            }
        }

        let all_items: any = (RF5Data.Items as any);
        _.forOwn(items, function(value: any, key: any) {
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
        let key = this.Model.Restriction();
        if(VMRF5Slot.SearchStringsCache[key] === undefined) {
            VMRF5Slot.SearchStringsCache[key] = [];
        }
        if(VMRF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key.toString());
        }
        return VMRF5Slot.SearchStringsCache[key];
    }

}
export = VMRF5SlotRecipe;