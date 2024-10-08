//navbar button porper alighment
const menuBtn = document.getElementById("nav-menu-btn");
const menuCncl = document.getElementById("nav-menu-cncl");
const navMenu = document.getElementById("nav-menu");
navMenu.style.opacity = "0";
menuBtn.addEventListener("click", () => {
  if (navMenu.style.opacity === "1"){
    navMenu.style.opacity = "0";
  } else {
    navMenu.style.opacity = "1";
  }
});
menuBtn.addEventListener("click",()=>{
  menuBtn.style.display = "none";
  menuCncl.style.display = "block";
});

menuCncl.addEventListener("click",()=> {
  menuCncl.style.display = "none";
  menuBtn.style.display = "block";
  navMenu.style.opacity = "0";
});


let currentIndex = 0; // Track how many products have been displayed
const productsPerLoad = 10; // Number of products to load each time
let allProducts = []; // Store all products loaded from JSON

async function fetchProducts() {
    const jsonproduct = await fetchProductsFromJson();
    allProducts = jsonproduct;
    displayProducts();
}

// Function to display products in the container
function displayProducts() {
    const maindiv = document.getElementById('productcontainer');
    const productsToDisplay = allProducts.slice(currentIndex, currentIndex + productsPerLoad);
    productsToDisplay.forEach(product => {
        const productdiv = createProductDiv(product);
        maindiv.appendChild(productdiv);
    });
    currentIndex += productsPerLoad;

    // Check if there are more products to display
    document.getElementById("load-more-button").style.display =
        currentIndex < allProducts.length ? "block" : "none"; // Show or hide button
}

document.getElementById("load-more-button").addEventListener("click", displayProducts);

// Display filtered products based on user input
async function showdata() {
    const maindiv = document.getElementById('productcontainer');
    const text = document.getElementById("inputbox").value.toLowerCase();
    maindiv.innerHTML = "";
    const jsonproduct = await fetchProductsFromJson();
    
    // Filter products based on user input
    const filteredProducts = jsonproduct.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productdiv = createProductDiv(product);
            maindiv.appendChild(productdiv);
        });
        document.getElementById("load-more-button").style.display = "none"; // Hide load more button when filtering
    } else {
        maindiv.innerHTML = "<p>No products found</p>";
        document.getElementById("load-more-button").style.display = "none"; // Hide button if no products found
    }
}

// Function to fetch products from the JSON file
async function fetchProductsFromJson() {
    const response = await fetch("index.json");
    return await response.json();
}

// Call fetchProducts to display products on page load
fetchProducts();

    // Function to create a product div
function createProductDiv(product) {
    const productdiv = document.createElement('div');
    productdiv.className = "product-div"; 
    
    const img = document.createElement('img');
    img.src = product.img; 
    img.alt = product.name; 
    img.className = "product-img"; 
    productdiv.appendChild(img);

    const productname = document.createElement('div');
    productname.textContent = product.name;
    productname.className = "product-name";
    productdiv.appendChild(productname);

    const productprice = document.createElement('div');
    productprice.textContent = product.price;
    productprice.className = "product-price"; 
    productdiv.appendChild(productprice);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = "button-container";
    const viewButton = createButton("View Details", "#ffa41c");
    const addButton = createButton("Add to Cart", "#ffd814");

    buttonContainer.appendChild(viewButton);
    buttonContainer.appendChild(addButton);
    productdiv.appendChild(buttonContainer);

    addButton.addEventListener('click', () => addToCart(product));
    viewButton.addEventListener('click', () => viewProductDetails(product));

    return productdiv;
}


// Function to create a button with styling
function createButton(text, bgColor) {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = bgColor;
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    return button;
}

// Add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);  
    localStorage.setItem('cart', JSON.stringify(cart)); 
    window.location.href = 'cart.html';
}

// View product details
function viewProductDetails(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product)); 
    window.location.href = 'view-details.html'; 
}
