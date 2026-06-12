const demo=[
 {name:"Blue Kurti",qty:10,price:799},
 {name:"Red Saree",qty:5,price:1299},
 {name:"Kids Dress",qty:2,price:499}
];

function refreshCards(){
 document.getElementById("products").textContent=demo.length;
 document.getElementById("stock").textContent=demo.reduce((a,b)=>a+b.qty,0);
 document.getElementById("low").textContent=demo.filter(x=>x.qty<3).length;
 const value=demo.reduce((a,b)=>a+b.qty*b.price,0);
 document.getElementById("value").textContent="₹"+value.toLocaleString();
}
function renderRecent(){
 const q=document.getElementById("search").value.toLowerCase();
 const root=document.getElementById("recent");
 root.innerHTML="";
 demo.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>{
   const d=document.createElement("div");
   d.className="item";
   d.innerHTML=`<strong>${x.name}</strong><br>Qty: ${x.qty} | Price: ₹${x.price}`;
   root.appendChild(d);
 });
}
refreshCards();
renderRecent();
