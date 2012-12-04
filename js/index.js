Y.use(['cssbutton', 'view', 'array-extras'], function(Y){
    Y.ButtonView = Y.Base.create('buttonView', Y.View, [], {
      template: "<button class='yui3-button'><div class='productDescription'>{description}</div><div class='productPrice'>({price})</div></button>",
      render: function(){
        var container = this.get('container'),
            html      = Y.Lang.sub(this.template, this.get('model')),
            node      = Y.Node.create(html),
            model     = this.get('model');

        node.setData(model);
        container.setHTML(node);
      }
    });

    var data = [{sku: '12341234', description: 'Some thing', price: "15.00"},
                {sku: '56785678', description: 'Other thing', price: "24.99"},
                {sku: '78907890', description: 'Another thing', price: "35.99"}],
        productContainer = Y.one('#productContainer'),
        productList = Y.Node.create('<ul></ul>');

    Y.Array.each(data, function(d){
      var liNode  = Y.Node.create('<li></li>');
      productList.append(liNode);
      new Y.ButtonView({
        container: liNode,
        model: d
      }).render();
    });
    Y.delegate('click', function(ev){
      Y.log(ev.currentTarget.getData('sku'));
    }, '#productContainer', 'ul li button');

    productContainer.append(productList);
});

