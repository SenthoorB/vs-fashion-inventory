// ================================
// VS Fashion ERP
// Sprint 1 - Product Management
// ================================

const STORAGE_KEY = "vs_fashion_products";

let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveBtn = document.getElementById("saveBtn");
const inventoryList = document.getElementById("inventoryList");

saveBtn.addEventListener("click", saveProduct);

renderProducts();

function saveProduct() {

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("category").value.trim();
    const color = document.getElementById("color").value.trim();
    const size = document.getElementById("size").value;
    const purchasePrice = document.getElementById("purchasePrice").value;
    const sellingPrice = document.getElementById("sellingPrice").value;
    const quantity = document.getElementById("quantity").value;

    if(name === ""){
        alert("Please enter Product Name");
        return;
    }

    if(quantity === ""){
        alert("Please enter Quantity");
        return;
    }

    const product = {

        id: Date.now(),

        name,

        category,

        color,

        size,

        purchasePrice: Number(purchasePrice || 0),

        sellingPrice: Number(sellingPrice || 0),

        quantity: Number(quantity || 0),

        createdDate: new Date().toLocaleString()

    };

    products.push(product);

    saveToLocal();

    clearForm();

    renderProducts();

    alert("Product Added Successfully");

}

function saveToLocal(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );

}

function clearForm(){

    document.getElementById("productName").value="";
    document.getElementById("category").value="";
    document.getElementById("color").value="";
    document.getElementById("purchasePrice").value="";
    document.getElementById("sellingPrice").value="";
    document.getElementById("quantity").value="";
    document.getElementById("size").selectedIndex=0;

}

function renderProducts(searchText=""){

    inventoryList.innerHTML="";

    let filtered = products.filter(p=>{

        return p.name.toLowerCase().includes(searchText.toLowerCase());

    });

    if(filtered.length===0){

        inventoryList.innerHTML="<p>No Products Found</p>";
        return;

    }

    filtered.forEach(product=>{

        const div=document.createElement("div");

        div.className="product-card";

        div.innerHTML=`

            <div class="product-title">

                ${product.name}

            </div>

            <div class="product-info">

                Category : ${product.category || "-"}

            </div>

            <div class="product-info">

                Color : ${product.color || "-"}

            </div>

            <div class="product-info">

                Size : ${product.size}

            </div>

            <div class="product-info">

                Purchase : ₹${product.purchasePrice}

            </div>

            <div class="product-info">

                Selling : ₹${product.sellingPrice}

            </div>

            <div class="product-info">

                Quantity : ${product.quantity}

            </div>

            <div class="action-row">

                <button class="small-btn add"
                onclick="addStock(${product.id})">

                + Stock

                </button>

                <button class="small-btn sell"
                onclick="sellStock(${product.id})">

                Sell

                </button>

                <button class="small-btn edit"
                onclick="deleteProduct(${product.id})">

                Delete

                </button>

            </div>

        `;

        inventoryList.appendChild(div);

    });

}

function deleteProduct(id){

    if(!confirm("Delete Product?")){

        return;

    }

    products = products.filter(p=>p.id!==id);

    saveToLocal();

    renderProducts();

}

function addStock(id){

    let qty = prompt("Enter Quantity to Add");

    if(qty===null) return;

    qty = Number(qty);

    if(isNaN(qty) || qty<=0){

        alert("Invalid Quantity");

        return;

    }

    let product = products.find(p=>p.id===id);

    product.quantity += qty;

    saveToLocal();

    renderProducts();

}

function sellStock(id){

    let qty = prompt("Enter Quantity Sold");

    if(qty===null) return;

    qty = Number(qty);

    if(isNaN(qty) || qty<=0){

        alert("Invalid Quantity");

        return;

    }

    let product = products.find(p=>p.id===id);

    if(qty>product.quantity){

        alert("Not Enough Stock");

        return;

    }

    product.quantity -= qty;

    saveToLocal();

    renderProducts();

}

// Optional Search Box Support
const searchInput = document.getElementById("search");

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        renderProducts(this.value);

    });

}
