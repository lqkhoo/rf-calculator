// Super
import RF5Item = require('./RF5Item');
// Parent
import ICharacter = require('./ICharacter');
    
class RF5Boot extends RF5Item {

    constructor(character: ICharacter,
                item_id: number=RF5Item.DEFAULT_ITEM_ID,
                deserializedObject: any=undefined) {
        
        super(character, "boots", item_id, deserializedObject);
    }
}
export = RF5Boot;
