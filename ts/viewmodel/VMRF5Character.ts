import _ = require('lodash');
import RF5Character = require('../model/RF5Character');
import VMBaseViewmodel = require('./VMBaseViewmodel');
class VMRF5Character extends VMBaseViewmodel {

    override readonly Model: RF5Character;
    static readonly SearchStringsCache: any[] = [];

    constructor(model: RF5Character) {
        super();
        this.Model = model;
    }

    protected CacheSearchStrings = (): void => {

        let self = this;
        _.forOwn(self.Model.Planner.Character_ids, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = (self.Model.Planner.Characters as any)[item_id].name_en;
            let name_jp: string = (self.Model.Planner.Characters as any)[item_id].name_jp;
            let image_uri: string = (self.Model.Planner.Characters as any)[item_id].image_uri;
            let html_fragment: string = self.Model.Planner.Utils.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            VMRF5Character.SearchStringsCache.push({
                'value': item_id,
                'label': html_fragment
            });
        });  
    }

    public GetSearchStrings = (): any[] => {
        if(VMRF5Character.SearchStringsCache.length === 0) {
            this.CacheSearchStrings();
        }
        return VMRF5Character.SearchStringsCache;
    }

    public AutoCompleteSelectHandler = (event: any, ui: any): boolean => {
        let id: string = ui.item.value;
        this.Model.ChangeId(id);
        event.target.value = id;
        return false; // prevent jQueryUI from setting the field.
    }

}
export = VMRF5Character;