import ko = require('knockout');
import _ = require('lodash');
import RF5Slot = require('./RF5Slot');
import RF5Item = require('./RF5Item');
import VMRF5SlotRecipe = require('../vm/VMRF5SlotRecipe');
import VMTest = require('../vm/VMTest');
class RF5SlotRecipe extends RF5Slot {

    readonly Restriction: ko.Observable<string>; // item or category id

    override readonly image_uri: ko.Computed<string>;
    override readonly ViewModel: VMTest;

    constructor(item: RF5Item, equipment_type: EquipmentType, item_id: number=RF5Slot.DEFAULT_ITEM_ID) {

        super(item, item_id, equipment_type, "R");
        var self = this;

        this.Restriction = ko.observable("0");

        this.image_uri = ko.computed(function() {
            let image_uri: string = "icon/Empty.png";
            const categories: any = self.Item().Character().Planner.Categories;
            const categoryId = self.Restriction()
            if(categories.hasOwnProperty(categoryId)) {
                image_uri = categories[categoryId].image_uri;
            } else if (self.Context() !== undefined && (self.Context() as any).image_uri !== undefined) {
                image_uri = (self.Context() as any).image_uri;
            }
            return image_uri;
        });

        this.ViewModel = new VMTest(this);
    }


    public ApplyRestriction = (id: string): void => {
        this.Restriction(id);

        if(id === "0") {
            return;
        }
        const planner = this.Item().Character().Planner;
        if(!planner.Category_ids.hasOwnProperty(id)) {
            // Means this is a nonempty itemId, not a categoryId.
            this.ChangeId(id);
        } else {
            // Category restriction. If current item not in category, set to zero.
            let itemIds = (planner.Categories as any)[id].item_ids;
            const numId: number = parseInt(id);
            let found: boolean = false;
            for(var i=0; i<itemIds.length; i++) {
                if(numId === itemIds[i]) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                this.ChangeId("0");
            }
        }
    }

    

}
export = RF5SlotRecipe;
