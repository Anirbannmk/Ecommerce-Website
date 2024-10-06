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

//display the filter product
async function showdata(){
  const maindiv = document.getElementById('productcontainer');
  const text = document.getElementById("inputbox").value.toLowerCase();
  maindiv.innerText=""
  let response = await fetch("index.json");
  let jsonproduct = await response.json();
  let data=jsonproduct.filter((ele)=>{
    return ele.name.toLowerCase().includes(text);
  })
  if (data.length>0) {
    data.forEach((product) => {
      const productdiv = createproductdiv(product);
      maindiv.appendChild(productdiv);
    });
  } else {
    maindiv.innerHTML = "<p>No products found</p>"; 
  }
}

//display the product in webpaage
async function fetchProducts() {
    //search for particular product
    //const searchinput=document.getElementById('searchInput').value.toLowerCase();
    let response = await fetch("index.json");
    let jsonproduct = await response.json();
    const maindiv = document.getElementById('productcontainer');
    maindiv.style.display = "flex";
    maindiv.style.flexWrap = "wrap";  
    maindiv.style.justifyContent = "center";
    maindiv.style.gap = "20px";
    maindiv.style.padding = "20px";
    maindiv.style.width = "100%";
    document.body.appendChild(maindiv);
    const productsArray = jsonproduct;
    productsArray.forEach(product => {
        const productdiv = createproductdiv(product);
        maindiv.appendChild(productdiv);
    });
  }
  fetchProducts();


    function createproductdiv(product) {
        const productdiv = document.createElement('div');
        productdiv.style.width = "250px";
        productdiv.style.height = "auto"; 
        productdiv.style.padding = "15px";
        productdiv.style.backgroundColor = "#fff";
        productdiv.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
        productdiv.style.borderRadius = "8px";
        productdiv.style.textAlign = "center";

        const img = document.createElement('img');
        img.src = product.img;
        img.style.width = "80%";
        img.style.borderRadius = "8px";
        img.style.marginBottom = "10px";
        productdiv.appendChild(img);

        const productname = document.createElement('div');
        productname.textContent = product.name;
        productname.style.fontSize = "18px";
        productname.style.fontWeight = "bold";
        productname.style.marginBottom = "8px";
        productdiv.appendChild(productname);

        const productprice = document.createElement('div');
        productprice.textContent = product.price;
        productprice.style.color = "green";
        productprice.style.fontSize = "16px";
        productprice.style.marginBottom = "8px";
        productdiv.appendChild(productprice);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "space-between"; 
        buttonContainer.style.marginTop = "10px"; 
        buttonContainer.style.gap = "10px"; 

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Details";
        viewButton.style.backgroundColor = "#ffa41c";
        viewButton.style.color = "#fff";
        viewButton.style.border = "none";
        viewButton.style.padding = "10px";
        viewButton.style.borderRadius = "5px";
        viewButton.style.cursor = "pointer";
        buttonContainer.appendChild(viewButton);

        const addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.style.backgroundColor = "#ffd814"; 
        addButton.style.color = "#fff";
        addButton.style.border = "none";
        addButton.style.padding = "10px";
        addButton.style.borderRadius = "5px";
        addButton.style.cursor = "pointer";
        buttonContainer.appendChild(addButton);

        productdiv.appendChild(buttonContainer);
        addButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);  
            localStorage.setItem('cart', JSON.stringify(cart)); 
            window.location.href = 'cart.html';
        });
    
        return productdiv;
    }


