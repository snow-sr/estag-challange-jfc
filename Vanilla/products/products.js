const productSelectCategory = document.getElementById("product_category");
//==================================//
const formProduct = document.getElementById("form_product");
const productName = document.getElementById("product_name");
const productQuantity = document.getElementById("product_quantity");
const productPrice = document.getElementById("product_price");
const productTable = document.getElementById("product_table");

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(6);
};

const renderUtils = {
  clear: () => {
    productSelectCategory.innerHTML = "";
    productName.value = "";
    productPrice.value = "";
    productQuantity.value = "";
    productSelectCategory.value = "";
    productTable.innerHTML = `
    <tr>
      <th>id</th>
      <th>Produto</th>
      <th>Qtd. em estoque</th>
      <th>Preço unid.</th>
      <th>Categoria</th>
      <th>Ações</th>
    </tr>`;
  },
  printOption: (options) => {
    options.forEach((option) => {
      productSelectCategory.innerHTML += `<option value="${option.code}">${option.name}</option>`;
    });
  },
  printTable: (listOfProducts) => {
    listOfProducts.forEach((obj) => {
      productTable.innerHTML += `<tr><td>${obj.code}</td><td>${
        obj.name
      }</td><td>${obj.amount}</td><td>R$${parseFloat(obj.price).toFixed(
        2
      )}</td><td>${obj.category_name}</td><td><button onClick="remover(${
        obj.code
      })">Remover</button></tr></tr>`;
    });
  },
};

function remover(id) {
  let request = fetch(`http://localhost/routes/products.php/?id=${id}`, {
    method: "delete",
  }).then((data) => {
    renderUtils.clear();
    init();
  });
}

formProduct.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let form = new FormData(document.getElementById("form_product"));
  let price = form.get("price");
  price.replace(",", ".");
  form.set("price", price);
  form.append("code", uid());
  for (const value of form.entries()) {
    console.log(value);
  }

  let createProduct = fetch("http://localhost/routes/products.php", {
    body: form,
    method: "post",
  });

  console.log(await createProduct);
  //clear
  renderUtils.clear();
  init();
});

//==================================================//
async function init() {
  if (!localStorage.getItem("login")) {
    window.location.pathname = "/Vanilla/login/login.html";
  }
  let request = fetch("http://localhost/routes/products.php").then((data) => {
    return data.json();
  });
  let requestOptions = fetch("http://localhost/routes/categories.php").then(
    (data) => {
      return data.json();
    }
  );

  let productsData = await request;
  let optionsData = await requestOptions;

  console.log(productsData, optionsData);

  renderUtils.printTable(await productsData);
  renderUtils.printOption(await optionsData);
}

init();

function handleShortcut(event) {
  if (event.key === ";") {
    event.preventDefault();
    localStorage.removeItem("login");
    init();
  }
}
document.addEventListener("keydown", handleShortcut);
