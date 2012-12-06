YUI.add(
    'oclc-cart-list',
    function(Y, NAME){
        var Clazz = Y.namespace('OCLC').CartList = Y.Base.create(
            NAME,
            Y.ModelList,
            [], // extensions
            {
                model: Y.OCLC.CartLineItem,
                initializer: function(){
                    this.after(["oclc-cart-line-item:subtotalChange"], function(){
                        var total = 0;
                        this.each(function(lineItem){
                            console.log(lineItem.get('subtotal'))
                            total = total + lineItem.get('subtotal');
                        });
                        this.set('total', total);
                    }, this);
                },
                addProduct: function(product){
                    var sku = product.get('sku'),
                        match = this.getById(sku),
                        sdf = Y.one('#cartLine');

                    if(!match){
                        match = new Y.OCLC.CartLineItem({id: sku, product: product});
                        match.addTarget(this);
                        this.add(match);
                    }else{
                        match.incrementQuantity();
                    }
                },
            },
            {
                ATTRS: {
                    total: { value: 0 }
                }
            }
        );
    },
    "@VERSION@",
    { requires: ['model-list', 'oclc-cart-line-item'] }
);
