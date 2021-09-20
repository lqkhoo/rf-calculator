// Super
import RF5Item = require('./RF5Item');
// Parent
import ICharacter = require('./ICharacter');
    
class RF5Accessory extends RF5Item {

    constructor(character: ICharacter,
                item_id: number=RF5Item.DEFAULT_ITEM_ID,
                deserializedObject: any=undefined) {
        
        super(character, "accessory", item_id, deserializedObject);
    }
}
export = RF5Accessory;
