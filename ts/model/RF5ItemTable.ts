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

    constructor() {
        const self = this;

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

    protected ToggleDisplayEquipment = (): void => {
        /*
        this.DisplayWeapon(this.DisplayEquipment());
        this.DisplayShield(this.DisplayEquipment());
        this.DisplayHeadgear(this.DisplayEquipment());
        this.DisplayArmor(this.DisplayEquipment());
        this.DisplayBoots(this.DisplayEquipment());
        this.DisplayAccessory(this.DisplayEquipment());
        this.DisplaySword(this.DisplayEquipment());
        this.Display2hSword(this.DisplayEquipment());
        this.DisplaySpear(this.DisplayEquipment());
        this.DisplayAxe(this.DisplayEquipment());
        this.DisplayHammer(this.DisplayEquipment());
        this.DisplayDualblades(this.DisplayEquipment());
        this.DisplayFists(this.DisplayEquipment());
        this.DisplayStaff(this.DisplayEquipment());
        this.DisplayFarmHoe(this.DisplayEquipment());
        this.DisplayFarmWaterpot(this.DisplayEquipment());
        this.DisplayFarmSickle(this.DisplayEquipment());
        this.DisplayFarmAxe(this.DisplayEquipment());
        this.DisplayFarmHammer(this.DisplayEquipment());
        this.DisplayFarmFishingPole(this.DisplayEquipment());
        */
    }

    protected ToggleDisplayMaterial = (): void => {
        /*
        this.DisplayClawsAndFangs(this.DisplayMaterial());
        this.DisplayClothsAndSkins(this.DisplayMaterial());
        this.DisplayCrystals(this.DisplayMaterial());
        this.DisplayFeathers(this.DisplayMaterial());
        this.DisplayFurs(this.DisplayMaterial());
        this.DisplayJewels(this.DisplayMaterial());
        this.DisplayLiquids(this.DisplayMaterial());
        this.DisplayMinerals(this.DisplayMaterial());
        this.DisplayPowdersAndSpores(this.DisplayMaterial());
        this.DisplayScales(this.DisplayMaterial());
        this.DisplayShards(this.DisplayMaterial());
        this.DisplayShellsAndBones(this.DisplayMaterial());
        this.DisplaySticksAndStems(this.DisplayMaterial());
        this.DisplayStones(this.DisplayMaterial());
        this.DisplayStrings(this.DisplayMaterial());
        */
    }

    protected ToggleDisplayWeapon = (): void => {
        /*
        this.DisplaySword(this.DisplayWeapon());
        this.Display2hSword(this.DisplayWeapon());
        this.DisplaySpear(this.DisplayWeapon());
        this.DisplayAxe(this.DisplayWeapon());
        this.DisplayHammer(this.DisplayWeapon());
        this.DisplayDualblades(this.DisplayWeapon());
        this.DisplayFists(this.DisplayWeapon());
        this.DisplayStaff(this.DisplayWeapon());
        this.DisplayFarmHoe(this.DisplayWeapon());
        this.DisplayFarmWaterpot(this.DisplayWeapon());
        this.DisplayFarmSickle(this.DisplayWeapon());
        this.DisplayFarmAxe(this.DisplayWeapon());
        this.DisplayFarmHammer(this.DisplayWeapon());
        this.DisplayFarmFishingPole(this.DisplayWeapon());
        */
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

    public OnDisplayEquipmentClickHandler = (): boolean => {
        // this.ToggleDisplayEquipment(); 
        return true;
    }
    public OnDisplayWeaponClickHandler = (): boolean => {
        // if(this.DisplayWeapon()) { this.DisplayEquipment(true); }
        // this.ToggleDisplayWeapon();
        return true;
    }
    public OnDisplayShieldClickHandler = (): boolean => {
        // if(this.DisplayShield()) { this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayHeadgearClickHandler = (): boolean => {
        // if(this.DisplayHeadgear()) { this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayArmorClickHandler = (): boolean => {
        // if(this.DisplayArmor()) { this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayBootsClickHandler = (): boolean => {
        // if(this.DisplayBoots()) { this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayAccessoryClickHandler = (): boolean => {
        // if(this.DisplayAccessory()) { this.DisplayEquipment(true); }
        return true;
    }

    public OnDisplayMaterialClickHandler = (): boolean => {
        // this.ToggleDisplayMaterial();
        return true;
    }
    public OnDisplayClawsAndFangsClickHandler = (): boolean => {
        // if(this.DisplayClawsAndFangs()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayClothsAndSkinsClickHandler = (): boolean => {
        // if(this.DisplayClothsAndSkins()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayCrystalsClickHandler = (): boolean => {
        // if(this.DisplayCrystals()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayFeathersClickHandler = (): boolean => {
        // if(this.DisplayFeathers()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayFursClickHandler = (): boolean => {
        // if(this.DisplayFurs()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayJewelsClickHandler = (): boolean => {
        // if(this.DisplayJewels()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayLiquidsClickHandler = (): boolean => {
        // if(this.DisplayLiquids()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayMineralsClickHandler = (): boolean => {
        // if(this.DisplayMinerals()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayPowdersAndSporesClickHandler = (): boolean => {
        // if(this.DisplayPowdersAndSpores()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayScalesClickHandler = (): boolean => {
        // if(this.DisplayScales()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayShardsClickHandler = (): boolean => {
        // if(this.DisplayShards()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayShellsAndBonesClickHandler = (): boolean => {
        // if(this.DisplayShellsAndBones()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplaySticksAndStemsClickHandler = (): boolean => {
        // if(this.DisplaySticksAndStems()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayStonesClickHandler = (): boolean => {
        // if(this.DisplayStones()) { this.DisplayMaterial(true); }
        return true;
    }
    public OnDisplayStringsClickHandler = (): boolean => {
        // if(this.DisplayStrings()) { this.DisplayMaterial(true); }
        return true;
    }

    public OnDisplaySwordClickHandler = (): boolean => {
        // if(this.DisplaySword()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplay2hSwordClickHandler = (): boolean => {
        // if(this.Display2hSword()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplaySpearClickHandler = (): boolean => {
        // if(this.DisplaySpear()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayAxeClickHandler = (): boolean => {
        // if(this.DisplayAxe()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayHammerClickHandler = (): boolean => {
        // if(this.DisplayHammer()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayDualbladesClickHandler = (): boolean => {
        // if(this.DisplayDualblades()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFistsClickHandler = (): boolean => {
        // if(this.DisplayFists()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayStaffClickHandler = (): boolean => {
        // if(this.DisplayStaff()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmHoeClickHandler = (): boolean => {
        // if(this.DisplayFarmHoe()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmWaterpotClickHandler = (): boolean => {
        // if(this.DisplayFarmWaterpot()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmSickleClickHandler = (): boolean => {
        // if(this.DisplayFarmSickle()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmAxeClickHandler = (): boolean => {
        // if(this.DisplayFarmAxe()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmHammerClickHandler = (): boolean => {
        // if(this.DisplayFarmHammer()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }
    public OnDisplayFarmFishingPoleClickHandler = (): boolean => {
        // if(this.DisplayFarmFishingPole()) { this.DisplayWeapon(true); this.DisplayEquipment(true); }
        return true;
    }

    public OnCollapseFilterClickHandler = (): boolean => {
        const self = this;
        this.IsFiltersCollapsed(! self.IsFiltersCollapsed());
        return true;
    }

    public NullClickHandler = (_dataContext: any, _event: any): boolean => {
        return true;
    }
}
export = RF5ItemTable;