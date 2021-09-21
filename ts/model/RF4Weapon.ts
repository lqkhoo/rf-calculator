
import ko = require('knockout');
// Super
import IWeapon = require('./IWeapon');
// Parent
import ICharacter = require('./ICharacter');
// Children
import StatVector = require('./StatVector');
// Data
import RF5Weapon = require('./RF5Weapon');
import AbstractItem = require('./AbstractItem');


//// Note: Extends RF5Weapon, not RF4Item. It's easier this way.
class RF4Weapon extends RF5Weapon implements IWeapon {

    constructor(character: ICharacter,
                item_id: number=AbstractItem.DEFAULT_ITEM_ID,
                deserializedObject: any=AbstractItem.DEFAULT_DESERIALIZED_OBJECT) {

        super(character, item_id, deserializedObject);
        const self = this;

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.stat_MAT = ko.pureComputed(self._compute_stat_MAT).extend({ deferred: true });
        this.stat_MDF = ko.pureComputed(self._compute_stat_MDF).extend({ deferred: true });
        this.stat_STR = ko.pureComputed(self._compute_stat_STR).extend({ deferred: true });
        this.stat_INT = ko.pureComputed(self._compute_stat_INT).extend({ deferred: true });
        this.stat_VIT = ko.pureComputed(self._compute_stat_VIT).extend({ deferred: true });
        this.stat_atk_CRT = ko.pureComputed(self._compute_stat_atk_CRT).extend({ deferred: true });
        this.stat_atk_KNO = ko.pureComputed(self._compute_stat_atk_KNO).extend({ deferred: true });
        this.stat_atk_STN = ko.pureComputed(self._compute_stat_atk_STN).extend({ deferred: true });
        this.stat_atk_DIZ = ko.pureComputed(self._compute_stat_atk_DIZ).extend({ deferred: true });
        this.stat_atk_PSN = ko.pureComputed(self._compute_stat_atk_PSN).extend({ deferred: true });
        this.stat_atk_SEA = ko.pureComputed(self._compute_stat_atk_SEA).extend({ deferred: true });
        this.stat_atk_PAR = ko.pureComputed(self._compute_stat_atk_PAR).extend({ deferred: true });
        this.stat_atk_SLP = ko.pureComputed(self._compute_stat_atk_SLP).extend({ deferred: true });
        this.stat_atk_FTG = ko.pureComputed(self._compute_stat_atk_FTG).extend({ deferred: true });
        this.stat_atk_SCK = ko.pureComputed(self._compute_stat_atk_SCK).extend({ deferred: true });
        this.stat_atk_FNT = ko.pureComputed(self._compute_stat_atk_FNT).extend({ deferred: true });
        this.stat_atk_DRN = ko.pureComputed(self._compute_stat_atk_DRN).extend({ deferred: true });
        this.stat_def_ele_FIRE = ko.pureComputed(self._compute_def_ele_FIRE).extend({ deferred: true });
        this.stat_def_ele_WATER = ko.pureComputed(self._compute_def_ele_WATER).extend({ deferred: true });
        this.stat_def_ele_EARTH = ko.pureComputed(self._compute_def_ele_EARTH).extend({ deferred: true });
        this.stat_def_ele_WIND = ko.pureComputed(self._compute_def_ele_WIND).extend({ deferred: true });
        this.stat_def_ele_LIGHT = ko.pureComputed(self._compute_def_ele_LIGHT).extend({ deferred: true });
        this.stat_def_ele_DARK = ko.pureComputed(self._compute_def_ele_DARK).extend({ deferred: true });
        this.stat_def_ele_LOVE = ko.pureComputed(self._compute_def_ele_LOVE).extend({ deferred: true });
        this.stat_def_ele_VOID = ko.pureComputed(self._compute_def_ele_VOID).extend({ deferred: true });
        this.stat_def_CRT = ko.pureComputed(self._compute_def_CRT).extend({ deferred: true });
        this.stat_def_KNO = ko.pureComputed(self._compute_def_KNO).extend({ deferred: true });
        this.stat_def_STN = ko.pureComputed(self._compute_def_STN).extend({ deferred: true });
        this.stat_def_DIZ = ko.pureComputed(self._compute_def_DIZ).extend({ deferred: true });
        this.stat_def_PSN = ko.pureComputed(self._compute_def_PSN).extend({ deferred: true });
        this.stat_def_SEA = ko.pureComputed(self._compute_def_SEA).extend({ deferred: true });
        this.stat_def_PAR = ko.pureComputed(self._compute_def_PAR).extend({ deferred: true });
        this.stat_def_SLP = ko.pureComputed(self._compute_def_SLP).extend({ deferred: true });
        this.stat_def_FTG = ko.pureComputed(self._compute_def_FTG).extend({ deferred: true });
        this.stat_def_SCK = ko.pureComputed(self._compute_def_SCK).extend({ deferred: true });
        this.stat_def_FNT = ko.pureComputed(self._compute_def_FNT).extend({ deferred: true });
        this.stat_def_DRN = ko.pureComputed(self._compute_def_DRN).extend({ deferred: true });
        this.stat_chargespeed = ko.pureComputed(self._compute_stat_chargespeed).extend({ deferred: true });
        this.stat_attacklength = ko.pureComputed(self._compute_stat_attacklength).extend({ deferred: true });
        this.FinalizeVectorOverride();

        this.Element            = ko.pureComputed(self._compute_element).extend({ deferred: true });

        this.MagicIdCharge1Name = ko.pureComputed(self._compute_magicCharge1Name).extend({ deferred: true });
        this.MagicIdCharge2Name = ko.pureComputed(self._compute_magicCharge2Name).extend({ deferred: true });
        this.MagicIdCharge3Name = ko.pureComputed(self._compute_magicCharge3Name).extend({ deferred: true });
    }

    public override toJSON = (): any => {
        return this._toJSON_RF5Item();
    }

    protected override _crossElement = (originalElement: ElementType, newElement: ElementType): ElementType => {
        // Different from RF5.
        // Non-elemental crystals do nothing.
        // Crystal of different element first makes item non-elemental.
        if(originalElement === "FIREWATER") {
            if(newElement === "FIRE") { return "FIRE"; }
            if(newElement === "WATER") { return "WATER"; }
            else { return "NONE"; }
        }
        if(originalElement === "EARTHWIND") {
            if(newElement === "EARTH") { return "EARTH"; }
            if(newElement === "WIND") { return "WIND"; }
            else { return "NONE"; }
        }
        if(originalElement === "NONE") {
            return newElement;
        } else {
            if(originalElement !== newElement) {
                return "NONE";
            }
            return newElement; // which is same as originalElement
        }        
    }

    protected override _compute_number_helper = (fieldName: StatVectorKey, defaultValue: number) => {
        const self = this;
        
        return function(): number {
            // scoper call is from RF5Item.
            let val: number = self._compute_number_helper_scoper.call(self, fieldName, defaultValue)();
            val = Math.floor(val*-1)*-1; // <-- only difference
            return val;
        };
    }

    protected override _compute_stat_ATK = this._compute_number_helper(StatVector.KEY_stat_ATK, 0);
    protected override _compute_stat_DEF = this._compute_number_helper(StatVector.KEY_stat_DEF, 0);
    protected override _compute_stat_MAT = this._compute_number_helper(StatVector.KEY_stat_MAT, 0);
    protected override _compute_stat_MDF = this._compute_number_helper(StatVector.KEY_stat_MDF, 0);
    protected override _compute_stat_STR = this._compute_number_helper(StatVector.KEY_stat_STR, 0);
    protected override _compute_stat_INT = this._compute_number_helper(StatVector.KEY_stat_INT, 0);
    protected override _compute_stat_VIT = this._compute_number_helper(StatVector.KEY_stat_VIT, 0);
    protected override _compute_stat_atk_CRT = this._compute_number_helper(StatVector.KEY_stat_atk_CRT, 0);
    protected override _compute_stat_atk_KNO = this._compute_number_helper(StatVector.KEY_stat_atk_KNO, 0);
    protected override _compute_stat_atk_STN = this._compute_number_helper(StatVector.KEY_stat_atk_STN, 0);
    protected override _compute_stat_atk_DIZ = this._compute_number_helper(StatVector.KEY_stat_atk_DIZ, 0);
    protected override _compute_stat_atk_PSN = this._compute_number_helper(StatVector.KEY_stat_atk_PSN, 0);
    protected override _compute_stat_atk_SEA = this._compute_number_helper(StatVector.KEY_stat_atk_SEA, 0);
    protected override _compute_stat_atk_PAR = this._compute_number_helper(StatVector.KEY_stat_atk_PAR, 0);
    protected override _compute_stat_atk_SLP = this._compute_number_helper(StatVector.KEY_stat_atk_SLP, 0);
    protected override _compute_stat_atk_FTG = this._compute_number_helper(StatVector.KEY_stat_atk_FTG, 0);
    protected override _compute_stat_atk_SCK = this._compute_number_helper(StatVector.KEY_stat_atk_SCK, 0);
    protected override _compute_stat_atk_FNT = this._compute_number_helper(StatVector.KEY_stat_atk_FNT, 0);
    protected override _compute_stat_atk_DRN = this._compute_number_helper(StatVector.KEY_stat_atk_DRN, 0);
    protected override _compute_def_ele_FIRE = this._compute_number_helper(StatVector.KEY_stat_def_ele_FIRE, 0);
    protected override _compute_def_ele_WATER = this._compute_number_helper(StatVector.KEY_stat_def_ele_WATER, 0);
    protected override _compute_def_ele_EARTH = this._compute_number_helper(StatVector.KEY_stat_def_ele_EARTH, 0);
    protected override _compute_def_ele_WIND = this._compute_number_helper(StatVector.KEY_stat_def_ele_WIND, 0);
    protected override _compute_def_ele_LIGHT = this._compute_number_helper(StatVector.KEY_stat_def_ele_LIGHT, 0);
    protected override _compute_def_ele_DARK = this._compute_number_helper(StatVector.KEY_stat_def_ele_DARK, 0);
    protected override _compute_def_ele_LOVE = this._compute_number_helper(StatVector.KEY_stat_def_ele_LOVE, 0);
    protected override _compute_def_ele_VOID = this._compute_number_helper(StatVector.KEY_stat_def_ele_VOID, 0);
    protected override _compute_def_CRT = this._compute_number_helper(StatVector.KEY_stat_def_CRT, 0);
    protected override _compute_def_KNO = this._compute_number_helper(StatVector.KEY_stat_def_KNO, 0);
    protected override _compute_def_STN = this._compute_number_helper(StatVector.KEY_stat_def_STN, 0);
    protected override _compute_def_DIZ = this._compute_number_helper(StatVector.KEY_stat_def_DIZ, 0);
    protected override _compute_def_PSN = this._compute_number_helper(StatVector.KEY_stat_def_PSN, 0);
    protected override _compute_def_SEA = this._compute_number_helper(StatVector.KEY_stat_def_SEA, 0);
    protected override _compute_def_PAR = this._compute_number_helper(StatVector.KEY_stat_def_PAR, 0);
    protected override _compute_def_SLP = this._compute_number_helper(StatVector.KEY_stat_def_SLP, 0);
    protected override _compute_def_FTG = this._compute_number_helper(StatVector.KEY_stat_def_FTG, 0);
    protected override _compute_def_SCK = this._compute_number_helper(StatVector.KEY_stat_def_SCK, 0);
    // Charge speed, attacklength same as RF5Weapon.

    protected override _compute_magicCharge1Name = (): string => {
        let magicId: number = this.MagicIdCharge1();
        if(magicId === 0) { return "NONE" }
        return (this.Data.Magics as any)[magicId];
    }

    protected override _compute_magicCharge2Name = (): string => {
        let magicId: number = this.MagicIdCharge2();
        if(magicId === 0) { return "NONE" }
        return (this.Data.Magics as any)[magicId];
    }

    protected override _compute_magicCharge3Name = (): string => {
        let magicId: number = this.MagicIdCharge3();
        if(magicId === 0) { return "NONE" }
        return (this.Data.Magics as any)[magicId];
    }
}
export = RF4Weapon;