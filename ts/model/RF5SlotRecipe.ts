import ko = require('knockout');
import _ = require('lodash');
// Super
import RF5Slot = require('./RF5Slot');
// VM
import VMRF5SlotRecipe = require('../vm/VMRF5SlotRecipe');
// Data
import Data = require('./Data');
// Refactor
import RF5Item = require('./RF5Item');

class RF5SlotRecipe extends RF5Slot {

    readonly Restriction: ko.Observable<number>; // item or category id

    override readonly image_uri: ko.PureComputed<string>;
    override readonly ViewModel: VMRF5SlotRecipe;

    constructor(item: RF5Item, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {

        super(item, item_id);
        var self = this;

        this.Restriction = ko.observable(0);

        this.image_uri = ko.pureComputed(function() {
            let image_uri: string = "icon/Empty.png";
            const categories: any = Data.Categories;
            const categoryId = self.Restriction()
            if(categories.hasOwnProperty(categoryId)) {
                image_uri = categories[categoryId].image_uri;
            } else if (self.Context() !== undefined && (self.Context() as any).image_uri !== undefined) {
                image_uri = (self.Context() as any).image_uri;
            }
            return image_uri;
        });

        this.ViewModel = new VMRF5SlotRecipe(this);
    }


    public ApplyRestriction = (id: number): void => {
        this.Restriction(id);

        if(id === 0) {
            return;
        }
        if(!Data.Category_ids.hasOwnProperty(id)) {
            // Means this is a nonempty itemId, not a categoryId.
            this.ChangeId(id);
        } else {
            // Category restriction. If current item not in category, set to zero.
            let itemIds: number[] = (Data.Categories as any)[id].item_ids;
            let found: boolean = false;
            for(var i=0; i<itemIds.length; i++) {
                if(id === itemIds[i]) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                this.ChangeId(0);
            }
        }
    }

    

}
export = RF5SlotRecipe;
