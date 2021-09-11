import ko = require('knockout');
import _ = require('lodash');
// Model
import IRF5Slot = require('../model/IRF5Slot');
// Super
import IVMRF5Slot = require('./IVMRF5Slot');
// Data
import Data = require('../model/Data');
import Utils = require('../Utils');

class VMRF5Slot implements IVMRF5Slot {

    readonly Model: IRF5Slot;
    readonly IsCollapsed: ko.Observable<boolean>;
    readonly IsRestricted: ko.PureComputed<boolean>;
    readonly IsLocked: ko.PureComputed<boolean>

    static readonly SearchStringsCache: Record<string, any[]> = {};

    constructor(model: IRF5Slot) {
        this.Model = model;

        // const isCollapsed: boolean = this.Model.Item().ViewModel.IsCollapsed();
        const isCollapsed: boolean = true; // Always generate as collapsed
        this.IsCollapsed = ko.observable(isCollapsed);

        this.IsRestricted = ko.pureComputed(function() { return false; });
        this.IsLocked = ko.pureComputed(function() { return false; })
    }

    protected CacheSearchStrings = (cacheKey: string): void => {

        let self = this;
        let all_items: any = (Data.Items as any)
        _.forOwn(Data.Item_ids, function(value: any, key: any) {
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

    public GetSearchStrings = (): any[] => {
        let key: string = "0"; // Default. All items.
        if(VMRF5Slot.SearchStringsCache[key] === undefined) {
            VMRF5Slot.SearchStringsCache[key] = [];
        }
        if(VMRF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return VMRF5Slot.SearchStringsCache[key];
    }

    // Handlers

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: number = parseInt(ui.item.value);
        this.Model.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }

}
export = VMRF5Slot;