YUI.add(
    'oclc-cart-line-item',
    function(Y, NAME){

        var Clazz = Y.namespace('OCLC').CartLineItem = Y.Base.create(
            NAME,
            Y.Model,
            [], // extensions
            {
                initializer: function(){
                    this.incrementQuantity();
                },
                incrementQuantity: function(){
                    this.set('quantity', this.get('quantity')+1);
                    this.set('subtotal', (this.get('quantity')*this.get('product').get('price')))
                },
                formattedSubtotal: function(){
                    return this.get('subtotal').toFixed(2);
                }
            },
            {
                ATTRS: {
                    product: {},
                    quantity: { value: 0 },
                    subtotal: { value: 0 }
                }
            }
        );
    },
    "@VERSION@",
    { requires: ['model'] }
);
