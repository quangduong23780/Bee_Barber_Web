const query_search_product = document.getElementById("query-search-product");
const btn_search_product = document.getElementById("btn-search-product");
let dataProducts = [];
let nameCategory='';
getData()
//get name ccategory
async function getNamecategory(idCategory) {
  try {
    const response = await fetch(`/api/get/categories/${idCategory}`);
    const data = await response.json(); 
    return data.category.name;
  } catch (error) {
    console.error("err_name_category:", error);
    return "Error";
  }
}
function getData(){
  fetch("/api/products")
  .then((response) => response.json())
  .then((data) => {
    dataProducts = data.products;
    displayProducts(dataProducts);
  })
  .catch((error) => console.error("Error fetching products:", error));
}


btn_search_product.addEventListener("click", function (e) {
  e.preventDefault();
  const result_search = query_search_product.value.trim().toLowerCase();

  const filteredProduct = dataProducts.filter((products) => {
    return products.name.toLowerCase().includes(result_search);
  });

  displayProducts(filteredProduct);
});

async function displayProducts(products) {
  const tableBody1 = document.getElementById("products-list");
  tableBody1.innerHTML = "";

  for (const product of products) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="h5">${product._id}</td>
      <td class="h5">${product.name}</td>
      <td> <img src="${product.image64[0]}" style="max-width: 100px; max-height: 100px;" class="rounded mx-auto d-block" alt="Fstyle shop"></td>
      <td class="h5">${product.brand}</td>
      <td class="h5">${product.size}</td>
      <td class="h5">${product.price.toLocaleString()}</td>
      <td class="h5">${product.color}</td>
      <td class="h5">${product.quantity}</td>
      <td class="h5">${product.quantity===0 ?"Hết hàng": "Còn hàng"}</td>
      <td class="h5">${product.description}</td>
      <td class="h5">${await getNamecategory(product.category)}</td>
      <td><a href="${product._id}"style="color:
       #007bff; font-size:15px; text-decoration: underline;"
       >Ngừng bán</a></td>
    `;
    tableBody1.appendChild(newRow);
  }
}
document.getElementById('add-product-btn').addEventListener('click', async function(e){
  e.preventDefault();
  window.location.href="/addproduct";
})
document.getElementById("products-list").addEventListener("click",async function (event) {
  if (event.target.tagName === "A") {
    event.preventDefault(); 
    const productId = await event.target.getAttribute("href");
    $("#confirmModalProduct").modal('show')
    $("#confirmProductBtn").click(function(){
      fetch(`/api/products/update/quantity/${productId}`)
      .then(res => res.json())
      .then(data =>{
      if(data.message==="update thành công"){
        $("#confirmModalProduct").modal('hide')
        alert("update thành công")
        getData()
      }else if(data.message==="update thất bại"){
        alert("update thất bại")
      }else{
        alert("Không tìm thấy sản phẩm")
      }
      })
      
    })
   
  }
});