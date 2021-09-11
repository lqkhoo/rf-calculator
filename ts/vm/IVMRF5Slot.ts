import IViewModel = require('./IViewModel');
import IModel = require('../model/IModel');

interface IVMRF5Slot extends IViewModel {
    readonly Model: IModel;
    GetSearchStrings(): any[];
}
export = IVMRF5Slot;