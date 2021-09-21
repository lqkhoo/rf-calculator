import IViewModel = require('./IViewModel');
import IModel = require('../model/IModel');

interface IVMSlot extends IViewModel {
    readonly Model: IModel;
    readonly IsCollapsed: ko.Observable<boolean>;
    GetSearchStrings(): any[];
    SetCollapsedState(isCollapsed: boolean): void;
}
export = IVMSlot;