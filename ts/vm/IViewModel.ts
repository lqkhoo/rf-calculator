import IData = require('../model/IData');
import IModel = require('../model/IModel');

interface IViewModel {
    Data: IData;
    Model: IModel;
}
export = IViewModel;