import _ = require('lodash');
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

        let baseItems: VectorItemTable[] = [];
        let upgradeItems: VectorItemTable[] = [];

        _.forOwn(RF5Data.BaseItems, function(_value: any, key: any) {
            let id: number = parseInt(key);
            let vector: VectorItemTable = new VectorItemTable(id, true);
            baseItems.push(vector);
        });
        _.forOwn(RF5Data.Items, function(_value: any, key: any) {
            let id: number = parseInt(key);
            let vector: VectorItemTable = new VectorItemTable(id, false);
            upgradeItems.push(vector);
        });

        this.BaseItems = ko.observableArray(baseItems);
        this.UpgradeItems = ko.observableArray(upgradeItems);
    }

    public DisplayFirstCharacterSheet = (): void => {
        const elem: Element | null = document.querySelector('#character-tabs .character button');
        if(elem !== null) {
            (elem as HTMLElement).click();
        }
    }

    public EndInitialLoad = (): void => {
        let elem: Element | null = document.querySelector('main');
        if(elem !== null) {
            elem.classList.remove('initial-load');
        }
        elem = document.getElementById('initial-load-message');
        if(elem !== null) {
            elem.remove();
        }
    }
}
export = RF5ItemTable;