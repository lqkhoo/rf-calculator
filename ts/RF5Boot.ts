import RF5Item = require('./RF5Item');
import RF5SlotRecipe = require('./RF5SlotRecipe');
import RF5SlotArrange = require('./RF5SlotArrange');
import RF5SlotUpgrade = require('./RF5SlotUpgrade');
import RF5SlotBaseItem = require('./RF5SlotBaseItem');
import RF5Character = require('./RF5Character');
    
class RF5Boot extends RF5Item {

    constructor(character: RF5Character, item_id: number=RF5Item.DEFAULT_ITEM_ID) {
        super(character, "boots", item_id);

    }

}
export = RF5Boot;
