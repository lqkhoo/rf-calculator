import ko = require('knockout');
import IData = require('../model/IData');
// Model
import IItem = require('../model/IItem');
// Super
import IVMSlot = require('./IVMSlot');

class VMItem implements IVMSlot {
    
    readonly Data: IData;
    readonly Model: IItem;

    readonly IsCollapsed: ko.Observable<boolean>;
    readonly IsSafetyOn: ko.Observable<boolean>;

    constructor(model: IItem) {
        
        this.Data = model.Data;
        this.Model = model;
        
        const isCollapsed: boolean = this.Model.Character().ViewModel.IsItemGroupCollapsed[this.Model.EquipmentType]();
        // const isCollapsed = true; // Always generate as collapsed.
        this.IsCollapsed = ko.observable(isCollapsed).extend({ deferred: true });
        this.IsSafetyOn = ko.observable(true).extend({ deferred: true });
    }

    public SetCollapsedState = (isCollapsed: boolean, setChildSlots: boolean=true): boolean => {
        this.IsCollapsed(isCollapsed);
        if(setChildSlots) {
            this.CollapseChildSlots(isCollapsed);
        }
        return isCollapsed;
    }

    protected CollapseChildSlots = (isCollapsed: boolean): boolean => {
        this.Model.BaseItem().ViewModel.SetCollapsedState(isCollapsed);
        for(const recipeSlot of this.Model.RecipeSlots()) {
            recipeSlot.ViewModel.SetCollapsedState(isCollapsed);
        }
        for(const arrangeSlot of this.Model.ArrangeSlots()) {
            arrangeSlot.ViewModel.SetCollapsedState(isCollapsed);
        }
        for(const upgradeSlot of this.Model.UpgradeSlots()) {
            upgradeSlot.ViewModel.SetCollapsedState(isCollapsed);
        }
        return isCollapsed;
    }

    public GetSearchStrings(): any[] {
        return [];
    }

    // Event handlers
    public OnGroupHeaderClickHandler = (_dataContext: any, _event: any): boolean => {
        // Just check the first one
        const areChildSlotsCollapsed: boolean = this.Model.BaseItem().ViewModel.IsCollapsed();
        return this.CollapseChildSlots(! areChildSlotsCollapsed);
    }

    public OnDeleteItemClickHandler = (_dataContext: any, _event: any): void => {
        this.Model.Character().DeleteItem(this.Model.EquipmentType, this.Model);
    }

}
export = VMItem;