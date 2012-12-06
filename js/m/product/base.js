YUI.add(
    'oclc-product',
    function(Y, NAME){
        var Clazz = Y.namespace("OCLC").Product = Y.Base.create(
            NAME,
            Y.Model,
            [],
            {
                idAttribute: "sku"
            },
            {
                ATTRS: {
                    sku: { value: null },
                    description: { value: null },
                    price: { value: 0 },
                    formattedPrice: {
                        valueFn: function(){
                            return this.get('price').toFixed(2);
                        }
                    }
                }
            }
        );
    },
    "@VERSION@",
    { requires: ['model']}
);
