// Super
import RF5StatVector = require('./RF5StatVector');

// We only use this so we can refer to the static properties without importing some
// other concrete class.
abstract class RF5AbstractSlot extends RF5StatVector {

    static readonly DEFAULT_ITEM_ID: number = 0;
    static readonly RECIPE_START_IDX: number = 1;
    static readonly ARRANGE_START_IDX: number = 7;
    static readonly UPGRADE_START_IDX: number = 10;
    static readonly SLOT_END_IDX: number = 19; // non-inclusive

}
export = RF5AbstractSlot;