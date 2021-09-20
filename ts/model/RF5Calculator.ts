import ko = require('knockout');
import ISerializable = require('./ISerializable');
import IRF5Character = require('./IRF5Character');
// Parent
import IRF5Calculator = require('./IRF5Calculator');
// Children
import RF5Character = require('./RF5Character');
// Data
import RF5Data = require('./RF5Data');


class RF5Planner implements IRF5Calculator, ISerializable {

    // Uncomment this to inspect Data from the console. Otherwise not used.
    readonly Data: RF5Data = RF5Data; 

    // Model
    readonly IsEnglishSelected: ko.Observable<boolean>;
    readonly IsJapaneseSelected: ko.Observable<boolean>;
    readonly CharacterList: ko.ObservableArray<IRF5Character>;

    readonly elem: HTMLElement;

    constructor() {
        // Model
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
        const self = this;
        this.IsBusy(true);
        window.setTimeout(function() {
            const jsonString: string = '[{"id":40,"Accessories":[{"isActive":true,"ids":[1331,2158,2175,2189,2165,165,1337,1337,1332,1367,2282,2171,30,2172,2243,2166,2167,2168,2169],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1337,2155,168,1332,0,0,0,1332,1367,0,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1332,2178,2158,2272,2179,1367,0,1367,0,0,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1367,2159,2328,2272,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]}],"Armors":[{"isActive":true,"ids":[1218,2327,2311,2312,2349,2189,1218,2011,102,102,102,102,2011,2358,2171,2166,2167,2168,2169],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1218,2327,2311,2312,2349,2189,1200,2011,102,102,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1200,2273,2011,102,102,0,0,2011,102,102,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]}],"Boots":[{"isActive":true,"ids":[1264,2311,2187,2272,2228,2327,1265,1265,1261,1258,2358,2171,30,2172,169,2166,2167,2168,2169],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1265,2327,2311,2312,2349,2203,1261,1261,1258,0,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1261,2278,2303,2307,2170,2220,1258,1258,0,0,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1258,2228,2157,2156,2273,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]}],"Headgears":[{"isActive":true,"ids":[1106,2228,2228,165,165,165,1130,2011,102,102,102,102,2011,2183,2171,2166,2167,2168,2169],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1130,2349,2176,2278,2188,2189,1128,2011,102,102,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1128,29,2011,102,102,0,0,2011,102,102,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]}],"Shields":[{"isActive":true,"ids":[1000,2159,165,165,165,165,1005,2011,102,102,102,102,2011,2358,2171,2166,2167,2168,2169],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1005,2334,2154,2202,2188,1000,0,2011,102,102,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]},{"isActive":false,"ids":[1000,2152,2011,102,102,0,0,2011,102,102,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10]}],"Weapons":[{"isActive":true,"ids":[1795,2347,2348,2159,165,2175,1685,2272,2219,2173,2219,2171,2173,2172,2272,2243,1902,2188,909],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10],"dualLevel":10,"dualType":"ATK"},{"isActive":false,"ids":[1685,2176,2349,2327,2311,2312,1669,2272,2219,2173,800,800,800,800,800,800,800,800,800],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10],"dualLevel":0,"dualType":"NONE"},{"isActive":false,"ids":[1669,2152,2272,2219,2173,0,0,2272,2272,2173,0,0,0,0,0,0,0,0,0],"levels":[0,10,10,10,10,10,10,0,0,0,10,10,10,10,10,10,10,10,10],"dualLevel":0,"dualType":"NONE"}]}]';
            let characters: IRF5Character[] = self.Deserialize(jsonString);
            for(let i=0; i<characters.length; i++) {
                self.CharacterList.push(characters[i]);
            }
            self.DisplayLastCharacterSheet();
            self.IsBusy(false);
        }, 50);
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
        const self = this;
        this.IsBusy(true);
        window.setTimeout(function() {
            const elem: HTMLInputElement = (document.getElementById('json-deserialize-target') as HTMLInputElement);
            if(elem !== null && elem.value !== null) {
                let characters: IRF5Character[] = self.Deserialize(elem.value);
                for(let i=0; i<characters.length; i++) {
                    self.CharacterList.push(characters[i]);
                }
                self.IsBusy(false);
            }
        }, 50);
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