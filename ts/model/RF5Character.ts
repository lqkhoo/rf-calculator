import ko = require('knockout');

import RF5Accessory = require('./RF5Accessory');
import RF5Armor = require('./RF5Armor');
import IModel = require('./IModel');
import RF5Boot = require('./RF5Boot');
import RF5Headgear = require('./RF5Headgear');
import RF5Shield = require('./RF5Shield');
import RF5Weapon = require('./RF5Weapon');
import RF5Planner = require('../RF5Planner');
import RF5StatVector = require('./RF5StatVector');
import VMRF5Character = require('../vm/VMRF5Character');
import RF5Item = require('./RF5Item');

class RF5Character extends RF5StatVector implements IModel {
    
    static readonly DEFAULT_CHARACTER_ID: number = 0;

    readonly Planner:       RF5Planner;

    readonly Stats:         RF5StatVector;

    readonly Accessories:   ko.ObservableArray<RF5Accessory>;
    readonly Armors:        ko.ObservableArray<RF5Armor>;
    readonly Boots:         ko.ObservableArray<RF5Boot>;
    readonly Headgears:     ko.ObservableArray<RF5Headgear>;
    readonly Shields:       ko.ObservableArray<RF5Shield>;
    readonly Weapons:       ko.ObservableArray<RF5Weapon>;

    readonly ViewModel: VMRF5Character;

    constructor(planner: RF5Planner, character_id: number=RF5Character.DEFAULT_CHARACTER_ID) {

        super((planner.Characters as any)[character_id]
                || (planner.Characters as any)[RF5Character.DEFAULT_CHARACTER_ID]);

        this.Planner     = planner;

        this.Accessories = ko.observableArray([]);
        this.Armors      = ko.observableArray([]);
        this.Boots       = ko.observableArray([]);
        this.Headgears   = ko.observableArray([]);
        this.Shields     = ko.observableArray([]);
        this.Weapons     = ko.observableArray([]);

        this.ViewModel = new VMRF5Character(this);

        this.AddWeapon();
        this.AddShield();
        this.AddHeadgear();
        this.AddArmor();
        this.AddAccessory();
        this.AddBoots();
    }

    public AddAccessory = (): void => {
        this.Accessories.push(new RF5Accessory(this));
        if(this.Accessories().length === 1) {
            this.Accessories()[0].IsActive(true);
        }
    }
    public AddArmor = (): void => {
        this.Armors.push(new RF5Armor(this));
        if(this.Armors().length === 1) {
            this.Armors()[0].IsActive(true);
        }
    }
    public AddBoots = (): void => {
        this.Boots.push(new RF5Boot(this));
        if(this.Boots().length === 1) {
            this.Boots()[0].IsActive(true);
        }
    }
    public AddHeadgear = (): void => {
        this.Headgears.push(new RF5Headgear(this));
        if(this.Headgears().length === 1) {
            this.Headgears()[0].IsActive(true);
        }
    }
    public AddShield = (): void => {
        this.Shields.push(new RF5Shield(this));
        if(this.Shields().length === 1) {
            this.Shields()[0].IsActive(true);
        }
    }
    public AddWeapon = (): void => {
        this.Weapons.push(new RF5Weapon(this));

        if(this.Weapons().length === 1) {
            this.Weapons()[0].IsActive(true);
        }
    }

    public ChangeId = (id: string): void => {
        let ctx: any = (this.Planner.Characters as any)[id];
        this.Context(ctx);
    }

    public SetActiveEquipment = (equipmentType: EquipmentType, idx: number): void => {
        let array: RF5Item[];
        switch(equipmentType) {
            case "weapon": array = this.Weapons(); break;
            case "shield": array = this.Shields(); break;
            case "headgear": array = this.Headgears(); break;
            case "armor": array = this.Armors(); break;
            case "boots": array = this.Boots(); break;
            case "accessory": array = this.Accessories(); break;
        }
        for(var i=0; i<array.length; i++) {
            array[i].IsActive(i===idx);
        }
    }

}
export = RF5Character;
