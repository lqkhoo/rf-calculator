import ko = require('knockout');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import RF5ItemTable = require('./RF5ItemTable');
// Data
import RF5Data = require('./RF5Data');

class VectorItemTable extends RF5StatVector {

    readonly magic1: ko.Observable<number>;
    readonly magic2: ko.Observable<number>;
    readonly magic3: ko.Observable<number>;

    // The purpose of these is to cache the results from the Data lookup

    readonly IsEquipment: ko.Observable<boolean>;
    // non-equipment is just the inverse
    readonly IsWeapon: ko.Observable<boolean>;
    readonly IsShield: ko.Observable<boolean>;
    readonly IsHeadgear: ko.Observable<boolean>;
    readonly IsArmor: ko.Observable<boolean>;
    readonly IsBoots: ko.Observable<boolean>;
    readonly IsAccessory: ko.Observable<boolean>;

    readonly Is2hSword: ko.Observable<boolean>;
    readonly IsAxe: ko.Observable<boolean>;
    readonly IsDualblades: ko.Observable<boolean>;
    readonly IsFists: ko.Observable<boolean>;
    readonly IsHammer: ko.Observable<boolean>;
    readonly IsSpear: ko.Observable<boolean>;
    readonly IsStaff: ko.Observable<boolean>;
    readonly IsSword: ko.Observable<boolean>;
    readonly IsFarmAxe: ko.Observable<boolean>;
    readonly IsFarmFishingPole: ko.Observable<boolean>;
    readonly IsFarmHammer: ko.Observable<boolean>;
    readonly IsFarmHoe: ko.Observable<boolean>;
    readonly IsFarmSickle: ko.Observable<boolean>;
    readonly IsFarmWaterpot: ko.Observable<boolean>;

    readonly IsMaterial: ko.Observable<boolean>;
    readonly IsClawsAndFangs: ko.Observable<boolean>;
    readonly IsClothsAndSkins: ko.Observable<boolean>;
    readonly IsCrystals: ko.Observable<boolean>;
    readonly IsFeathers: ko.Observable<boolean>;
    readonly IsFurs: ko.Observable<boolean>;
    readonly IsJewels: ko.Observable<boolean>;
    readonly IsLiquids: ko.Observable<boolean>;
    readonly IsMinerals: ko.Observable<boolean>;
    readonly IsPowdersAndSpores: ko.Observable<boolean>;
    readonly IsScales: ko.Observable<boolean>;
    readonly IsShards: ko.Observable<boolean>;
    readonly IsShellsAndBones: ko.Observable<boolean>;
    readonly IsSticksAndStems: ko.Observable<boolean>;
    readonly IsStones: ko.Observable<boolean>;
    readonly IsStrings: ko.Observable<boolean>;

    constructor(itemId: number, isBaseItem: boolean) {
        super(itemId, isBaseItem);
        const self = this;

        this.IsEquipment = ko.observable(RF5Data.IsEquipment(self.id()));

        this.IsWeapon = ko.observable(RF5Data.IsWeapon(self.id()));
        this.IsShield = ko.observable(RF5Data.IsShield(self.id()));
        this.IsHeadgear = ko.observable(RF5Data.IsHeadgear(self.id()));
        this.IsArmor = ko.observable(RF5Data.IsArmor(self.id()));
        this.IsBoots = ko.observable(RF5Data.IsBoots(self.id()));
        this.IsAccessory = ko.observable(RF5Data.IsAccessory(self.id()));

        this.Is2hSword = ko.observable(RF5Data.Is2hSword(self.id()));
        this.IsAxe = ko.observable(RF5Data.IsAxe(self.id()));
        this.IsDualblades = ko.observable(RF5Data.IsDualblades(self.id()));
        this.IsFists = ko.observable(RF5Data.IsFists(self.id()));
        this.IsHammer = ko.observable(RF5Data.IsHammer(self.id()));
        this.IsSpear = ko.observable(RF5Data.IsSpear(self.id()));
        this.IsStaff = ko.observable(RF5Data.IsStaff(self.id()));
        this.IsSword = ko.observable(RF5Data.IsSword(self.id()));
        this.IsFarmAxe = ko.observable(RF5Data.IsFarmAxe(self.id()));
        this.IsFarmFishingPole = ko.observable(RF5Data.IsFarmFishingPole(self.id()));
        this.IsFarmHammer = ko.observable(RF5Data.IsFarmHammer(self.id()));
        this.IsFarmHoe = ko.observable(RF5Data.IsFarmHoe(self.id()));
        this.IsFarmSickle = ko.observable(RF5Data.IsFarmSickle(self.id()));
        this.IsFarmWaterpot = ko.observable(RF5Data.IsFarmWaterpot(self.id()));

        this.IsMaterial = ko.observable(! RF5Data.IsEquipment(self.id()));
        this.IsClawsAndFangs = ko.observable(RF5Data.IsClawsAndFangs(this.id()));
        this.IsClothsAndSkins = ko.observable(RF5Data.IsClothsAndSkins(this.id()));
        this.IsCrystals = ko.observable(RF5Data.IsCrystals(this.id()));
        this.IsFeathers = ko.observable(RF5Data.IsFeathers(this.id()));
        this.IsFurs = ko.observable(RF5Data.IsFurs(this.id()));
        this.IsJewels = ko.observable(RF5Data.IsJewels(this.id()));
        this.IsLiquids = ko.observable(RF5Data.IsLiquids(this.id()));
        this.IsMinerals = ko.observable(RF5Data.IsMinerals(this.id()));
        this.IsPowdersAndSpores = ko.observable(RF5Data.IsPowdersAndSpores(this.id()));
        this.IsScales = ko.observable(RF5Data.IsScales(this.id()));
        this.IsShards = ko.observable(RF5Data.IsShards(this.id()));
        this.IsShellsAndBones = ko.observable(RF5Data.IsShellsAndBones(this.id()));
        this.IsSticksAndStems = ko.observable(RF5Data.IsSticksAndStems(this.id()));
        this.IsStones = ko.observable(RF5Data.IsStones(this.id()));
        this.IsStrings = ko.observable(RF5Data.IsStrings(this.id()));

        this.magic1 = ko.observable(self.Context().magic_charge1).extend({ deferred: true });
        this.magic2 = ko.observable(self.Context().magic_charge2).extend({ deferred: true });
        this.magic3 = ko.observable(self.Context().magic_charge3).extend({ deferred: true });
    }

}
export = VectorItemTable;