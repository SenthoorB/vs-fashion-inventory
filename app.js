
let items=JSON.parse(localStorage.getItem('vs_items')||'[]');

function save(){localStorage.setItem('vs_items',JSON.stringify(items));render();}

function addItem(){
 const n=document.getElementById('name').value.trim();
 const q=parseInt(document.getElementById('qty').value||0);
 const f=document.getElementById('img').files[0];
 if(!n){alert('Enter dress name');return;}
 if(f){
  const r=new FileReader();
  r.onload=e=>{
    items.push({id:Date.now(),name:n,qty:q,img:e.target.result});
    save();
  };
  r.readAsDataURL(f);
 }else{
  items.push({id:Date.now(),name:n,qty:q,img:''});
  save();
 }
 document.getElementById('name').value='';
 document.getElementById('qty').value='';
 document.getElementById('img').value='';
}

function change(id,d){
 const it=items.find(x=>x.id===id);
 if(!it)return;
 it.qty=Math.max(0,it.qty+d);
 save();
}
function del(id){
 items=items.filter(x=>x.id!==id);
 save();
}
function render(){
 const s=document.getElementById('search').value.toLowerCase();
 const div=document.getElementById('list');
 div.innerHTML='';
 items.filter(i=>i.name.toLowerCase().includes(s)).forEach(i=>{
  const el=document.createElement('div');
  el.className='item';
  el.innerHTML=`${i.img?'<img src="'+i.img+'">':'<div style="width:80px;height:80px;border:1px solid #ccc;display:flex;align-items:center;justify-content:center">No Image</div>'}
  <div style="flex:1"><div class="name">${i.name}</div><div>Available: ${i.qty}</div></div>
  <button onclick="change(${i.id},1)">+1</button>
  <button onclick="change(${i.id},-1)">-1</button>
  <button onclick="del(${i.id})">Delete</button>`;
  div.appendChild(el);
 });
}
render();
