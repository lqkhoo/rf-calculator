import _ = require('lodash');
import ko = require('knockout');
import IData = require('./IData');
// Data
import VectorDataTable = require('./VectorDataTable');

interface IDataTable {

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

    DisplayFirstCharacterSheet(): void;
    EndInitialLoad(): void;
    OnSelectAllClickHandler(): boolean;
    OnDeselectAllClickHandler(): boolean;
    OnCollapseFilterClickHandler(): boolean;
}
export = IDataTable;