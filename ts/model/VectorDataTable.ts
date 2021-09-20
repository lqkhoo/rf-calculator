import ko = require('knockout');
import IData = require('./IData');
// Super
import RF5StatVector = require('./RF5StatVector');

class VectorDataTable extends RF5StatVector {

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

    constructor(data: IData,
                itemId: number,
                isBaseItem: boolean) {

        super(data, itemId, isBaseItem);
        const self = this;

        this.IsEquipment = ko.observable(self.Data.IsEquipment(self.id()));

        this.IsWeapon = ko.observable(self.Data.IsWeapon(self.id()));
        this.IsShield = ko.observable(self.Data.IsShield(self.id()));
        this.IsHeadgear = ko.observable(self.Data.IsHeadgear(self.id()));
        this.IsArmor = ko.observable(self.Data.IsArmor(self.id()));
        this.IsBoots = ko.observable(self.Data.IsBoots(self.id()));
        this.IsAccessory = ko.observable(self.Data.IsAccessory(self.id()));

        this.Is2hSword = ko.observable(self.Data.Is2hSword(self.id()));
        this.IsAxe = ko.observable(self.Data.IsAxe(self.id()));
        this.IsDualblades = ko.observable(self.Data.IsDualblades(self.id()));
        this.IsFists = ko.observable(self.Data.IsFists(self.id()));
        this.IsHammer = ko.observable(self.Data.IsHammer(self.id()));
        this.IsSpear = ko.observable(self.Data.IsSpear(self.id()));
        this.IsStaff = ko.observable(self.Data.IsStaff(self.id()));
        this.IsSword = ko.observable(self.Data.IsSword(self.id()));
        this.IsFarmAxe = ko.observable(self.Data.IsFarmAxe(self.id()));
        this.IsFarmFishingPole = ko.observable(self.Data.IsFarmFishingPole(self.id()));
        this.IsFarmHammer = ko.observable(self.Data.IsFarmHammer(self.id()));
        this.IsFarmHoe = ko.observable(self.Data.IsFarmHoe(self.id()));
        this.IsFarmSickle = ko.observable(self.Data.IsFarmSickle(self.id()));
        this.IsFarmWaterpot = ko.observable(self.Data.IsFarmWaterpot(self.id()));

        this.IsMaterial = ko.observable(! self.Data.IsEquipment(self.id()));
        this.IsClawsAndFangs = ko.observable(self.Data.IsClawsAndFangs(this.id()));
        this.IsClothsAndSkins = ko.observable(self.Data.IsClothsAndSkins(this.id()));
        this.IsCrystals = ko.observable(self.Data.IsCrystals(this.id()));
        this.IsFeathers = ko.observable(self.Data.IsFeathers(this.id()));
        this.IsFurs = ko.observable(self.Data.IsFurs(this.id()));
        this.IsJewels = ko.observable(self.Data.IsJewels(this.id()));
        this.IsLiquids = ko.observable(self.Data.IsLiquids(this.id()));
        this.IsMinerals = ko.observable(self.Data.IsMinerals(this.id()));
        this.IsPowdersAndSpores = ko.observable(self.Data.IsPowdersAndSpores(this.id()));
        this.IsScales = ko.observable(self.Data.IsScales(this.id()));
        this.IsShards = ko.observable(self.Data.IsShards(this.id()));
        this.IsShellsAndBones = ko.observable(self.Data.IsShellsAndBones(this.id()));
        this.IsSticksAndStems = ko.observable(self.Data.IsSticksAndStems(this.id()));
        this.IsStones = ko.observable(self.Data.IsStones(this.id()));
        this.IsStrings = ko.observable(self.Data.IsStrings(this.id()));

        this.magic1 = ko.observable(self.Context().magic_charge1).extend({ deferred: true });
        this.magic2 = ko.observable(self.Context().magic_charge2).extend({ deferred: true });
        this.magic3 = ko.observable(self.Context().magic_charge3).extend({ deferred: true });
    }

}
export = VectorDataTable;