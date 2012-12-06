YUI.add(
    'oclc-cart',
    function(Y, NAME){

        var buttonNode = Y.Node.create('<button class="yui3-button">Place Order</button>'),
            totalNode = Y.Node.create('<div id="cartTotal">Total: $0</div>'),
            itemListNode = Y.Node.create('<div id="cartItemList"></div>'),
            ITEM_TEMPLATE = '<div>{id} x {quantity} = {subtotal}</div>',
            CART_LIST = 'cartList',
            CART_VIEW = 'cartView',
            TOTAL = 'total';

        var Cart = Y.namespace('OCLC').Cart = Y.Base.create(
            NAME,
            Y.Widget,
            [], // extensions
            {
                initializer: function(){
                    var cartArea = this.get('contentBox'),
                        cartList = this.get(CART_LIST),
                        cartView = new Y.OCLC.CartView({ model: cartList });

                    cartList.addTarget(this);
                    this.set(CART_VIEW, cartView);
                },
                renderUI: function(config) {
                    var cartArea = this.get('contentBox'),
                        cartView = this.get(CART_VIEW),
                        cartContainer = cartView.get('container');

                    Y.log('renderUI', 'debug', Cart.NAME)
                    cartArea.append('<h2>Your Shopping Cart</h2>');
                    cartArea.append(cartContainer);
                    cartArea.append(itemListNode);
                    cartArea.append(totalNode);
                    cartArea.append(buttonNode);

                    cartView.render();
                },

                bindUI: function(){
                    var cartContainer = this.get('contentBox');
                    buttonNode.after('click', function(){
                        Y.log('cart: cart - placeOrderButton click');
                        this.fire('cart:orderPlaced', {total: this.get(TOTAL)});
                        cartContainer.setHTML('Order Placed');
                    }, this);
                    this.after("oclc-cart-list:totalChange", function(){
                        var cartView = this.get(CART_VIEW);

                        cartView.render();

                        console.log('update')
                        totalNode.setHTML('Total: $'+this.get(CART_LIST).get(TOTAL).toFixed(2));
                    }, this);
                },

                addItem: function(product){
                    var cartList = this.get(CART_LIST);
                    cartList.addProduct(product);
                },

                getItemsWithQuantities: function(){
                    var items = this.get(ITEMS),
                        itemsWithQuantities = {},
                        values = [],
                        k;
                    Y.Array.each(items, function(item){
                        var itemWithQ = itemsWithQuantities[item.get('sku')] || Y.merge(Y.clone(item.getAttrs()), {quantity: 0});
                        itemWithQ.quantity = itemWithQ.quantity + 1;
                        itemsWithQuantities[item.get('sku')] = itemWithQ;
                    });
                    for(k in itemsWithQuantities){
                        values.push(itemsWithQuantities[k]);
                    }
                    return values;
                }
            },
            {
                ATTRS: {
                    cartList: { value: new Y.OCLC.CartList() },
                    cartView: { value: null }
                }
            }
        );
    },
    "@VERSION@",
    { requires: ['cssbutton', 'attribute', 'event', 'base', 'widget', 'oclc-cart-list', 'oclc-cart-view', 'oclc-cart-line-item-view']}
);
