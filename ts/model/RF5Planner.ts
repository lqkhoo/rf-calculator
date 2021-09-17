import ko = require('knockout');
import ISerializable = require('./ISerializable');
import IRF5Character = require('./IRF5Character');
// Parent
import IRF5Planner = require('./IRF5Planner');
// Children
import RF5Character = require('./RF5Character');
// Data
import Data = require('./Data');


class RF5Planner implements IRF5Planner, ISerializable {

    // Uncomment this to inspect Data from the console. Otherwise not used.
    readonly Data: Data = Data; 

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;
    readonly CharacterList: ko.ObservableArray<IRF5Character>;

    readonly elem: HTMLElement;

    constructor() {
        // Model
        this.CharacterList = ko.observableArray([]);
        this.IsEnglishSelected = ko.observable(true);
        this.IsJapaneseSelected = ko.observable(true);
    }

    // Delayed so the UI thread has a chance to render the AJAX spinner.
    public AddCharacter = (setBusy: boolean=true, unsetBusy: boolean=true): void => {
        console.trace();
        const self = this;
        if(setBusy) { self.IsBusy(true); }
        window.setTimeout(function() {
            self.CharacterList.push(new RF5Character(self));
            if(unsetBusy) { self.IsBusy(false); }
        }, 50);
    }

    // App.ts needs to call synchronous, otherwise knockout executes
    // the click binding on the button for some reason and we end up
    // with two characters.
    public AddCharacterSynchronous = (): void => {
        this.CharacterList.push(new RF5Character(this));
    }

    // Delayed so the UI thread has a chance to render the AJAX spinner.
    public DeleteCharacter = (character: IRF5Character, setBusy: boolean=true, unsetBusy:boolean=true): void => {
        const self = this;
        if(setBusy) { self.IsBusy(true); }
        window.setTimeout(function() {
            self.CharacterList.remove(character);
            if(unsetBusy) { self.IsBusy(false); }
        }, 50);
    }

    public DeleteAllCharacters = (setBusy: boolean=true, unsetBusy: boolean=true): void => {
        const self = this;
        if(setBusy) { self.IsBusy(true); }
        window.setTimeout(function() {
            // Delete is much faster from the end.
            for(let i=self.CharacterList().length; i>-1;i--) {
                let character: IRF5Character = self.CharacterList()[i];
                self.CharacterList.remove(character);
            }
            if(unsetBusy) { self.IsBusy(false); }
        }, 50);
    }

    public DisplayFirstCharacterSheet = (): void => {
        const elem: Element | null = document.querySelector('#character-tabs button');
        if(elem !== null) {
            (elem as HTMLElement).click();
        }
    }

    // We don't use ko.Observable because we want this to execute immediately.
    public IsBusy = (isBusy: boolean): void => {
        const elem: HTMLElement | null = document.getElementById('busy-indicator');
        if(elem !== null) {
            if(isBusy) {
                elem.classList.remove('displayNone');
            } else {
                elem.classList.add('displayNone');
            }
        }
    }

    public OnLoadExampleClickHandler = (): boolean => {
        this.IsBusy(true);
        let json: string = "";
        let characters: IRF5Character[] = this.Deserialize(json);

        for(let i=0; i<characters.length; i++) {
            this.CharacterList.push(characters[i]);
        }
        this.IsBusy(false);
        return true;
    }

    public OnSaveToJsonClickHandler = (): boolean => {
        const jsonString: string = this.Serialize();
        const el = document.getElementById('json-serialize-target');
        if(el !== null) {
            el.textContent = jsonString;
        }
        return true;
    }

    public OnLoadJsonAppendClickHandler = (): boolean => {
        this.IsBusy(true);
        const elem: HTMLInputElement = (document.getElementById('json-deserialize-target') as HTMLInputElement);
        if(elem !== null && elem.value !== null) {
            let characters: IRF5Character[] = this.Deserialize(elem.value);
            for(let i=0; i<characters.length; i++) {
                this.CharacterList.push(characters[i]);
            }
            this.IsBusy(false);
        }
        return true;
    }

    /*
    public OnLoadJsonOverwriteClickHandler = (): boolean => {
        this.IsBusy(true);
        const elem: HTMLInputElement = (document.getElementById('json-deserialize-target') as HTMLInputElement);
        if(elem !== null && elem.value !== null) {
            // Do this first so we don't delete anything if an error is thrown.
            let characters: IRF5Character[] = this.Deserialize(elem.value);
            if(characters.length !== 0) {
                this.DeleteAllCharacters();
                for(let i=0; i<characters.length; i++) {
                    this.CharacterList.push(characters[i]);
                }
            }
        }
        this.IsBusy(false);
        return true;
    }
    */

    public DisplayError = (e: string): void => {
        let elem: HTMLElement|null = document.getElementById('body');

        const elAlert = document.createElement('div');
        elAlert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');

        const elTitle = document.createElement('h4');
        elTitle.textContent = 'Error';

        const elException = document.createElement('span');
        elException.textContent = e;

        const elHr = document.createElement('hr');

        const elText = document.createElement('span');
        elText.textContent = "Stack trace is available in the console.";

        const elButton = document.createElement('button');
        elButton.classList.add('btn-close');
        elButton.setAttribute('type', 'button');
        elButton.setAttribute('data-bs-dismiss', 'alert');

        elAlert.append(elTitle, elException, elHr, elText, elButton);

        elem?.appendChild(elAlert);
    }

    public toJSON(): any {
        return this.CharacterList();
    }

    public Serialize(): string {
        return JSON.stringify(this.CharacterList(), null, 0);
    }

    public Deserialize(jsonString: string): IRF5Character[] {
        let characters: IRF5Character[] = [];
        try {
            let obj = JSON.parse(jsonString);
            let arr = (obj as any[]);
            for(let i=0; i<arr.length; i++) {
                try {
                    let char: RF5Character = new RF5Character(this, 0, arr[i]);
                    characters.push(char);
                } catch (e) { // Deserialization error
                    console.error(e);
                    console.trace();
                    this.DisplayError(e.toString());
                }
            }
        } catch (e) { // Parse error
            console.error(e);
            console.trace();
            this.DisplayError(e.toString());
        }
        return characters;
    }
}
export = RF5Planner;