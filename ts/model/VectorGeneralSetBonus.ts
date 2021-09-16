import ko = require('knockout');
import IRF5Item = require('./IRF5Item');
import IRF5Slot = require('./IRF5Slot');
import RF5AbstractSlot = require('./RF5AbstractSlot');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import IRF5Character = require('./IRF5Character');
// Data
import Data = require('./Data');

class VectorGeneralSetBonus extends RF5StatVector {

    readonly Character: ko.Observable<IRF5Character>;

    readonly HasGeneralSetBonus: ko.PureComputed<boolean>;

    override readonly stat_ATK: ko.PureComputed<number>;
    override readonly stat_DEF: ko.PureComputed<number>;

    constructor(character: IRF5Character) {
        super(0, false);
        var self = this;

        this.stat_ATK = ko.pureComputed(function() {
            if(! self.HasGeneralSetBonus()) { return 0; }
            return 0.2 * (
                self.Character().stat_ATK() + 
                self.Character().stat_STR() + 
                self.Character().EquipmentStats().stat_ATK() +
                self.Character().EquipmentStats().stat_STR()
            );
        });
        this.stat_DEF = ko.pureComputed(function() {
            if(! self.HasGeneralSetBonus()) { return 0; }
            return 0.3 * (
                self.Character().stat_VIT() / 2 +
                self.Character().stat_DEF() +
                self.Character().EquipmentStats().stat_VIT() / 2 +
                self.Character().EquipmentStats().stat_DEF()
            );
        });
        this.FinalizeVectorOverride();

        this.HasGeneralSetBonus = ko.pureComputed(function() {
            // General's boots / acce don't exist, so skip those.

            function hasGeneralsEffect(item: IRF5Item, idMatchFunction: (id: number) => boolean): boolean {
                let baseItem: IRF5Slot = item.BaseItem();
                if(! baseItem.IsBeingOverridden()) {
                    return idMatchFunction(baseItem.id());
                } else {
                    for(let i=RF5AbstractSlot.RECIPE_START_IDX; i<RF5AbstractSlot.ARRANGE_START_IDX; i++) {
                        let recipeSlot: IRF5Slot = item.GetSlotByIndex(i);
                        if(! recipeSlot.IsOverriding()) { continue; }
                        else {
                            return idMatchFunction(recipeSlot.id());
                        }
                    }
                }
                return false;
            }

            let activeWeaponIdx: number = self.Character().ActiveWeaponIdx();
            let activeShieldIdx: number = self.Character().ActiveShieldIdx();
            let activeHeadgearIdx: number = self.Character().ActiveHeadgearIdx();
            let activeArmorIdx: number = self.Character().ActiveArmorIdx();

            if(activeWeaponIdx === -1
                    || activeShieldIdx === -1
                    || activeHeadgearIdx === -1
                    || activeArmorIdx === -1) {
                return false;
            }

            return (
                hasGeneralsEffect(self.Character().Weapons()[activeWeaponIdx], Data.IsGeneralsHoe)
                && hasGeneralsEffect(self.Character().Shields()[activeShieldIdx], Data.IsGeneralsShield)
                && hasGeneralsEffect(self.Character().Headgears()[activeHeadgearIdx], Data.IsGeneralsHat)
                && hasGeneralsEffect(self.Character().Armors()[activeArmorIdx], Data.IsGeneralsRobe)
            );

        });
        
        this.Character = ko.observable(character);

    }

}
export = VectorGeneralSetBonus;