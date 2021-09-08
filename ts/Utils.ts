import xmlbuilder = require('xmlbuilder');

// Shouldn't have much in here as we're using knockout.
class Utils {

    constructor() { }

    ConstructAutocompleteListHtml(id: string, name_en: string, name_jp: string, image_uri: string): string {
        const obj: any = {
            table: {
                '@class': 'icon-group',
                tbody: {
                    tr: [{
                            td: [{
                                    '@rowspan': '2',
                                    '@class': 'icon-td',
                                    img: {
                                        '@src': image_uri
                                    },
                                },
                                {
                                    '#text': name_jp
                                },
                                {
                                    '@rowspan': '2',
                                    '@class': 'icon-td',
                                    '#text': id
                                }]
                        },
                        {
                            td: {
                                '#text': name_en
                            }
                        }
                    ]
                }
            }
        }

        return xmlbuilder.create(obj, { headless: true }).end({ pretty: false });
    }

}
export = Utils;