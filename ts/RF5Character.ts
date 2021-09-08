import ko = require('knockout');
import _ = require('lodash');
import RF5Accessory = require('./RF5Accessory');
import RF5Armor = require('./RF5Armor');
import RF5Boot = require('./RF5Boot');
import RF5Headgear = require('./RF5Headgear');
import RF5Shield = require('./RF5Shield');
import RF5Weapon = require('./RF5Weapon');
import RF5Planner = require('./RF5Planner');
import RF5StatVector = require('./RF5StatVector');
import { basename } from 'path/posix';

class RF5Character extends RF5StatVector {
    
    readonly Planner:       RF5Planner;

    readonly Stats:         RF5StatVector;

    readonly Accessories:   ko.ObservableArray<RF5Accessory>;
    readonly Armors:        ko.ObservableArray<RF5Armor>;
    readonly Boots:         ko.ObservableArray<RF5Boot>;
    readonly Headgears:     ko.ObservableArray<RF5Headgear>;
    readonly Shields:       ko.ObservableArray<RF5Shield>;
    readonly Weapons:       ko.ObservableArray<RF5Weapon>;

    readonly SearchStrings: any[];


    constructor(planner: RF5Planner) {

        super((planner.Characters as any)[0]); // Default character_id 0

        this.Planner     = planner;

        this.Accessories = ko.observableArray([]);
        this.Armors      = ko.observableArray([]);
        this.Boots       = ko.observableArray([]);
        this.Headgears   = ko.observableArray([]);
        this.Shields     = ko.observableArray([]);
        this.Weapons     = ko.observableArray([]);

        this.SearchStrings = ([]);
        this.ConstructSearchStrings.call(this);

        this.AddAccessory.call(this);
        this.AddArmor.call(this);
        this.AddBoots.call(this);
        this.AddShield.call(this);
        this.AddWeapon.call(this);
    }

    protected ConstructSearchStrings(): void {
        let self = this;
        
        _.forOwn(self.Planner.Character_ids, function(value: any, key: any) {
            let item_id: string = key;
            let name_en: string = (self.Planner.Characters as any)[item_id].name_en;
            let name_jp: string = (self.Planner.Characters as any)[item_id].name_jp;
            let image_uri: string = (self.Planner.Characters as any)[item_id].image_uri;
            let html_fragment: string = self.Planner.Controller.ConstructAutocompleteListHtml(
                item_id, name_en, name_jp, image_uri
            );
            self.SearchStrings.push({
                'value': item_id,
                'label': html_fragment
            });

            // self.SearchStrings.push(item_id + ' - ' + name_jp + ' ' + name_en);
        });
        
       // self.SearchStrings.push("Foo");
       // self.SearchStrings.push("Bar");
       // self.SearchStrings.push("asdfjklsjdlncxuqwiuiop");
    }

    public AddAccessory(): void {
        this.Accessories.push(new RF5Accessory(this));
    }
    public AddArmor(): void {
        this.Armors.push(new RF5Armor(this));
    }
    public AddBoots(): void {
        this.Boots.push(new RF5Boot(this));
    }
    public AddHeadgear(): void {
        this.Headgears.push(new RF5Headgear(this));
    }
    public AddShield(): void {
        this.Shields.push(new RF5Shield(this));
    }
    public AddWeapon(): void {
        this.Weapons.push(new RF5Weapon(this));
    }

    public ChangeId(id: string): void {
        let ctx: any = (this.Planner.Characters as any)[id];
        this.Context(ctx);
    }

    // Handlers
    public OnCharacterSelect(event: any, ui: any): void {
        console.log(this);
        console.log(event);
        console.log(ui);
    }

    // Expects this as instance of RF5Character
    public AutoCompleteSelectHandler(event: any, ui: any): boolean {
        let self = this;
        let id: string = ui.item.value;
        self.ChangeId(id);
        console.log(event.target);
        event.target.value = id;
        
        return false; // prevent jQueryUI from setting the field.
    }

}
export = RF5Character;
