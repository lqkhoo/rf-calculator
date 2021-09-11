// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
    
class RF5Weapon extends RF5Item {

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID) {
        super(character, "weapon", item_id);
    }

}
export = RF5Weapon;
