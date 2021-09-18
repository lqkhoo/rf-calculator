import ko = require('knockout');
// Super
import RF5StatVector = require('./RF5StatVector');
// Parent
import RF5ItemTable = require('./RF5ItemTable');
// Data
import RF5Data = require('./RF5Data');

class VectorItemTable extends RF5StatVector {

    constructor(isBaseItem: boolean) {
        super(0, isBaseItem);
    }

}
export = VectorItemTable;