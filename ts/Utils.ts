import xmlbuilder = require('xmlbuilder');

// Shouldn't have much in here as we're using knockout.
class Utils {

    constructor() { }

    public static ConstructAutocompleteListHtml(id: string, name_en: string, name_jp: string, image_uri: string): string {

        /*
        var html: string = '<div class="icon-group autoselect">'+
                                '<table>'+
                                    '<tbody>'+
                                        '<tr>'+
                                            '<td rowspan="2" class="icon-td>'+
                                                '<img src="'+image_uri+'"/>'+
                                            '</td>'+
                                            '<td>'+
                                                '<span>'+name_jp+'</span>'+
                                            '</td>'+
                                            '<td rowspan="2" class="icon-td">'+
                                                '<span>'+id+'</span>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<span>'+name_en+'</span>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>';
        return html;
        */

        const obj: any = {
            div: {
                '@class': 'icon-group autoselect',
                table: {
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
        }

        return xmlbuilder.create(obj, { headless: true }).end({ pretty: false });
    }

}
export = Utils;