import ko = require('knockout');
import IStatVector = require('./IStatVector');
import IItem = require('./IItem');
// Super
import ICharacter = require('./ICharacter');
// Parent
import ICalculator = require('./ICalculator');
// Children
import RF5Accessory = require('./RF5Accessory');
import RF5Armor = require('./RF5Armor');
import RF5Boots = require('./RF5Boots');
import RF5Headgear = require('./RF5Headgear');
import RF5Shield = require('./RF5Shield');
import RF5Weapon = require('./RF5Weapon');
// VM
import AbstractCharacter = require('./AbstractCharacter');

class RF5Character extends AbstractCharacter<RF5Weapon, RF5Shield, RF5Headgear, RF5Armor, RF5Boots, RF5Accessory> {

    constructor(calculator: ICalculator,
                characterId: number=AbstractCharacter.DEFAULT_CHARACTER_ID,
                deserializedObject: any=undefined) {

        super(RF5Weapon, RF5Shield, RF5Headgear, RF5Armor, RF5Boots, RF5Accessory, calculator, characterId, deserializedObject);
    }
}
export = RF5Character;
