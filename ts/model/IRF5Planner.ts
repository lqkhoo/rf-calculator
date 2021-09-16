import IRF5Character = require("./IRF5Character");

interface IRF5Planner {
    readonly CharacterList: ko.ObservableArray<IRF5Character>;
    AddCharacter (): void;
    DeleteCharacter(character: IRF5Character): void;
}
export = IRF5Planner;