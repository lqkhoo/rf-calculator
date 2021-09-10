import ko = require('knockout');
import VMBaseViewModel = require('./VMBaseViewModel');
import RF5Slot = require('../model/RF5Slot');
import RF5SlotRecipe = require('../model/RF5SlotRecipe');
import VMRF5Slot = require('./VMRF5Slot');

class VMRF5SlotRecipe extends VMRF5Slot {

    override readonly Model: RF5SlotRecipe;
    override readonly IsRestricted: ko.Computed<boolean>;
    override readonly IsLocked: ko.Computed<boolean>;

    constructor(model: RF5SlotRecipe) {
        super(model);

        var self = this;
        this.Model = model;

        this.IsRestricted = ko.computed(function() {
            return self.Model.Restriction() !== "0";
        });
        this.IsLocked = ko.computed(function() {
            const planner = self.Model.Item().Character().Planner;
            return self.IsRestricted() && (! planner.Category_ids.hasOwnProperty(self.Model.Restriction()));
        })

    }

}
export = VMRF5SlotRecipe;