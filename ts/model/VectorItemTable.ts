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
    readonly IsHammer: ko.Observable<boolean>;
    readonly IsSpear: ko.Observable<boolean>;
    readonly IsStaff: ko.Observable<boolean>;
    readonly IsSword: ko.Observable<boolean>;
    readonly IsFarmAxe: ko.Observable<boolean>;
    readonly IsFishingPole: ko.Observable<boolean>;
    readonly isFarmHammer: ko.Observable<boolean>;
    readonly IsFarmHoe: ko.Observable<boolean>;
    readonly IsFarmSickle: ko.Observable<boolean>;
    readonly IsFarmWaterpot: ko.Observable<boolean>;

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
        var self = this;

        this.magic1 = ko.observable(self.Context().magic_charge1);
        this.magic2 = ko.observable(self.Context().magic_charge2);
        this.magic3 = ko.observable(self.Context().magic_charge3);
    }

}
export = VectorItemTable;