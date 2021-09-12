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
    readonly AreDetailsCollapsed: ko.Observable<boolean>;

    readonly IsRestricted: ko.PureComputed<boolean>;
    readonly IsLocked: ko.PureComputed<boolean>

    readonly SlotName: ko.PureComputed<string>;

    static readonly SearchStringsCache: Record<string, any[]> = {};

    constructor(model: IRF5Slot) {
        var self = this;
        this.Model = model;

        // const isCollapsed: boolean = this.Model.Item().ViewModel.IsCollapsed();
        const isCollapsed: boolean = true; // Always generate as collapsed
        this.IsCollapsed = ko.observable(isCollapsed);
        this.AreDetailsCollapsed = ko.observable(true);

        this.IsRestricted = ko.pureComputed(function() { return false; });
        this.IsLocked = ko.pureComputed(function() { return false; })

        this.SlotName = ko.pureComputed(function() {
            if(self.Model.Index === 0) { return 'B'; }
            else if (self.Model.Index < 7) {
                return 'R' + (self.Model.Index-1).toString();
            }
            else if (self.Model.Index < 10) {
                return 'A' + (self.Model.Index-7).toString();
            }
            else {
                return 'U' + (self.Model.Index-10).toString();
            }
        });

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

    public SetCollapsedState = (isCollapsed: boolean): void => {
        this.IsCollapsed(isCollapsed);
        if(isCollapsed) {
            this.AreDetailsCollapsed(isCollapsed);
        }
    }

    // Handlers

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: number = parseInt(ui.item.value);
        this.Model.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }

    public DetailButtonClickHandler = (event: any, ui: any): boolean => {
        var val = this.AreDetailsCollapsed();
        this.AreDetailsCollapsed(!val);
        return false;
    }

}
export = VMRF5Slot;