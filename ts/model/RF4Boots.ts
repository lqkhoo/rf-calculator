// Super
import RF4Item = require('./RF4Item');
// Parent
import ICharacter = require('./ICharacter');
    
class RF4Boots extends RF4Item {

    constructor(character: ICharacter,
                item_id: number=RF4Item.DEFAULT_ITEM_ID,
                deserializedObject: any=undefined) {
        
        super(character, "boots", item_id, deserializedObject);
    }
}
export = RF4Boots;
