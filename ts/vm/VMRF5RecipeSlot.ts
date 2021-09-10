import ko = require('knockout');
import _ = require('lodash');
import VMRF5Slot = require('./VMRF5Slot');
import RF5SlotRecipe = require('../model/RF5SlotRecipe');

class VMRF5RecipeSlot extends VMRF5Slot {

    override readonly Model: RF5SlotRecipe;

    // Reuse the the base class' cache. There's no conflict.
    // static readonly SearchStringsCache: Record<string, any[]> = {};

    constructor(model: RF5SlotRecipe) {
        super(model);
        this.Model = model;
    }

    /*
    protected override CacheSearchStrings = (cacheKey: string): void => {
        console.log(cacheKey);
        let self = this;
        const planner = self.Model.Item().Character().Planner;

        let items: any;
        if(cacheKey === "0") {
            items = planner.Items; // All items
        } else if (cacheKey in planner.Items) {
            items = { cacheKey: undefined };
        } else { // Category
            items = {};
            var itemIds: number[] = (planner.Categories as any)[cacheKey].item_ids;
            for(var i=0; i<itemIds.length; i++) {
                items[itemIds[i].toString()] = undefined;
            }
        }

        let all_items: any = (planner.Items as any);
        _.forOwn(items, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = all_items[item_id].name_en;
            let name_jp: string = all_items[item_id].name_jp;
            let image_uri: string = all_items[item_id].image_uri;
            let html_fragment: string = self.Model.Item().Character().Planner.Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMRF5Slot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }
    */

    
    public override GetSearchStrings = (): any[] => {
        console.log("call");
        /*
        let key = this.Model.Restriction();
        if(VMRF5Slot.SearchStringsCache[key] === undefined) {
            VMRF5Slot.SearchStringsCache[key] = [];
        }
        if(VMRF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return VMRF5Slot.SearchStringsCache[key];
        */
       return [];
    }
    
    

}
export = VMRF5RecipeSlot;