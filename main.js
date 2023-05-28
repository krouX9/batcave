import data from './data.json' assert { type: 'json' };
var productWrapper = document.getElementById("product-wrapper");

for (var i = 0; i < data.length; i++){

    var cardData = data[i];

    var productCard = document.createElement("div");
    productCard.className = "product-data-card";

    var image = document.createElement("img");
    image.className = "product-data-image";
    image.src= cardData.image;
    productCard.appendChild(image);

    var name = document.createElement("div");
    name.className = "product-brand-name";
    name.textContent = cardData.name;
    productCard.appendChild(name);

    var price= document.createElement("div");
    price.className= "product-og-price";
    price.textContent= "$" + " " + cardData.price;
    productCard.appendChild(price);

    var btnContainer = document.createElement("div");
    btnContainer.className = "cart-compare-btn-container";
    productCard.appendChild(btnContainer);

    var addToCompare = document.createElement("button");
    addToCompare.className = "add-to-compare";
    addToCompare.textContent = "Add to Compare";
    btnContainer.appendChild(addToCompare);

    var addToCart = document.createElement("button");
    addToCart.className = "add-to-cart";
    addToCart.textContent = "Add to Cart";
    btnContainer.appendChild(addToCart);

    productWrapper.appendChild(productCard);
};

var dispAcc =document.getElementsByClassName("accordion");
for(i = 0; i< dispAcc.length;i++){
    dispAcc[i].addEventListener("click", function(){
        console.log("fjnon");
        this.classList.toggle("show");

    var section = this.nextElementSibling;
    if (section.style.display === "block"){
        section.style.display = "none";
    } else{
        section.style.display = "block";
    }
});
}
// ================ Add to cart ===========

var addCart = document.getElementsByClassName("add-to-cart");
var cartIkon = document.getElementById("cart-icon");
for(i = 0; i < addCart.length; i++){
    var cartIconCount = 0;
    addCart[i].addEventListener("click", function(){
        cartIconCount++;
        if (cartIconCount > 0){
            var cartBubble = document.createElement("span");
            cartBubble.className = "cart-icon-bubble";
            cartBubble.textContent =cartIconCount;
            console.log("whatsuo");
        };
    });
}

// ================ Comparision =================

$(document).ready(function(){
    var productComparisionList = [];

    $('.add-to-compare').click(function(){
        var productName = $(this).siblings('.product-brand-name').text();
        var productIndex = productComparisionList.findIndex(function(item) {
            return item.name === productName;
        });
        if (productIndex == -1){
            var product = {
                name : productName, 
                image: $(this).siblings('.product-data-name').attr('src'),
                price: $(this).siblings('.product-og-price').text()
            };
            productComparisionList.push(product);
        }

        updateProductComparisionModal();
        $('#comparision-modal').show();
    });
    // close
    $('.close').click(function(){
        $('#comparision-modal').fadeOut();
    });
    // compare button
    $('#compare-button').click(function(){
        
        window.location.href = 'comparision.html';
    });
    //updating comparision modal with lastest comparsion list
    function updateProductComparisionModal(){
        var modalContent = $('#comparision-products-list');
        modalContent.empty();

        if(productComparisionList.length == 0){
            modalContent.html('<span class="noProds">No Products added for comparison</span>');
            $('#compare-button').prop('disabled',true);
        } else{
            productComparisionList.forEach(function(product){
                var listItem = $('<div class="comparision-item"></div>' );
                var image = $('<img class="comparision-image">').attr('src', product.image);
                var name = $('<div class="comparision-name"></div>' ).text(product.name);
                var price = $('<div class="comparision-price"></div>' ).text(product.price);
                listItem.append(image,name,price);
                modalContent.append(listItem);
            });
            $('#compare-button').prop('disabled', false);
        }
    }
    
});


