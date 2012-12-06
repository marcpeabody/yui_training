YUI.add(
    'oclc-cart-view',
    function(Y, NAME){
        var CartView = Y.namespace('OCLC').CartView = Y.Base.create(
            NAME,
            Y.View,
            [], // extensions
            {
                containerTemplate: '<div class="stuff"></div>',
                template: '<table class="cartTable"></table>',
                events: {
                    '.cakeId': {
                        click: function(e){}
                    }
                },
                initializer: function(){
                    var container = this.get('container'),
                        templateHTML = this.template,
                        header = Y.Node.create('<tr><td>SKU</td><td>Description</td><td>Price</td><td>Quantity</td><td>Subtotal</td></tr>'),
                        tableNode = Y.Node.create(templateHTML),
                        modelList = this.get('model');

                    tableNode.append(header);
                    container.append(tableNode);

                    this.get('model').after(['add'], function(e){
                        var addedModel = e.details[0].model,
                            lineViews = this.get('lineViews'),
                            lineView = new Y.OCLC.CartLineItemView({model: addedModel});

                        Y.one('.cartTable').append(lineView.get('container'));
                        lineView.render();

                        addedModel.after('subtotalChange', function(e){
                            Y.log('changed')
                            lineView.render();
                        });
                    }, this);
                },
                render: function(){
                }
            },
            {
                ATTRS: {
                    model: { value: {} },
                    lineViews: { value: [] }
                }
            }
        );
    },
    "@VERSION@",
    { requires: ['view', 'oclc-cart-line-item-view']}
);
