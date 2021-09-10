import ko = require('knockout');
import _ = require('lodash');
import VMBaseViewModel = require('./VMBaseViewModel');
import RF5Slot = require('../model/RF5Slot');

class VMRF5Slot extends VMBaseViewModel {

    override readonly Model: RF5Slot;
    readonly IsCollapsed: ko.Observable<boolean>;
    readonly IsRestricted: ko.Computed<boolean>;
    readonly IsLocked: ko.Computed<boolean>

    static readonly SearchStringsCache: Record<string, any[]> = {};

    constructor(model: RF5Slot) {
        super();
        this.Model = model;

        // const isCollapsed: boolean = this.Model.Item().ViewModel.IsCollapsed();
        const isCollapsed: boolean = true; // Always generate as collapsed
        this.IsCollapsed = ko.observable(isCollapsed);

        this.IsRestricted = ko.computed(function() { return false; });
        this.IsLocked = ko.computed(function() { return false; })
    }

    protected CacheSearchStrings = (cacheKey: string): void => {

        let self = this;
        let all_items: any = (self.Model.Item().Character().Planner.Items as any)
        _.forOwn(self.Model.Item().Character().Planner.Item_ids, function(value: any, key: any) {
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
        let id: string = ui.item.value;
        this.Model.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }

}
export = VMRF5Slot;