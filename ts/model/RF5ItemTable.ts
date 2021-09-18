import ko = require('knockout');
// Data
import RF5Data = require('./RF5Data');
import RF5Planner = require('./RF5Calculator');
import RF5Character = require('./RF5Character');
import VectorItemTable = require('./VectorItemTable');

class RF5ItemTable {

    readonly Data: RF5Data = RF5Data; 

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;

    readonly SpriteChara: RF5Character;

    readonly BaseItems: ko.ObservableArray<VectorItemTable>;
    readonly UpgradeItems: ko.ObservableArray<VectorItemTable>;

    constructor() {

        this.IsEnglishSelected = ko.observable(true);
        this.IsJapaneseSelected = ko.observable(true);

        this.SpriteChara = new RF5Character(new RF5Planner(), 22);

        // TODO
        this.BaseItems = ko.observableArray([]);
        this.UpgradeItems = ko.observableArray([]);

    }

}
export = RF5ItemTable;