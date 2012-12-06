YUI.add(
    'oclc-cart-line-item-view',
    function(Y, NAME){
        var CartView = Y.namespace('OCLC').CartLineItemView = Y.Base.create(
            NAME,
            Y.View,
            [], // extensions
            {
                initializer: function(){
                },
                containerTemplate: '<tr></tr>',
                template: '<td>{id}</td><td>{description}</td><td>{price}</td><td>{quantity}</td><td>{formattedSubtotal}</td>',
                events: {
                    '.cakeId': {
                        click: function(e){}
                    }
                },
                render: function(){
                    var container = this.get('container'),
                        json = this.get('model').toJSON(),
                        formattedJSON = Y.merge(json, json.product.toJSON(), {formattedSubtotal: json.subtotal.toFixed(2)});
                    container.setHTML(
                        Y.Lang.sub(this.template, formattedJSON)
                    );
                }
            },
            {}
        );
    },
    "@VERSION@",
    { requires: ['view']}
);

