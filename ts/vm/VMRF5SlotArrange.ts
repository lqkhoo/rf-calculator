import ko = require('knockout');
import _ = require('lodash');
import IRF5SlotArrange = require('../model/IRF5SlotArrange');
// Super
import VMRF5Slot = require('./VMRF5Slot');
// Model
import IRF5SlotRecipe = require('../model/IRF5SlotRecipe');
// Data


class VMRF5SlotArrange extends VMRF5Slot {

    override readonly Model: IRF5SlotRecipe;
    /*
    override readonly IsRestricted: ko.PureComputed<boolean>;
    override readonly IsLocked: ko.PureComputed<boolean>

    constructor(model: IRF5SlotArrange) {
        super(model);
        var self = this;

        this.IsRestricted = ko.pureComputed(function() {
            return (self.Model.Restriction() !== 0);
        });
        this.IsLocked = ko.pureComputed(function() {
            return (self.Model.Restriction() !== 0);
        });
    }
    */

}
export = VMRF5SlotArrange;