import ko = require('knockout');
import _ = require('lodash');
import RF5StatVector = require('./RF5StatVector');
import RF5Item = require('./RF5Item');
import IEquipmentType = require('./IEquipmentType');
import IUiSlot = require('./IUISlot');

class RF5Slot extends RF5StatVector implements IEquipmentType, IUiSlot {
    
    static readonly DEFAULT_ITEM_ID: number = 0;

    readonly EquipmentType: EquipmentType;
    readonly UiSlotType: UiSlotType;

    readonly Item: ko.Observable<RF5Item>;

    static readonly SearchStringsCache: Record<string, any[]> = {};


    constructor(item: RF5Item, item_id: number, equipment_type: EquipmentType, ui_slot: UiSlotType) {

        super((item.Character().Planner.Items as any)[item_id]
                || (item.Character().Planner.Items as any)[RF5Slot.DEFAULT_ITEM_ID]);

        this.EquipmentType = equipment_type;
        this.UiSlotType = ui_slot;
        this.Item = ko.observable(item);
    }


    protected ChangeId = (id: string): void => {
        let ctx: any = (this.Item().Character().Planner.Items as any)[id];
        this.Context(ctx);
    }

    protected CacheSearchStrings = (cacheKey: string): void => {

        let self = this;
        let all_items: any = (self.Item().Character().Planner.Items as any)
        _.forOwn(self.Item().Character().Planner.Item_ids, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = all_items[item_id].name_en;
            let name_jp: string = all_items[item_id].name_jp;
            let image_uri: string = all_items[item_id].image_uri;
            let html_fragment: string = self.Item().Character().Planner.Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            RF5Slot.SearchStringsCache[cacheKey].push({
                'value': item_id,
                'label': html_fragment
            });
        });
    }

    public GetSearchStrings = (): any[] => {
        let key: string = "items"; // Default. All items.
        if(RF5Slot.SearchStringsCache[key] === undefined) {
            RF5Slot.SearchStringsCache[key] = [];
        }
        if(RF5Slot.SearchStringsCache[key].length === 0) {
            this.CacheSearchStrings(key);
        }
        return RF5Slot.SearchStringsCache[key];
    }

    // Handlers

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: string = ui.item.value;
        this.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }



}
export = RF5Slot;
