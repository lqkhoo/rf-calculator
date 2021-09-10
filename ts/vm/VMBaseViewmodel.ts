import IViewModel = require('./IViewModel');
import IModel = require('../model/IModel');
abstract class VMBaseViewmodel implements IViewModel {

    readonly Model: IModel;
    constructor() { }

}
export = VMBaseViewmodel;