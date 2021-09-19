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

    readonly IsFiltersCollapsed: ko.Observable<boolean>;

    // Filters
    readonly DisplayEquipmentComputed: ko.Computed<boolean>;
    readonly DisplayEquipment: ko.Observable<boolean>;
    // non-equipment is just the inverse
    readonly DisplayWeapon: ko.Observable<boolean>;
    readonly DisplayShield: ko.Observable<boolean>;
    readonly DisplayHeadgear: ko.Observable<boolean>;
    readonly DisplayArmor: ko.Observable<boolean>;
    readonly DisplayBoots: ko.Observable<boolean>;
    readonly DisplayAccessory: ko.Observable<boolean>;

    readonly Display2hSword: ko.Observable<boolean>;
    readonly DisplayAxe: ko.Observable<boolean>;
    readonly DisplayDualblades: ko.Observable<boolean>;
    readonly DisplayHammer: ko.Observable<boolean>;
    readonly DisplaySpear: ko.Observable<boolean>;
    readonly DisplayStaff: ko.Observable<boolean>;
    readonly DisplaySword: ko.Observable<boolean>;
    readonly DisplayFarmAxe: ko.Observable<boolean>;
    readonly DisplayFishingPole: ko.Observable<boolean>;
    readonly isFarmHammer: ko.Observable<boolean>;
    readonly DisplayFarmHoe: ko.Observable<boolean>;
    readonly DisplayFarmSickle: ko.Observable<boolean>;
    readonly DisplayFarmWaterpot: ko.Observable<boolean>;

    readonly DisplayClawsAndFangs: ko.Observable<boolean>;
    readonly DisplayClothsAndSkins: ko.Observable<boolean>;
    readonly DisplayCrystals: ko.Observable<boolean>;
    readonly DisplayFeathers: ko.Observable<boolean>;
    readonly DisplayFurs: ko.Observable<boolean>;
    readonly DisplayJewels: ko.Observable<boolean>;
    readonly DisplayLiquids: ko.Observable<boolean>;
    readonly DisplayMinerals: ko.Observable<boolean>;
    readonly DisplayPowdersAndSpores: ko.Observable<boolean>;
    readonly DisplayScales: ko.Observable<boolean>;
    readonly DisplayShards: ko.Observable<boolean>;
    readonly DisplayShellsAndBones: ko.Observable<boolean>;
    readonly DisplaySticksAndStems: ko.Observable<boolean>;
    readonly DisplayStones: ko.Observable<boolean>;
    readonly DisplayStrings: ko.Observable<boolean>;

    constructor() {
        var self = this;

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

        this.DisplayEquipment = ko.observable(true);
        this.DisplayWeapon = ko.observable(true);
        this.DisplayShield = ko.observable(true);
        this.DisplayHeadgear = ko.observable(true);
        this.DisplayArmor = ko.observable(true);
        this.DisplayBoots = ko.observable(true);
        this.DisplayAccessory = ko.observable(true);
        this.Display2hSword = ko.observable(true);
        this.DisplayAxe = ko.observable(true);
        this.DisplayDualblades = ko.observable(true);
        this.DisplayHammer = ko.observable(true);
        this.DisplaySpear = ko.observable(true);
        this.DisplayStaff = ko.observable(true);
        this.DisplaySword = ko.observable(true);
        this.DisplayFarmAxe = ko.observable(true);
        this.DisplayFishingPole = ko.observable(true);
        this.isFarmHammer = ko.observable(true);
        this.DisplayFarmHoe = ko.observable(true);
        this.DisplayFarmSickle = ko.observable(true);
        this.DisplayFarmWaterpot = ko.observable(true);
        this.DisplayClawsAndFangs = ko.observable(true);
        this.DisplayClothsAndSkins = ko.observable(true);
        this.DisplayCrystals = ko.observable(true);
        this.DisplayFeathers = ko.observable(true);
        this.DisplayFurs = ko.observable(true);
        this.DisplayJewels = ko.observable(true);
        this.DisplayLiquids = ko.observable(true);
        this.DisplayMinerals = ko.observable(true);
        this.DisplayPowdersAndSpores = ko.observable(true);
        this.DisplayScales = ko.observable(true);
        this.DisplayShards = ko.observable(true);
        this.DisplayShellsAndBones = ko.observable(true);
        this.DisplaySticksAndStems = ko.observable(true);
        this.DisplayStones = ko.observable(true);
        this.DisplayStrings = ko.observable(true);

        /*
        // Primarily used for side effects
        this.DisplayEquipmentComputed = ko.computed(function() {
            self.DisplayWeapon(self.DisplayEquipment());
            self.DisplayShield(self.DisplayEquipment());
            self.DisplayHeadgear(self.DisplayEquipment());
            self.DisplayArmor(self.DisplayEquipment());
            self.DisplayBoots(self.DisplayEquipment());
            self.DisplayAccessory(self.DisplayEquipment());
            if(self.DisplayWeapon()
                    || self.DisplayShield()
                    || self.DisplayHeadgear()
                    || self.DisplayArmor()
                    || self.DisplayBoots()
                    || self.DisplayAccessory()) {
                self.DisplayEquipment(true);
            }
            return self.DisplayEquipment();
        });
        */
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