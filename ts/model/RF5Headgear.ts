// Super
import RF5Item = require('./RF5Item');
// Parent
import IRF5Character = require('./IRF5Character');
    
class RF5Headgear extends RF5Item {

    constructor(character: IRF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID, deserializedObject: any=undefined) {
        super(character, "headgear", item_id, deserializedObject);
    }
}
export = RF5Headgear;
