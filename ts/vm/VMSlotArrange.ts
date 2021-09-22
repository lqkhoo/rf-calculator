import ko = require('knockout');
import _ = require('lodash');
import ISlotArrange = require('../model/ISlotArrange');
// Super
import VMSlot = require('./VMSlot');
// Model
import ISlotRecipe = require('../model/ISlotRecipe');
// Data


class VMSlotArrange extends VMSlot {

    override readonly Model: ISlotRecipe;
    /*
    override readonly IsRestricted: ko.PureComputed<boolean>;
    override readonly IsLocked: ko.PureComputed<boolean>

    constructor(model: IRF5SlotArrange) {
        super(model);
        const self = this;

        this.IsRestricted = ko.pureComputed(function() {
            return (self.Model.Restriction() !== 0);
        });
        this.IsLocked = ko.pureComputed(function() {
            return (self.Model.Restriction() !== 0);
        });
    }
    */

}
export = VMSlotArrange;