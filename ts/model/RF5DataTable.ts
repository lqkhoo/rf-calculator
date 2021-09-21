import _ = require('lodash');
import ko = require('knockout');
import IData = require('./IData');
// Super
import IDataTable = require('./IDataTable');
// Children
import VectorDataTable = require('./VectorDataTable');

class RF5DataTable implements IDataTable {

    readonly Data: IData;

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;

    readonly BaseItems: ko.ObservableArray<VectorDataTable>;
    readonly UpgradeItems: ko.ObservableArray<VectorDataTable>;

    readonly IsFiltersCollapsed: ko.Observable<boolean>;

    // Filters
    readonly DisplayEquipment: ko.Observable<boolean>;
    readonly DisplayWeapon: ko.Observable<boolean>;
    readonly DisplayShield: ko.Observable<boolean>;
    readonly DisplayHeadgear: ko.Observable<boolean>;
    readonly DisplayArmor: ko.Observable<boolean>;
    readonly DisplayBoots: ko.Observable<boolean>;
    readonly DisplayAccessory: ko.Observable<boolean>;

    readonly Display2hSword: ko.Observable<boolean>;
    readonly DisplayAxe: ko.Observable<boolean>;
    readonly DisplayDualblades: ko.Observable<boolean>;
    readonly DisplayFists: ko.Observable<boolean>;
    readonly DisplayHammer: ko.Observable<boolean>;
    readonly DisplaySpear: ko.Observable<boolean>;
    readonly DisplayStaff: ko.Observable<boolean>;
    readonly DisplaySword: ko.Observable<boolean>;
    readonly DisplayFarmAxe: ko.Observable<boolean>;
    readonly DisplayFarmFishingPole: ko.Observable<boolean>;
    readonly DisplayFarmHammer: ko.Observable<boolean>;
    readonly DisplayFarmHoe: ko.Observable<boolean>;
    readonly DisplayFarmSickle: ko.Observable<boolean>;
    readonly DisplayFarmWaterpot: ko.Observable<boolean>;

    readonly DisplayMaterial: ko.Observable<boolean>;
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

    constructor(data: IData) {
        const self = this;

        this.Data = data;

        this.IsEnglishSelected = ko.observable(true);
        this.IsJapaneseSelected = ko.observable(true);

        let baseItems: VectorDataTable[] = [];
        let upgradeItems: VectorDataTable[] = [];

        _.forOwn(self.Data.BaseItems, function(_value: any, key: any) {
            let id: number = parseInt(key);
            let vector: VectorDataTable = new VectorDataTable(self.Data, id, true);
            baseItems.push(vector);
        });
        _.forOwn(self.Data.Items, function(_value: any, key: any) {
            let id: number = parseInt(key);
            let vector: VectorDataTable = new VectorDataTable(self.Data, id, false);
            upgradeItems.push(vector);
        });

        this.BaseItems = ko.observableArray(baseItems);
        this.UpgradeItems = ko.observableArray(upgradeItems);

        this.IsFiltersCollapsed = ko.observable(true).extend({ deferred: true });

        this.DisplayEquipment = ko.observable(true).extend({ deferred: true });
        this.DisplayWeapon = ko.observable(true).extend({ deferred: true });
        this.DisplayShield = ko.observable(true).extend({ deferred: true });
        this.DisplayHeadgear = ko.observable(true).extend({ deferred: true });
        this.DisplayArmor = ko.observable(true).extend({ deferred: true });
        this.DisplayBoots = ko.observable(true).extend({ deferred: true });
        this.DisplayAccessory = ko.observable(true).extend({ deferred: true });

        this.Display2hSword = ko.observable(true).extend({ deferred: true });
        this.DisplayAxe = ko.observable(true).extend({ deferred: true });
        this.DisplayDualblades = ko.observable(true).extend({ deferred: true });
        this.DisplayFists = ko.observable(true).extend({ deferred: true });
        this.DisplayHammer = ko.observable(true).extend({ deferred: true });
        this.DisplaySpear = ko.observable(true).extend({ deferred: true });
        this.DisplayStaff = ko.observable(true).extend({ deferred: true });
        this.DisplaySword = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmAxe = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmFishingPole = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmHammer = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmHoe = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmSickle = ko.observable(true).extend({ deferred: true });
        this.DisplayFarmWaterpot = ko.observable(true).extend({ deferred: true });

        this.DisplayMaterial = ko.observable(true).extend({ deferred: true });
        this.DisplayClawsAndFangs = ko.observable(true).extend({ deferred: true });
        this.DisplayClothsAndSkins = ko.observable(true).extend({ deferred: true });
        this.DisplayCrystals = ko.observable(true).extend({ deferred: true });
        this.DisplayFeathers = ko.observable(true).extend({ deferred: true });
        this.DisplayFurs = ko.observable(true).extend({ deferred: true });
        this.DisplayJewels = ko.observable(true).extend({ deferred: true });
        this.DisplayLiquids = ko.observable(true).extend({ deferred: true });
        this.DisplayMinerals = ko.observable(true).extend({ deferred: true });
        this.DisplayPowdersAndSpores = ko.observable(true).extend({ deferred: true });
        this.DisplayScales = ko.observable(true).extend({ deferred: true });
        this.DisplayShards = ko.observable(true).extend({ deferred: true });
        this.DisplayShellsAndBones = ko.observable(true).extend({ deferred: true });
        this.DisplaySticksAndStems = ko.observable(true).extend({ deferred: true });
        this.DisplayStones = ko.observable(true).extend({ deferred: true });
        this.DisplayStrings = ko.observable(true).extend({ deferred: true });
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

    protected ToggleAllHelper = (state: boolean): void => {
        this.DisplayEquipment(state);
        this.DisplayWeapon(state);
        this.DisplayShield(state);
        this.DisplayHeadgear(state);
        this.DisplayArmor(state);
        this.DisplayBoots(state);
        this.DisplayAccessory(state);
        this.DisplaySword(state);
        this.Display2hSword(state);
        this.DisplaySpear(state);
        this.DisplayAxe(state);
        this.DisplayHammer(state);
        this.DisplayDualblades(state);
        this.DisplayFists(state);
        this.DisplayStaff(state);
        this.DisplayFarmHoe(state);
        this.DisplayFarmWaterpot(state);
        this.DisplayFarmSickle(state);
        this.DisplayFarmAxe(state);
        this.DisplayFarmHammer(state);
        this.DisplayFarmFishingPole(state);
        this.DisplayMaterial(state);
        this.DisplayClawsAndFangs(state);
        this.DisplayClothsAndSkins(state);
        this.DisplayCrystals(state);
        this.DisplayFeathers(state);
        this.DisplayFurs(state);
        this.DisplayJewels(state);
        this.DisplayLiquids(state);
        this.DisplayMinerals(state);
        this.DisplayPowdersAndSpores(state);
        this.DisplayScales(state);
        this.DisplayShards(state);
        this.DisplayShellsAndBones(state);
        this.DisplaySticksAndStems(state);
        this.DisplayStones(state);
        this.DisplayStrings(state);
    }

    public OnSelectAllClickHandler = (): boolean => {
        this.ToggleAllHelper(true);
        return true;
    }

    public OnDeselectAllClickHandler = (): boolean => {
        console.log(false);
        this.ToggleAllHelper(false);
        return true;
    }

    public OnCollapseFilterClickHandler = (): boolean => {
        const self = this;
        this.IsFiltersCollapsed(! self.IsFiltersCollapsed());
        return true;
    }
}
export = RF5DataTable;