// Parent
import ICalculator = require('./ICalculator');
// Children
import RF4Accessory = require('./RF4Accessory');
import RF4Armor = require('./RF4Armor');
import RF4Boots = require('./RF4Boots');
import RF4Headgear = require('./RF4Headgear');
import RF4Shield = require('./RF4Shield');
import RF4Weapon = require('./RF4Weapon');
// VM
import AbstractCharacter = require('./AbstractCharacter');

class RF4Character extends AbstractCharacter<RF4Weapon, RF4Shield, RF4Headgear, RF4Armor, RF4Boots, RF4Accessory> {

    constructor(calculator: ICalculator,
                characterId: number=AbstractCharacter.DEFAULT_CHARACTER_ID,
                deserializedObject: any=undefined) {

        super(RF4Weapon, RF4Shield, RF4Headgear, RF4Armor, RF4Boots, RF4Accessory, calculator, characterId, deserializedObject);
    }

}
export = RF4Character;
