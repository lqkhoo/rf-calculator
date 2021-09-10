import IViewModel = require('./IViewModel');
import IModel = require('../model/IModel');
class VMBaseViewmodel implements IViewModel {

    readonly Model: IModel;

    constructor() {

    }

}
export = VMBaseViewmodel;