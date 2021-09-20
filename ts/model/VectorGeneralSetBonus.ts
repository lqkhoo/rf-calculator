import ko = require('knockout');
import IItem = require('./IItem');
import ISlot = require('./ISlot');
import RF5AbstractSlot = require('./RF5AbstractSlot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import ICharacter = require('./ICharacter');

class VectorGeneralSetBonus extends RF5StatVector {

    readonly Character: ko.Observable<ICharacter>;

    readonly HasGeneralSetBonus: ko.PureComputed<boolean>;

    constructor(character: ICharacter) {

        super(character.Data, 0, false);
        const self = this;

        this.stat_ATK = ko.pureComputed(self._compute_stat_ATK).extend({ deferred: true });
        this.stat_DEF = ko.pureComputed(self._compute_stat_DEF).extend({ deferred: true });
        this.FinalizeVectorOverride();

        this.HasGeneralSetBonus = ko.pureComputed(self._compute_hasGeneralSetBonus).extend({ deferred: true });
        
        this.Character = ko.observable(character).extend({ deferred: true });

    }

    protected override _compute_stat_ATK = (): number => {
        if(! this.HasGeneralSetBonus()) { return 0; }
        return 0.2 * (
            this.Character().stat_ATK() + 
            this.Character().stat_STR() + 
            this.Character().EquipmentStats().stat_ATK() +
            this.Character().EquipmentStats().stat_STR()
        )
    };

    protected override _compute_stat_DEF = (): number => {
        if(! this.HasGeneralSetBonus()) { return 0; }
        return 0.3 * (
            this.Character().stat_VIT() / 2 +
            this.Character().stat_DEF() +
            this.Character().EquipmentStats().stat_VIT() / 2 +
            this.Character().EquipmentStats().stat_DEF()
        );
    };

    protected _compute_hasGeneralSetBonus = (): boolean => {

        // General's boots / acce don't exist, so skip those.

        function hasGeneralsEffect(item: IItem, idMatchFunction: (id: number) => boolean): boolean {
            let baseItem: ISlot = item.BaseItem();
            if(! baseItem.IsBeingOverridden()) {
                return idMatchFunction(baseItem.id());
            } else {
                for(let i=RF5AbstractSlot.RECIPE_START_IDX; i<RF5AbstractSlot.ARRANGE_START_IDX; i++) {
                    let recipeSlot: ISlot = item.GetSlotByIndex(i);
                    if(! recipeSlot.IsOverriding()) { continue; }
                    else {
                        return idMatchFunction(recipeSlot.id());
                    }
                }
            }
            return false;
        }

        let activeWeaponIdx: number = this.Character().ActiveWeaponIdx();
        let activeShieldIdx: number = this.Character().ActiveShieldIdx();
        let activeHeadgearIdx: number = this.Character().ActiveHeadgearIdx();
        let activeArmorIdx: number = this.Character().ActiveArmorIdx();

        if(activeWeaponIdx === -1
                || activeShieldIdx === -1
                || activeHeadgearIdx === -1
                || activeArmorIdx === -1) {
            return false;
        }

        return (
            hasGeneralsEffect(this.Character().Weapons()[activeWeaponIdx], this.Data.IsGeneralsHoe)
            && hasGeneralsEffect(this.Character().Shields()[activeShieldIdx], this.Data.IsGeneralsShield)
            && hasGeneralsEffect(this.Character().Headgears()[activeHeadgearIdx], this.Data.IsGeneralsHat)
            && hasGeneralsEffect(this.Character().Armors()[activeArmorIdx], this.Data.IsGeneralsRobe)
        );
    };

}
export = VectorGeneralSetBonus;