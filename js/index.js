Y.use(['cssbutton', 'view'], function(Y){
    var data = [{sku: '12341234', description: 'Some thing', price: "15.00"},
                {sku: '56785678', description: 'Other thing', price: "24.99"},
                {sku: '78907890', description: 'Another thing', price: "35.99"}],
        productContainer = Y.one('#productContainer'),
        productList = Y.Node.create('<ul></ul>'),
        buttonTemplate = "<li><button class='yui3-button'><div class='productDescription'>{description}</div><div class='productPrice'>({price})</div></button></li>",
        buttonListItem;

    productContainer.append(productList);
    Y.Array.each(data, function(item){
        buttonListItem = Y.Node.create(Y.Lang.sub(buttonTemplate, item));
        productList.append(buttonListItem);
    });
});

