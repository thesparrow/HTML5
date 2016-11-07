function AddDragAndDropHandlers() {
    //end result: user can pick up the coffe image and drap
    //to shopping cart

    var coffeeImages = document.getElementsByClassName("productarticlewide");

    var shoppingCartZone = document.getElementById("shoppingcart");
    var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

    //persist in local storage 
    var Cart = (function() {
        this.coffees = new Array();
    });

    var Coffee = (function(id, price) {
        this.coffeeId = id;
        this.price = price;
    });

    var currentCart = null;
    currentCart = JSON.parse(localStorage.getItem('cart'));

    if (!currentCart) {
        createEmptyCart();
    }

    UpdateShoppingCartUI();

    //add the coffee to the local storage 
    currentCart.addCoffee = function(coffee) {
        currentCart.coffees.push(coffee);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    //add event listener to each coffee image 
    //allow the event to exist on drag
    for (var i = 0; i < coffeeImages.length; i++) {
        coffeeImages[i].addEventListener("dragstart", function(ev) {
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute('id'));
        }, false);
    }

    //create an event listener for the shopping cart dragover
    //allow the item to be copied when droped in the zone 
    shoppingCartZone.addEventListener("dragover", function(ev) {
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
        return false;
    }, false);

    //drop event action
    shoppingCartZone.addEventListener("drop", function(ev) {
        if (ev.stopPropagation)
            ev.stopPropagation();

        var coffeeId = ev.dataTransfer.getData("Text");
        var element = document.getElementById(coffeeId);

        addCoffeeToShoppingCart(element, coffeeId);
        ev.stopPropagation();

        return false;
    }, false);


    function addCoffeeToShoppingCart(item, id) {
        var price = item.getAttribute("data-price");

        var coffee = new Coffee(id, price);
        currentCart.addCoffee(coffee);

        UpdateShoppingCartUI();
    }

    function createEmptyCart() {
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(new Cart()));
        currentCart = JSON.parse(localStorage.getItem("cart"));
    }

    function UpdateShoppingCartUI() {
        //display all the coffees in the cart as new elements
        shoppingcart.innerHTML = "";
        for (var i = 0; i < currentCart.coffees.length; i++) {
            var liElement = document.createElement('li');
            liElement.innerHTML = currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
            shoppingcart.appendChild(liElement);
        }

    }

}
