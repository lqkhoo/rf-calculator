import ko = require('knockout');

import IModel = require('./IModel');
import IRF5Item = require('./IRF5Item');
// Parent
import IRF5Planner = require('./IRF5Planner');
// Children
import RF5StatVector = require('./RF5StatVector');
import RF5Accessory = require('./RF5Accessory');
import RF5Armor = require('./RF5Armor');
import RF5Boot = require('./RF5Boot');
import RF5Headgear = require('./RF5Headgear');
import RF5Shield = require('./RF5Shield');
import RF5Weapon = require('./RF5Weapon');
// VM
import VMRF5Character = require('../vm/VMRF5Character');
// Data
import Data = require('./Data');

class RF5Character extends RF5StatVector implements IModel {
    
    static readonly DEFAULT_CHARACTER_ID: number = 0;

    readonly Planner:       IRF5Planner;

    readonly Accessories:   ko.ObservableArray<RF5Accessory>;
    readonly Armors:        ko.ObservableArray<RF5Armor>;
    readonly Boots:         ko.ObservableArray<RF5Boot>;
    readonly Headgears:     ko.ObservableArray<RF5Headgear>;
    readonly Shields:       ko.ObservableArray<RF5Shield>;
    readonly Weapons:       ko.ObservableArray<RF5Weapon>;

    readonly ViewModel: VMRF5Character;

    constructor(planner: IRF5Planner, character_id: number=RF5Character.DEFAULT_CHARACTER_ID) {

        super((Data.Characters as any)[character_id]
                || (Data.Characters as any)[RF5Character.DEFAULT_CHARACTER_ID]);

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
        let ctx: any = (Data.Characters as any)[id];
        this.Context(ctx);
    }

    public SetActiveEquipment = (equipmentType: EquipmentType, idx: number): void => {
        let array: IRF5Item[];
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
