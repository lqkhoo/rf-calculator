import IEquipmentType = require("./IEquipmentType");
import IModel = require("./IModel");
import IRF5Item = require("./IRF5Item");
import IStatVector = require("./IStatVector");

interface IRF5Slot extends IStatVector, IModel, IEquipmentType {

    readonly Item: ko.Observable<IRF5Item>;

    ChangeId(id: string): void;
    
}
export = IRF5Slot;