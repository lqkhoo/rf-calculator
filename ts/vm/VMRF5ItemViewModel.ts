import ko = require('knockout');
import VMBaseViewModel = require('./VMBaseViewModel');
import RF5Item = require('../model/RF5Item');
class VMRF5ItemViewModel extends VMBaseViewModel {
    
    override readonly Model: RF5Item;

    readonly IsCollapsed: ko.Observable<boolean>;

    constructor(model: RF5Item) {
        super();

        this.Model = model;
        const isCollapsed: boolean = this.Model.Character().ViewModel.IsItemGroupCollapsed[this.Model.EquipmentType]();
        // const isCollapsed = true; // Always generate as collapsed.

        this.IsCollapsed = ko.observable(isCollapsed);
    }

    public SetCollapsedState = (isCollapsed: boolean, setChildSlots: boolean=true): boolean => {
        this.IsCollapsed(isCollapsed);
        if(setChildSlots) {
            this.CollapseChildSlots(isCollapsed);
        }
        return isCollapsed;
    }

    protected CollapseChildSlots = (isCollapsed: boolean): boolean => {
        this.Model.BaseItem().ViewModel.IsCollapsed(isCollapsed);
        for(const recipeSlot of this.Model.RecipeSlots()) {
            recipeSlot.ViewModel.IsCollapsed(isCollapsed);
        }
        for(const arrangeSlot of this.Model.ArrangeSlots()) {
            arrangeSlot.ViewModel.IsCollapsed(isCollapsed);
        }
        for(const upgradeSlot of this.Model.UpgradeSlots()) {
            upgradeSlot.ViewModel.IsCollapsed(isCollapsed);
        }
        return isCollapsed;
    }

    // Event handlers
    public OnGroupHeaderClickHandler = (dataContext: any, event: any): boolean => {
        // Just check the first one
        const areChildSlotsCollapsed: boolean = this.Model.BaseItem().ViewModel.IsCollapsed();
        return this.CollapseChildSlots(! areChildSlotsCollapsed);
    }

}
export = VMRF5ItemViewModel;