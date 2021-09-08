import xmlbuilder = require('xmlbuilder');

class Utils {

    constructor() { }

    ConstructAutocompleteListHtml(id: string, name_en: string, name_jp: string, icon_path: string): string {
        const obj: any = {
            span: {
                '@data-test': 'val',
                '#text': id + ' - ' + name_jp + ' ' + name_en
            }
        }
        /*
        var xml = xmlbuilder.create('root')
            .dec(undefined, undefined, false)
            .ele('span')
            .text(id + ' - ' + name_jp + ' ' + name_en);
        */

        return xmlbuilder.create(obj, { headless: true }).end({ pretty: false });
    }

}
export = Utils;