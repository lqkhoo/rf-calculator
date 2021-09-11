import ko = require('knockout');
import IStatVector = require('./IStatVector');

class RF5StatVector implements IStatVector {

    readonly Context:           ko.Observable<any | undefined>;

    readonly id:                ko.PureComputed<string>;
    readonly name_en:           ko.PureComputed<string>;
    readonly name_jp:           ko.PureComputed<string>;
    readonly image_uri:         ko.PureComputed<string>;
    readonly level:             ko.PureComputed<number>;
    readonly rarity:            ko.PureComputed<number>;
    readonly stat_ATK:          ko.PureComputed<number>;
    readonly stat_DEF:          ko.PureComputed<number>;
    readonly stat_MAT:          ko.PureComputed<number>;
    readonly stat_MDF:          ko.PureComputed<number>;
    readonly stat_STR:          ko.PureComputed<number>;
    readonly stat_INT:          ko.PureComputed<number>;
    readonly stat_VIT:          ko.PureComputed<number>;
    readonly stat_atk_CRT:      ko.PureComputed<number>;
    readonly stat_atk_KNO:      ko.PureComputed<number>;
    readonly stat_atk_KNOTM:    ko.PureComputed<number>;
    readonly stat_atk_STN:      ko.PureComputed<number>;
    readonly stat_atk_PSN:      ko.PureComputed<number>;
    readonly stat_atk_SEA:      ko.PureComputed<number>;
    readonly stat_atk_PAR:      ko.PureComputed<number>;
    readonly stat_atk_SLP:      ko.PureComputed<number>;
    readonly stat_atk_FTG:      ko.PureComputed<number>;
    readonly stat_atk_SCK:      ko.PureComputed<number>;
    readonly stat_atk_FNT:      ko.PureComputed<number>;
    readonly stat_atk_DRN:      ko.PureComputed<number>;
    readonly stat_def_ele_FIRE: ko.PureComputed<number>;
    readonly stat_def_ele_WATER: ko.PureComputed<number>;
    readonly stat_def_ele_EARTH: ko.PureComputed<number>;
    readonly stat_def_ele_WIND:  ko.PureComputed<number>;
    readonly stat_def_ele_LIGHT: ko.PureComputed<number>;
    readonly stat_def_ele_DARK:  ko.PureComputed<number>;
    readonly stat_def_ele_LOVE:  ko.PureComputed<number>;
    readonly stat_def_ele_VOID:  ko.PureComputed<number>;
    readonly stat_def_CRT:      ko.PureComputed<number>;
    readonly stat_def_KNO:      ko.PureComputed<number>;
    readonly stat_def_KNOTM:    ko.PureComputed<number>;
    readonly stat_def_STN:      ko.PureComputed<number>;
    readonly stat_def_PSN:      ko.PureComputed<number>;
    readonly stat_def_SEA:      ko.PureComputed<number>;
    readonly stat_def_PAR:      ko.PureComputed<number>;
    readonly stat_def_SLP:      ko.PureComputed<number>;
    readonly stat_def_FTG:      ko.PureComputed<number>;
    readonly stat_def_SCK:      ko.PureComputed<number>;
    readonly stat_def_FNT:      ko.PureComputed<number>;
    readonly stat_def_DRN:      ko.PureComputed<number>;
    readonly stat_chargespeed:  ko.PureComputed<number>;
    readonly stat_attacklength: ko.PureComputed<number>;


    constructor(ctx: any | undefined) {

        var self = this;

        this.Context = ko.observable(ctx);

        // Override these as necessary. These are default / unmodified / last-resort values.

        this.id = ko.pureComputed(function() {
            let id: string = "0";
            if(self.Context() !== undefined && (self.Context() as any).id !== undefined) {
                id = (self.Context() as any).id;
            }
            return id;
        });
        
        this.name_en = ko.pureComputed(function() {
            let name_en: string = "None";
            if(self.Context() !== undefined && (self.Context() as any).name_en !== undefined) {
                name_en = (self.Context() as any).name_en;
            }
            return name_en;
        });
        
        this.name_jp = ko.pureComputed(function() {
            let name_jp: string = "\u306a\u3057";
            if(self.Context() !== undefined && (self.Context() as any).name_jp !== undefined) {
                name_jp = (self.Context() as any).name_jp;
            }
            return name_jp;
        });
        
        this.image_uri = ko.pureComputed(function() {
            let image_uri: string = "icon/Empty.png";
            if(self.Context() !== undefined && (self.Context() as any).image_uri !== undefined) {
                image_uri = (self.Context() as any).image_uri;
            }
            return image_uri;
        });
        
        this.level = ko.pureComputed(function() {
            let level: number = 10;
            if(self.Context() !== undefined && (self.Context() as any).level !== undefined) {
                level = (self.Context() as any).level;
            }
            return level;
        });
        
        this.rarity = ko.pureComputed(function() {
            let rarity: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).rarity !== undefined) {
                rarity = (self.Context() as any).rarity;
            }
            return rarity;
        });
        
        this.stat_ATK = ko.pureComputed(function() {
            let stat_ATK: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_ATK !== undefined) {
                stat_ATK = (self.Context() as any).stat_ATK;
            }
            return stat_ATK;
        });
        
        this.stat_DEF = ko.pureComputed(function() {
            let stat_DEF: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_DEF !== undefined) {
                stat_DEF = (self.Context() as any).stat_DEF;
            }
            return stat_DEF;
        });
        
        this.stat_MAT = ko.pureComputed(function() {
            let stat_MAT: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_MAT !== undefined) {
                stat_MAT = (self.Context() as any).stat_MAT;
            }
            return stat_MAT;
        });
        
        this.stat_MDF = ko.pureComputed(function() {
            let stat_MDF: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_MDF !== undefined) {
                stat_MDF = (self.Context() as any).stat_MDF;
            }
            return stat_MDF;
        });
        
        this.stat_STR = ko.pureComputed(function() {
            let stat_STR: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_STR !== undefined) {
                stat_STR = (self.Context() as any).stat_STR;
            }
            return stat_STR;
        });
        
        this.stat_INT = ko.pureComputed(function() {
            let stat_INT: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_INT !== undefined) {
                stat_INT = (self.Context() as any).stat_INT;
            }
            return stat_INT;
        });
        
        this.stat_VIT = ko.pureComputed(function() {
            let stat_VIT: number = 0;
            if(self.Context() !== undefined && (self.Context() as any).stat_VIT !== undefined) {
                stat_VIT = (self.Context() as any).stat_VIT;
            }
            return stat_VIT;
        });
        
        this.stat_atk_CRT = ko.pureComputed(function() {
            let stat_atk_CRT: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_CRT !== undefined) {
                stat_atk_CRT = (self.Context() as any).stat_atk_CRT;
            }
            return stat_atk_CRT;
        });
        
        this.stat_atk_KNO = ko.pureComputed(function() {
            let stat_atk_KNO: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_KNO !== undefined) {
                stat_atk_KNO = (self.Context() as any).stat_atk_KNO;
            }
            return stat_atk_KNO;
        });
        
        this.stat_atk_KNOTM = ko.pureComputed(function() {
            let stat_atk_KNOTM: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_KNOTM !== undefined) {
                stat_atk_KNOTM = (self.Context() as any).stat_atk_KNOTM;
            }
            return stat_atk_KNOTM;
        });
        
        this.stat_atk_STN = ko.pureComputed(function() {
            let stat_atk_STN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_STN !== undefined) {
                stat_atk_STN = (self.Context() as any).stat_atk_STN;
            }
            return stat_atk_STN;
        });
        
        this.stat_atk_PSN = ko.pureComputed(function() {
            let stat_atk_PSN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_PSN !== undefined) {
                stat_atk_PSN = (self.Context() as any).stat_atk_PSN;
            }
            return stat_atk_PSN;
        });
        
        this.stat_atk_SEA = ko.pureComputed(function() {
            let stat_atk_SEA: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_SEA !== undefined) {
                stat_atk_SEA = (self.Context() as any).stat_atk_SEA;
            }
            return stat_atk_SEA;
        });
        
        this.stat_atk_PAR = ko.pureComputed(function() {
            let stat_atk_PAR: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_PAR !== undefined) {
                stat_atk_PAR = (self.Context() as any).stat_atk_PAR;
            }
            return stat_atk_PAR;
        });
        
        this.stat_atk_SLP = ko.pureComputed(function() {
            let stat_atk_SLP: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_SLP !== undefined) {
                stat_atk_SLP = (self.Context() as any).stat_atk_SLP;
            }
            return stat_atk_SLP;
        });
        
        this.stat_atk_FTG = ko.pureComputed(function() {
            let stat_atk_FTG: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_FTG !== undefined) {
                stat_atk_FTG = (self.Context() as any).stat_atk_FTG;
            }
            return stat_atk_FTG;
        });
        
        this.stat_atk_SCK = ko.pureComputed(function() {
            let stat_atk_SCK: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_SCK !== undefined) {
                stat_atk_SCK = (self.Context() as any).stat_atk_SCK;
            }
            return stat_atk_SCK;
        });
        
        this.stat_atk_FNT = ko.pureComputed(function() {
            let stat_atk_FNT: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_FNT !== undefined) {
                stat_atk_FNT = (self.Context() as any).stat_atk_FNT;
            }
            return stat_atk_FNT;
        });
        
        this.stat_atk_DRN = ko.pureComputed(function() {
            let stat_atk_DRN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_atk_DRN !== undefined) {
                stat_atk_DRN = (self.Context() as any).stat_atk_DRN;
            }
            return stat_atk_DRN;
        });
        
        this.stat_def_ele_FIRE = ko.pureComputed(function() {
            let stat_def_ele_FIRE: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_FIRE !== undefined) {
                stat_def_ele_FIRE = (self.Context() as any).stat_def_ele_FIRE;
            }
            return stat_def_ele_FIRE;
        });
        
        this.stat_def_ele_WATER = ko.pureComputed(function() {
            let stat_def_ele_WATER: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_WATER !== undefined) {
                stat_def_ele_WATER = (self.Context() as any).stat_def_ele_WATER;
            }
            return stat_def_ele_WATER;
        });
        
        this.stat_def_ele_EARTH = ko.pureComputed(function() {
            let stat_def_ele_EARTH: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_EARTH !== undefined) {
                stat_def_ele_EARTH = (self.Context() as any).stat_def_ele_EARTH;
            }
            return stat_def_ele_EARTH;
        });
        
        this.stat_def_ele_WIND = ko.pureComputed(function() {
            let stat_def_ele_WIND: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_WIND !== undefined) {
                stat_def_ele_WIND = (self.Context() as any).stat_def_ele_WIND;
            }
            return stat_def_ele_WIND;
        });
        
        this.stat_def_ele_LIGHT = ko.pureComputed(function() {
            let stat_def_ele_LIGHT: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_LIGHT !== undefined) {
                stat_def_ele_LIGHT = (self.Context() as any).stat_def_ele_LIGHT;
            }
            return stat_def_ele_LIGHT;
        });
        
        this.stat_def_ele_DARK = ko.pureComputed(function() {
            let stat_def_ele_DARK: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_DARK !== undefined) {
                stat_def_ele_DARK = (self.Context() as any).stat_def_ele_DARK;
            }
            return stat_def_ele_DARK;
        });
        
        this.stat_def_ele_LOVE = ko.pureComputed(function() {
            let stat_def_ele_LOVE: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_LOVE !== undefined) {
                stat_def_ele_LOVE = (self.Context() as any).stat_def_ele_LOVE;
            }
            return stat_def_ele_LOVE;
        });
        
        this.stat_def_ele_VOID = ko.pureComputed(function() {
            let stat_def_ele_VOID: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_ele_VOID !== undefined) {
                stat_def_ele_VOID = (self.Context() as any).stat_def_ele_VOID;
            }
            return stat_def_ele_VOID;
        });
        
        this.stat_def_CRT = ko.pureComputed(function() {
            let stat_def_CRT: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_CRT !== undefined) {
                stat_def_CRT = (self.Context() as any).stat_def_CRT;
            }
            return stat_def_CRT;
        });
        
        this.stat_def_KNO = ko.pureComputed(function() {
            let stat_def_KNO: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_KNO !== undefined) {
                stat_def_KNO = (self.Context() as any).stat_def_KNO;
            }
            return stat_def_KNO;
        });
        
        this.stat_def_KNOTM = ko.pureComputed(function() {
            let stat_def_KNOTM: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_KNOTM !== undefined) {
                stat_def_KNOTM = (self.Context() as any).stat_def_KNOTM;
            }
            return stat_def_KNOTM;
        });
        
        this.stat_def_STN = ko.pureComputed(function() {
            let stat_def_STN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_STN !== undefined) {
                stat_def_STN = (self.Context() as any).stat_def_STN;
            }
            return stat_def_STN;
        });
        
        this.stat_def_PSN = ko.pureComputed(function() {
            let stat_def_PSN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_PSN !== undefined) {
                stat_def_PSN = (self.Context() as any).stat_def_PSN;
            }
            return stat_def_PSN;
        });
        
        this.stat_def_SEA = ko.pureComputed(function() {
            let stat_def_SEA: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_SEA !== undefined) {
                stat_def_SEA = (self.Context() as any).stat_def_SEA;
            }
            return stat_def_SEA;
        });
        
        this.stat_def_PAR = ko.pureComputed(function() {
            let stat_def_PAR: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_PAR !== undefined) {
                stat_def_PAR = (self.Context() as any).stat_def_PAR;
            }
            return stat_def_PAR;
        });
        
        this.stat_def_SLP = ko.pureComputed(function() {
            let stat_def_SLP: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_SLP !== undefined) {
                stat_def_SLP = (self.Context() as any).stat_def_SLP;
            }
            return stat_def_SLP;
        });
        
        this.stat_def_FTG = ko.pureComputed(function() {
            let stat_def_FTG: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_FTG !== undefined) {
                stat_def_FTG = (self.Context() as any).stat_def_FTG;
            }
            return stat_def_FTG;
        });
        
        this.stat_def_SCK = ko.pureComputed(function() {
            let stat_def_SCK: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_SCK !== undefined) {
                stat_def_SCK = (self.Context() as any).stat_def_SCK;
            }
            return stat_def_SCK;
        });
        
        this.stat_def_FNT = ko.pureComputed(function() {
            let stat_def_FNT: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_FNT !== undefined) {
                stat_def_FNT = (self.Context() as any).stat_def_FNT;
            }
            return stat_def_FNT;
        });
        
        this.stat_def_DRN = ko.pureComputed(function() {
            let stat_def_DRN: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_def_DRN !== undefined) {
                stat_def_DRN = (self.Context() as any).stat_def_DRN;
            }
            return stat_def_DRN;
        });
        
        this.stat_chargespeed = ko.pureComputed(function() {
            let stat_chargespeed: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_chargespeed !== undefined) {
                stat_chargespeed = (self.Context() as any).stat_chargespeed;
            }
            return stat_chargespeed;
        });
        
        this.stat_attacklength = ko.pureComputed(function() {
            let stat_attacklength: number = 0.0;
            if(self.Context() !== undefined && (self.Context() as any).stat_attacklength !== undefined) {
                stat_attacklength = (self.Context() as any).stat_attacklength;
            }
            return stat_attacklength;
        });

    }

}
export = RF5StatVector;
