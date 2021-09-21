import ko = require('knockout');
import IStatVector = require('./IStatVector');
// Super
import ICharacter = require('./ICharacter');
// Parent
import ICalculator = require('./ICalculator');
// Children
import IItem = require('./IItem');
import IShield = require('./IShield');
import IWeapon = require('./IWeapon');
import StatVector = require('./StatVector');
import VectorCharEquipmentStats = require('./VectorCharEquipmentStats');
import VectorGeneralSetBonus = require('./VectorGeneralSetBonus');
import VectorCharFinalStats = require('./VectorCharFinalStats');
// VM
import VMCharacter = require('../vm/VMCharacter');

class AbstractCharacter<TWeapon extends IWeapon,
                        TShield extends IShield,
                        THeadgear extends IItem,
                        TArmor extends IItem,
                        TBoots extends IItem,
                        TAccessory extends IItem> extends StatVector implements ICharacter {
    
    static readonly DEFAULT_CHARACTER_ID: number = 0;
    static readonly DEFAULT_DESERIALIZED_OBJECT: any = undefined;

    readonly CtorWeapon:    (new(character: ICharacter, item_id: number, deserializedObject: any) => TWeapon);
    readonly CtorShield:    (new(character: ICharacter, item_id: number, deserializedObject: any) => TShield);
    readonly CtorHeadgear:  (new(character: ICharacter, item_id: number, deserializedObject: any) => THeadgear);
    readonly CtorArmor:     (new(character: ICharacter, item_id: number, deserializedObject: any) => TArmor);
    readonly CtorBoots:     (new(character: ICharacter, item_id: number, deserializedObject: any) => TBoots);
    readonly CtorAccessory: (new(character: ICharacter, item_id: number, deserializedObject: any) => TAccessory);

    readonly Calculator:       ICalculator;

    readonly Accessories:   ko.ObservableArray<IItem>;
    readonly Armors:        ko.ObservableArray<IItem>;
    readonly Boots:         ko.ObservableArray<IItem>;
    readonly Headgears:     ko.ObservableArray<IItem>;
    readonly Shields:       ko.ObservableArray<IShield>;
    readonly Weapons:       ko.ObservableArray<IWeapon>;

    readonly ActiveAccessoryIdx:    ko.PureComputed<number>;
    readonly ActiveArmorIdx:        ko.PureComputed<number>;
    readonly ActiveBootsIdx:        ko.PureComputed<number>;
    readonly ActiveHeadgearIdx:     ko.PureComputed<number>;
    readonly ActiveShieldIdx:       ko.PureComputed<number>;
    readonly ActiveWeaponIdx:       ko.PureComputed<number>;

    readonly HasClover: ko.PureComputed<boolean>;
    readonly HasRareCan: ko.PureComputed<boolean>;
    readonly HasGeneralSetBonus: ko.PureComputed<boolean>;

    readonly EquipmentStats: ko.Observable<IStatVector>;
    readonly GeneralSetBonus: ko.Observable<IStatVector>;
    readonly FinalStats: ko.Observable<IStatVector>;

    readonly ViewModel: VMCharacter;

    override readonly Context: ko.PureComputed<any>;

    constructor(ctorWeapon:    (new(character: ICharacter, item_id: number, deserializedObject: any) => TWeapon),
                ctorShield:    (new(character: ICharacter, item_id: number, deserializedObject: any) => TShield),
                ctorHeadgear:  (new(character: ICharacter, item_id: number, deserializedObject: any) => THeadgear),
                ctorArmor:     (new(character: ICharacter, item_id: number, deserializedObject: any) => TArmor),
                ctorBoots:     (new(character: ICharacter, item_id: number, deserializedObject: any) => TBoots),
                ctorAccessory: (new(character: ICharacter, item_id: number, deserializedObject: any) => TAccessory),
                calculator: ICalculator,
                characterId: number=AbstractCharacter.DEFAULT_CHARACTER_ID,
                deserializedObject: any=AbstractCharacter.DEFAULT_DESERIALIZED_OBJECT) {

        super(calculator.Data, characterId);
        const self = this;

        this.CtorWeapon = ctorWeapon;
        this.CtorShield = ctorShield;
        this.CtorHeadgear = ctorHeadgear;
        this.CtorArmor = ctorArmor;
        this.CtorBoots = ctorBoots;
        this.CtorAccessory = ctorAccessory;

        this.Calculator     = calculator;

        this.Accessories = ko.observableArray([]).extend({ deferred: true });
        this.Armors      = ko.observableArray([]).extend({ deferred: true });
        this.Boots       = ko.observableArray([]).extend({ deferred: true });
        this.Headgears   = ko.observableArray([]).extend({ deferred: true });
        this.Shields     = ko.observableArray([]).extend({ deferred: true });
        this.Weapons     = ko.observableArray([]).extend({ deferred: true });

        this.Context = ko.computed(function() {
            return (self.Data.Characters as any)[self.id()]
        }).extend({ deferred: true });

        this.FinalizeVectorOverride();

        this.ActiveAccessoryIdx = ko.pureComputed(self._compute_ActiveAccessoryIdx).extend({ deferred: true });
        this.ActiveArmorIdx     = ko.pureComputed(self._compute_ActiveArmorIdx).extend({ deferred: true });
        this.ActiveBootsIdx     = ko.pureComputed(self._compute_ActiveBootsIdx).extend({ deferred: true });
        this.ActiveHeadgearIdx  = ko.pureComputed(self._compute_ActiveHeadgearIdx).extend({ deferred: true });
        this.ActiveShieldIdx    = ko.pureComputed(self._compute_ActiveShieldIdx).extend({ deferred: true });
        this.ActiveWeaponIdx    = ko.pureComputed(self._compute_ActiveWeaponIdx).extend({ deferred: true });

        this.HasClover          = ko.pureComputed(self._compute_hasClover).extend({ deferred: true });
        this.HasRareCan         = ko.pureComputed(self._compute_hasRareCan).extend({ deferred: true });
        this.EquipmentStats     = ko.observable(new VectorCharEquipmentStats(this)).extend({ deferred: true });
        this.GeneralSetBonus    = ko.observable(new VectorGeneralSetBonus(this)).extend({ deferred: true });
        this.FinalStats         = ko.observable(new VectorCharFinalStats(this)).extend({ deferred: true });

        this.ViewModel = new VMCharacter(this);

        if(deserializedObject === undefined) {
            this.AddWeapon();
            this.AddShield();
            this.AddHeadgear();
            this.AddArmor();
            this.AddAccessory();
            this.AddBoots();
        } else {
            this.FromDeserializedObject(deserializedObject);
        }
    }

    protected FromDeserializedObject = (obj: any): void => {
        this.id(obj.id);
        const accessories = obj.Accessories;
        const armors = obj.Armors;
        const boots = obj.Boots;
        const headgears = obj.Headgears;
        const shields = obj.Shields;
        const weapons = obj.Weapons;
        for(let i=0; i<accessories.length; i++) { this.AddAccessory(accessories[i]); }
        for(let i=0; i<armors.length; i++) { this.AddArmor(armors[i]); }
        for(let i=0; i<boots.length; i++) { this.AddBoots(boots[i]); }
        for(let i=0; i<headgears.length; i++) { this.AddHeadgear(headgears[i]); }
        for(let i=0; i<shields.length; i++) { this.AddShield(shields[i]); }
        for(let i=0; i<weapons.length; i++) { this.AddWeapon(weapons[i]); }
    }


    public AddAccessory = (deserializedObject: any=undefined): void => {
        this.Accessories.push(new this.CtorAccessory(this, 0, deserializedObject));
        if(this.Accessories().length === 1 && deserializedObject === undefined) {
            this.Accessories()[0].IsActive(true);
        }
    }
    public AddArmor = (deserializedObject: any=undefined): void => {
        this.Armors.push(new this.CtorArmor(this, 0, deserializedObject));
        if(this.Armors().length === 1 && deserializedObject === undefined) {
            this.Armors()[0].IsActive(true);
        }
    }
    public AddBoots = (deserializedObject: any=undefined): void => {
        this.Boots.push(new this.CtorBoots(this, 0, deserializedObject));
        if(this.Boots().length === 1 && deserializedObject === undefined) {
            this.Boots()[0].IsActive(true);
        }
    }
    public AddHeadgear = (deserializedObject: any=undefined): void => {
        this.Headgears.push(new this.CtorHeadgear(this, 0, deserializedObject));
        if(this.Headgears().length === 1 && deserializedObject === undefined) {
            this.Headgears()[0].IsActive(true);
        }
    }
    public AddShield = (deserializedObject: any=undefined): void => {
        this.Shields.push(new this.CtorShield(this, 0, deserializedObject));
        if(this.Shields().length === 1 && deserializedObject === undefined) {
            this.Shields()[0].IsActive(true);
        }
    }
    public AddWeapon = (deserializedObject: any=undefined): void => {
        this.Weapons.push(new this.CtorWeapon(this, 0, deserializedObject));
        if(this.Weapons().length === 1 && deserializedObject === undefined) {
            this.Weapons()[0].IsActive(true);
        }
    }

    public DeleteItem = (equipmentType: EquipmentType, item: IItem): void => {
        let array: ko.ObservableArray<IItem>;
        switch(equipmentType) {
            case "weapon": array = this.Weapons; break;
            case "shield": array = this.Shields; break;
            case "headgear": array = this.Headgears; break;
            case "armor": array = this.Armors; break;
            case "boots": array = this.Boots; break;
            case "accessory": array = this.Accessories; break;
        }
        console.log(item);
        array.remove(item);
    }

    public ChangeId = (id: number): void => {
        this.id(id);
    }

    public SetActiveEquipment = (equipmentType: EquipmentType, idx: number): void => {
        let array: IItem[];
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

    public toJSON = (): any => {
        return {
            id: this.id(),
            Accessories: this.Accessories(),
            Armors: this.Armors(),
            Boots: this.Boots(),
            Headgears: this.Headgears(),
            Shields: this.Shields(),
            Weapons: this.Weapons()
        }
    }

    protected _compute_activeIdx_helper = (observableArray: ko.ObservableArray<IItem>) => {
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

    protected _compute_hasClover = (): boolean => {
        let activeIdx: number = this.ActiveWeaponIdx();
        if(activeIdx !== -1 ) {
            if(this.Weapons()[activeIdx].HasClover()) { return true; }
        }
        activeIdx = this.ActiveShieldIdx();
        if(activeIdx !== -1) {
            if(this.Shields()[activeIdx].HasClover()) { return true; }
        }
        activeIdx = this.ActiveHeadgearIdx();
        if(activeIdx !== -1) {
            if(this.Headgears()[activeIdx].HasClover()) { return true; }
        }
        activeIdx = this.ActiveArmorIdx();
        if(activeIdx !== -1) {
            if(this.Armors()[activeIdx].HasClover()) { return true; }
        }
        activeIdx = this.ActiveBootsIdx();
        if(activeIdx !== -1) {
            if(this.Boots()[activeIdx].HasClover()) { return true; }
        }
        activeIdx = this.ActiveAccessoryIdx();
        if(activeIdx !== -1) {
            if(this.Accessories()[activeIdx].HasClover()) { return true; }
        }
        return false;
    }

    protected _compute_hasRareCan = (): boolean => {
        const activeWeaponIdx: number = this.ActiveWeaponIdx();
        if(activeWeaponIdx === -1 ) { return false; }
        return this.Weapons()[activeWeaponIdx].HasRareCan();
    }

}
export = AbstractCharacter;
