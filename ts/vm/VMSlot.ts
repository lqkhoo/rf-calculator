import ko = require('knockout');
import _ = require('lodash');
import IData = require('../model/IData');
// Model
import ISlot = require('../model/ISlot');
// Super
import IVMSlot = require('./IVMSlot');
// Data
import Utils = require('../Utils');
import AbstractSlot = require('../model/AbstractSlot');

class VMSlot implements IVMSlot {

    readonly Data: IData;
    Model: ISlot;
    readonly IsCollapsed: ko.Observable<boolean>;
    readonly AreDetailsCollapsed: ko.Observable<boolean>;

    readonly SlotName: ko.PureComputed<string>;
    readonly LevelOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]; // No need to be observable.

    static readonly SearchStringsCache: Record<string, any[]> = {};

    constructor(model: ISlot) {
                    
        const self = this;

        this.Data = model.Data;
        this.Model = model;

        // const isCollapsed: boolean = this.Model.Item().ViewModel.IsCollapsed();
        const isCollapsed: boolean = true; // Always generate as collapsed
        this.IsCollapsed = ko.observable(isCollapsed).extend({ deferred: true });
        this.AreDetailsCollapsed = ko.observable(true).extend({ deferred: true });

        this.SlotName = ko.pureComputed(function() {
            if(self.Model.Index === 0) { return 'Base'; }
            else if (self.Model.Index < 7) {
                return 'R' + (self.Model.Index-AbstractSlot.RECIPE_START_IDX+1).toString();
            }
            else if (self.Model.Index < 10) {
                return 'A' + (self.Model.Index-AbstractSlot.ARRANGE_START_IDX+1).toString();
            }
            else {
                return 'U' + (self.Model.Index-AbstractSlot.UPGRADE_START_IDX+1).toString();
            }
        }).extend({ deferred: true });

    }

    protected CacheSearchStrings = (cacheKey: string): void => {
        const self = this;

        let all_items: any = (this.Data.Items as any)
        _.forOwn(self.Data.Item_ids, function(_value: any, key: any) {
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

    public GetSearchStrings = (): any[] => {
        let key: string = "0"; // Default. All items.
        if(VMSlot.SearchStringsCache[key] === undefined) {
            VMSlot.SearchStringsCache[key] = [];
        }
        if(VMSlot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return VMSlot.SearchStringsCache[key];
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
export = VMSlot;