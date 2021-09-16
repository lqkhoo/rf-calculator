import ko = require('knockout');
import IRF5Character = require('./model/IRF5Character');
// Parent
import IRF5Planner = require('./model/IRF5Planner');
// Children
import RF5Character = require('./model/RF5Character');
// Data
import Data = require('./model/Data');



class RF5Planner implements IRF5Planner {

    // Uncomment this to inspect Data from the console. Otherwise not used.
    readonly Data: Data = Data; 

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;
    readonly CharacterList: ko.ObservableArray<IRF5Character>;

    constructor() {
        // Model
        this.CharacterList = ko.observableArray([]);
        this.IsEnglishSelected = ko.observable(true);
        this.IsJapaneseSelected = ko.observable(true);
    }

    public AddCharacter = (): void => {
        this.CharacterList.push(new RF5Character(this));
        console.log('add character');
    }

    public DeleteCharacter = (character: IRF5Character): void => {
        this.CharacterList.remove(character);
    }

    public DisplayFirstCharacterSheet = (): void => {
        var elem: Element | null = document.querySelector('#character-tabs button');
        if(elem !== null) {
            (elem as HTMLElement).click();
        }
    }



}
export = RF5Planner;