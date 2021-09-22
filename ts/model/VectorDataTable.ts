import ko = require('knockout');
import IData = require('./IData');
// Super
import StatVector = require('./StatVector');

// Not used at the moment, as table is pre-generated.
class VectorDataTable extends StatVector {

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

        this.IsEquipment = ko.observable(this.Data.IsEquipment(this.id())).extend({ deferred: true });

        this.IsWeapon = ko.observable(this.Data.IsWeapon(this.id())).extend({ deferred: true });
        this.IsShield = ko.observable(this.Data.IsShield(this.id())).extend({ deferred: true });
        this.IsHeadgear = ko.observable(this.Data.IsHeadgear(this.id())).extend({ deferred: true });
        this.IsArmor = ko.observable(this.Data.IsArmor(this.id())).extend({ deferred: true });
        this.IsBoots = ko.observable(this.Data.IsBoots(this.id())).extend({ deferred: true });
        this.IsAccessory = ko.observable(this.Data.IsAccessory(this.id())).extend({ deferred: true });

        this.Is2hSword = ko.observable(this.Data.Is2hSword(this.id())).extend({ deferred: true });
        this.IsAxe = ko.observable(this.Data.IsAxe(this.id())).extend({ deferred: true });
        this.IsDualblades = ko.observable(this.Data.IsDualblades(this.id())).extend({ deferred: true });
        this.IsFists = ko.observable(this.Data.IsFists(this.id())).extend({ deferred: true });
        this.IsHammer = ko.observable(this.Data.IsHammer(this.id())).extend({ deferred: true });
        this.IsSpear = ko.observable(this.Data.IsSpear(this.id())).extend({ deferred: true });
        this.IsStaff = ko.observable(this.Data.IsStaff(this.id())).extend({ deferred: true });
        this.IsSword = ko.observable(this.Data.IsSword(this.id())).extend({ deferred: true });
        this.IsFarmAxe = ko.observable(this.Data.IsFarmAxe(this.id())).extend({ deferred: true });
        this.IsFarmFishingPole = ko.observable(this.Data.IsFarmFishingPole(this.id())).extend({ deferred: true });
        this.IsFarmHammer = ko.observable(this.Data.IsFarmHammer(this.id())).extend({ deferred: true });
        this.IsFarmHoe = ko.observable(this.Data.IsFarmHoe(this.id())).extend({ deferred: true });
        this.IsFarmSickle = ko.observable(this.Data.IsFarmSickle(this.id())).extend({ deferred: true });
        this.IsFarmWaterpot = ko.observable(this.Data.IsFarmWaterpot(this.id())).extend({ deferred: true });

        this.IsMaterial = ko.observable(! this.Data.IsEquipment(this.id())).extend({ deferred: true });
        this.IsClawsAndFangs = ko.observable(this.Data.IsClawsAndFangs(this.id())).extend({ deferred: true });
        this.IsClothsAndSkins = ko.observable(this.Data.IsClothsAndSkins(this.id())).extend({ deferred: true });
        this.IsCrystals = ko.observable(this.Data.IsCrystals(this.id())).extend({ deferred: true });
        this.IsFeathers = ko.observable(this.Data.IsFeathers(this.id())).extend({ deferred: true });
        this.IsFurs = ko.observable(this.Data.IsFurs(this.id())).extend({ deferred: true });
        this.IsJewels = ko.observable(this.Data.IsJewels(this.id())).extend({ deferred: true });
        this.IsLiquids = ko.observable(this.Data.IsLiquids(this.id())).extend({ deferred: true });
        this.IsMinerals = ko.observable(this.Data.IsMinerals(this.id())).extend({ deferred: true });
        this.IsPowdersAndSpores = ko.observable(this.Data.IsPowdersAndSpores(this.id())).extend({ deferred: true });
        this.IsScales = ko.observable(this.Data.IsScales(this.id())).extend({ deferred: true });
        this.IsShards = ko.observable(this.Data.IsShards(this.id())).extend({ deferred: true });
        this.IsShellsAndBones = ko.observable(this.Data.IsShellsAndBones(this.id())).extend({ deferred: true });
        this.IsSticksAndStems = ko.observable(this.Data.IsSticksAndStems(this.id())).extend({ deferred: true });
        this.IsStones = ko.observable(this.Data.IsStones(this.id())).extend({ deferred: true });
        this.IsStrings = ko.observable(this.Data.IsStrings(this.id())).extend({ deferred: true });

        this.magic1 = ko.observable(this.Context().magic_charge1).extend({ deferred: true });
        this.magic2 = ko.observable(this.Context().magic_charge2).extend({ deferred: true });
        this.magic3 = ko.observable(this.Context().magic_charge3).extend({ deferred: true });
    }

}
export = VectorDataTable;