import ko = require('knockout');
import ISerializable = require('./ISerializable');
import IData = require('./IData');
import ICharacter = require('./ICharacter');
import ICalculator = require('./ICalculator');
import AbstractCharacter = require('./AbstractCharacter');

abstract class AbstractCalculator<TCharacter extends ICharacter> implements ICalculator, ISerializable {

    readonly CtorCharacter: (new(calculator: ICalculator, characterId: number, deserializedObject: any) => TCharacter);

    readonly Data: IData;
    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;
    readonly CharacterList: ko.ObservableArray<ICharacter>;

    readonly elem: HTMLElement;

    constructor(ctorCharacter: (new(calculator: ICalculator, characterId: number, deserializedObject: any) => TCharacter),
                data: IData) {
        
        this.CtorCharacter = ctorCharacter;

        this.Data = data;

        // Can't defer these, otherwise the UI won't show properly
        this.CharacterList = ko.observableArray([]);
        this.IsEnglishSelected = ko.observable(true);
        this.IsJapaneseSelected = ko.observable(true);
    }

    // Delayed so the UI thread has a chance to render the AJAX spinner.
    public AddCharacter = (setBusy: boolean=true, unsetBusy: boolean=true): void => {
        const self = this;
        if(setBusy) { self.IsBusy(true); }
        window.setTimeout(function() {
            const char: ICharacter = new self.CtorCharacter(self,
                        AbstractCharacter.DEFAULT_CHARACTER_ID, AbstractCharacter.DEFAULT_DESERIALIZED_OBJECT);
            self.CharacterList.push(char);
            if(unsetBusy) { self.IsBusy(false); }
        }, 50);
    }

    // App.ts needs to call synchronous, otherwise knockout executes
    // the click binding on the button for some reason and we end up
    // with two characters.
    public AddCharacterSynchronous = (): void => {
        const char: ICharacter = new this.CtorCharacter(this,
                    AbstractCharacter.DEFAULT_CHARACTER_ID, AbstractCharacter.DEFAULT_DESERIALIZED_OBJECT);
        this.CharacterList.push(char);
    }

    // Delayed so the UI thread has a chance to render the AJAX spinner.
    public DeleteCharacter = (character: ICharacter, setBusy: boolean=true, unsetBusy:boolean=true): void => {
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
                let character: ICharacter = self.CharacterList()[i];
                self.CharacterList.remove(character);
            }
            if(unsetBusy) { self.IsBusy(false); }
        }, 50);
    }

    public DisplayFirstCharacterSheet = (): void => {
        const elem: Element | null = document.querySelector('#character-tabs .character button');
        if(elem !== null) {
            (elem as HTMLElement).click();
        }
    }

    public DisplayLastCharacterSheet = (): void => {
        const elems: NodeListOf<Element> = document.querySelectorAll('#character-tabs .character button');
        (elems[elems.length-1] as HTMLElement).click();
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

    public OnExampleClickHandler = (): boolean => {
        throw new Error("Not implemented.");
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
        const self = this;
        this.IsBusy(true);
        window.setTimeout(function() {
            const elem: HTMLInputElement = (document.getElementById('json-deserialize-target') as HTMLInputElement);
            if(elem !== null && elem.value !== null) {
                let characters: ICharacter[] = self.Deserialize(elem.value);
                for(let i=0; i<characters.length; i++) {
                    self.CharacterList.push(characters[i]);
                }
                self.IsBusy(false);
            }
        }, 50);
        return true;
    }

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

    public Deserialize(jsonString: string): ICharacter[] {
        let characters: ICharacter[] = [];
        try {
            let obj = JSON.parse(jsonString);
            let arr = (obj as any[]);
            for(let i=0; i<arr.length; i++) {
                try {
                    let char: ICharacter = new this.CtorCharacter(this, AbstractCharacter.DEFAULT_CHARACTER_ID, arr[i]);
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
export = AbstractCalculator;