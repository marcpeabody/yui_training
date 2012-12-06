YUI({
  groups: {
    cart: {
      base: 'js/w/cart/',
      modules: {
          'oclc-cart': {
            path: 'base.js',
            requires: ['attribute', 'cssbutton', 'event', 'base-build', 'widget', 'oclc-cart-list', 'oclc-cart-line-item', 'oclc-cart-view', 'oclc-cart-line-item-view']
          },
          'oclc-cart-list': {
            path: 'cart-list.js',
            requires: ['model-list', 'oclc-cart-line-item']
          },
          'oclc-cart-line-item': {
            path: 'cart-line-item.js',
            requires: ['model']
          },
          'oclc-cart-view': {
            path: 'cart-view.js',
            requires: ['view']
          },
          'oclc-cart-line-item-view': {
            path: 'cart-line-item-view.js',
            requires: ['view']
          }
      }
    },
    models: {
      base: 'js/m/product/',
      modules: {
          'oclc-product': {
            path: 'base.js',
            requires: ['model']
          }
      }
    }
  }
}).use('view', 'array-extras', 'oclc-cart', 'oclc-product', 'event', function(Y){
    Y.ButtonView = Y.Base.create('buttonView', Y.View, [], {
      template: "<button class='yui3-button'><div class='productDescription'>{description}</div><div class='productPrice'>({formattedPrice})</div></button>",
      render: function(){
        var container = this.get('container'),
            model     = this.get('model'),
            html      = Y.Lang.sub(this.template, Y.merge(model.getAttrs(), {price: model.get('price').toFixed(2)})),
            node      = Y.Node.create(html),
            model     = this.get('model');

        node.setData('model', model);
        container.setHTML(node);
      }
    });

    var data = [{sku: '12341234', description: 'Some thing', price: 15.00},
                {sku: '56785678', description: 'Other thing', price: 24.99},
                {sku: '78907890', description: 'Another thing', price: 35.99}],
        products = Y.Array.map(data, function(d){ return new Y.OCLC.Product(d); }),
        productContainer = Y.one('#productContainer'),
        productList = Y.Node.create('<ul></ul>'),
        cart = new Y.OCLC.Cart({render: "#cartContainer"});

    cart.render();

    Y.Array.each(products, function(d){
      var liNode  = Y.Node.create('<li></li>');
      productList.append(liNode);
      new Y.ButtonView({
        container: liNode,
        model: d
      }).render();
    });

    Y.delegate('click', function(ev){
      var model = ev.currentTarget.getData('model');
      // Y.log(model);
      cart.addItem(model);
    }, '#productContainer', 'ul li button');

    productContainer.append(productList);

    cart.on('cart:orderPlaced', function(ev){
        Y.log('cart', 'cart - placeOrderButton click');
        Y.log('index: order placed - total: ' + ev.total);
    }, this);
});
