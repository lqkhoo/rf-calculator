import IData = require("./IData");
import ICharacter = require("./ICharacter");

interface ICalculator {
    readonly Data: IData;
    readonly CharacterList: ko.ObservableArray<ICharacter>;
    AddCharacter (): void;
    DeleteCharacter(character: ICharacter): void;
}
export = ICalculator;