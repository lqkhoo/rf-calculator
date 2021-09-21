// Super
import StatVector = require('./StatVector');

abstract class AbstractItem extends StatVector {

    static readonly NSLOTS_RECIPE: number = 6;
    static readonly NSLOTS_ARRANGE: number = 3;
    static readonly NSLOTS_UPGRADE: number = 9;
    static readonly DEFAULT_ITEM_ID: number = 0;
    static readonly DEFAULT_DESERIALIZED_OBJECT: any = undefined;

}
export = AbstractItem;
