import ko = require('knockout');
import IRF5Item = require('./IRF5Item');
import IRF5Character = require('./IRF5Character');
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

class RF5Character extends RF5StatVector implements IRF5Character {
    
    static readonly DEFAULT_CHARACTER_ID: number = 0;

    readonly Planner:       IRF5Planner;

    readonly Accessories:   ko.ObservableArray<RF5Accessory>;
    readonly Armors:        ko.ObservableArray<RF5Armor>;
    readonly Boots:         ko.ObservableArray<RF5Boot>;
    readonly Headgears:     ko.ObservableArray<RF5Headgear>;
    readonly Shields:       ko.ObservableArray<RF5Shield>;
    readonly Weapons:       ko.ObservableArray<RF5Weapon>;

    readonly ActiveAccessoryIdx:    ko.PureComputed<number>;
    readonly ActiveArmorIdx:        ko.PureComputed<number>;
    readonly ActiveBootsIdx:        ko.PureComputed<number>;
    readonly ActiveHeadgearIdx:     ko.PureComputed<number>;
    readonly ActiveShieldIdx:       ko.PureComputed<number>;
    readonly ActiveWeaponIdx:       ko.PureComputed<number>;

    readonly ViewModel: VMRF5Character;

    override readonly Context:           ko.PureComputed<any>;
    override readonly name_en:           ko.PureComputed<string>;
    override readonly name_jp:           ko.PureComputed<string>;
    override readonly image_uri:         ko.PureComputed<string>;

    constructor(planner: IRF5Planner, characterId: number=RF5Character.DEFAULT_CHARACTER_ID) {

        super(characterId);
        var self = this;

        this.Planner     = planner;

        this.Accessories = ko.observableArray([]);
        this.Armors      = ko.observableArray([]);
        this.Boots       = ko.observableArray([]);
        this.Headgears   = ko.observableArray([]);
        this.Shields     = ko.observableArray([]);
        this.Weapons     = ko.observableArray([]);

        this.Context = ko.computed(function() {
            return (Data.Characters as any)[self.id()]
        });
        this.name_en = ko.pureComputed(self._compute_name_en);
        this.name_jp = ko.pureComputed(self._compute_name_jp);
        this.image_uri = ko.pureComputed(self._compute_image_uri);
        this.FinalizeVectorOverride();

        this.ActiveAccessoryIdx = ko.pureComputed(self._compute_ActiveAccessoryIdx);
        this.ActiveArmorIdx = ko.pureComputed(self._compute_ActiveArmorIdx);
        this.ActiveBootsIdx = ko.pureComputed(self._compute_ActiveBootsIdx);
        this.ActiveHeadgearIdx = ko.pureComputed(self._compute_ActiveHeadgearIdx);
        this.ActiveShieldIdx = ko.pureComputed(self._compute_ActiveShieldIdx);
        this.ActiveWeaponIdx = ko.pureComputed(self._compute_ActiveWeaponIdx);

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

    public ChangeId = (id: number): void => {
        this.id(id);
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


    protected _compute_activeIdx_helper = (observableArray: ko.ObservableArray<IRF5Item>) => {
        let idx: number = -1;
        let nItems = observableArray().length;
        if (nItems !== 0) {
            for(let i=0; i<nItems; i++) {
                if(observableArray()[i].IsActive()) {
                    idx = i;
                    break;
                }
            }
        }
        return idx;
    }

    protected _compute_ActiveAccessoryIdx = (): number => {
        return this._compute_activeIdx_helper(this.Accessories);
    }
    protected _compute_ActiveArmorIdx = (): number => {
        return this._compute_activeIdx_helper(this.Armors);
    }
    protected _compute_ActiveBootsIdx = (): number => {
        return this._compute_activeIdx_helper(this.Boots);
    }
    protected _compute_ActiveHeadgearIdx = (): number => {
        return this._compute_activeIdx_helper(this.Headgears);
    }
    protected _compute_ActiveShieldIdx = (): number => {
        return this._compute_activeIdx_helper(this.Shields)
    }
    protected _compute_ActiveWeaponIdx = (): number => {
        return this._compute_activeIdx_helper(this.Weapons);
    }

    protected override _compute_name_en = this._compute_string_helper(RF5StatVector.KEY_name_en, "None");
    protected override _compute_name_jp = this._compute_string_helper(RF5StatVector.KEY_name_jp, "\u306a\u3057");
    protected override _compute_image_uri = this._compute_string_helper(RF5StatVector.KEY_image_uri, "icon/Empty.png");

}
export = RF5Character;
