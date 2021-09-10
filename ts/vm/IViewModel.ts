import IModel = require('../model/IModel');

// For this project, since knockout does so much of the binding work already,
// a viewmodel is just a model that needs to maintain state information used
// only in the UI. In all other cases, the viewmodel is just the model itself.
interface IViewModel {
    Model: IModel;
}
export = IViewModel;