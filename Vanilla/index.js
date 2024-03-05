const productInfo = {
  name: document.getElementById("product_name"),
  totalPrice: document.getElementById("product_total_price"),
  unitPrice: document.getElementById("product_unit_price"),
  withoutTax: document.getElementById("product_without_tax"),
  taxPrice: document.getElementById("product_tax"),
};
const finalInfo = {
  total: document.getElementById("cart_total"),
  taxes: document.getElementById("cart_total_tax"),
};

const cartElement = document.getElementById("cart_list");

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36);
};

//===========================================================================================================//
// globals
const inputItemQuantity = document.getElementById("item_quantity");
const form = document.getElementById("form_add");
const cancelShopping = document.getElementById("cancel_shopping");
const selectItem = document.getElementById("select_item");
const available = document.getElementById("available");

const renderUtils = {
  clear: () => {
    productInfo.name.innerText = "";
    productInfo.taxPrice.innerText = "";
    productInfo.totalPrice.innerText = "";
    productInfo.unitPrice.innerText = "";
    productInfo.withoutTax.innerText = "";
  },
  renderItemInfo: async () => {
    let requestProducts = fetch("http://localhost/routes/products.php").then(
      (data) => {
        return data.json();
      }
    );

    let products = await requestProducts;
    let infos = await products.find((obj) => obj.code == selectItem.value);
    renderUtils.clear();
    console.log(infos);
    inputItemQuantity.max = infos.amount;
    available.value = infos.amount;
    productInfo.withoutTax.innerText = `R$${await infos.price}`;
    productInfo.name.innerText = await infos.name;
    productInfo.unitPrice.innerText = `R$${await infos.products_without_tax}`;
    productInfo.taxPrice.innerText = `R$${await infos.tax_value}`;
    productInfo.totalPrice.innerText = `R$${(
      parseFloat(await infos.products_without_tax) * inputItemQuantity.value
    ).toFixed(2)}`;
  },
  renderCartList: (listOfProducts) => {
    cartElement.innerHTML = "";
    console.log("=".repeat(100));
    listOfProducts.forEach((item) => {
      cartElement.innerHTML += `<ul>${item.name} x${item.bought}</ul>`;
    });
  },
  renderFinalInfo: (cart) => {
    let finalPrice = cart.reduce(
      (price, item) => price + parseFloat(item.totalPrice),
      0
    );
    finalInfo.total.innerText = `R$${finalPrice.toFixed(2)}`;

    let finalTaxes = cart.reduce(
      (price, item) =>
        price + parseFloat(item.tax_value) * parseFloat(item.bought),
      0
    );

    finalInfo.taxes.innerText = `R$${finalTaxes.toFixed(2)}`;
  },
  renderProductOptions: (products) => {
    products.forEach((obj) => {
      if (obj.amount <= 0) {
        return;
      }
      selectItem.innerHTML += `<option value="${obj.code}">${obj.name}</option>`;
    });
  },
};

const apiUtils = {
  createOrder: async (total, tax) => {
    let body = new FormData();
    let userId = JSON.parse(localStorage.getItem("login"));
    body.append("tax", tax);
    body.append("total", total);
    body.append("code", uid());
    body.append("user_code", userId.code);

    let request = fetch("http://localhost/routes/order.php", {
      method: "post",
      body: body,
    }).then((res) => {
      return res.json();
    });

    let createdOrder = JSON.parse(await request);

    console.log(createdOrder);
    if (createdOrder.status == "ok") {
      alert("Compra concluida com sucesso!");

      let newList = [];
      virtualCart.forEach((item) => {
        newList.push({
          code: parseInt(Math.random() * 10000),
          order_code: createdOrder.code,
          product_code: item.code,
          amount: parseInt(item.bought),
          price: item.products_without_tax,
          tax: parseInt(item.tax_value),
        });
      });

      let data = new FormData();

      data.append("items", JSON.stringify(newList));

      let request = fetch("http://localhost/routes/orderItems.php", {
        method: "post",
        body: data,
      }).then((res) => {
        return res.text();
      });

      let result = await request;

      clearCart();
      let requestProducts = fetch("http://localhost/routes/products.php").then(
        (data) => {
          return data.json();
        }
      );

      let products = await requestProducts;
      renderUtils.renderItemInfo();
      renderUtils.renderProductOptions(products);
      console.log(result);
    }
  },
};

// this is the text we change at buy area

// * CHANGE INFO PRODUCT
selectItem.addEventListener("change", () => {
  inputItemQuantity.value = 1;
  renderUtils.renderItemInfo();
});

// * CHANGE INFO QUANTITY
inputItemQuantity.addEventListener("change", () => {
  renderUtils.renderItemInfo();
});

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&//

// cart informations will contain:
// product {qtd: input.value, allTax: valorImposto * qtd, nome: product.name, totalPrice: product.totalPrice}
//
//
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let virtualCart = [];
if (cart.length > 1) {
  virtualCart = cart;
}

// Adicionar ao carrinho
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();
  let requestProducts = fetch("http://localhost/routes/products.php").then(
    (data) => {
      return data.json();
    }
  );

  let products = await requestProducts;
  let infos = await products.find((obj) => obj.code == selectItem.value);
  let alreadyAtCart = virtualCart.find((obj) => obj.code == infos.code);

  if (alreadyAtCart) {
    let calc =
      parseFloat(alreadyAtCart.bought) + parseFloat(inputItemQuantity.value) >
      infos.amount;
    if (alreadyAtCart.bought >= infos.amount || calc) {
      alert("Você não pode comprar mais...");
    } else {
      alreadyAtCart.bought =
        parseFloat(inputItemQuantity.value) + parseFloat(alreadyAtCart.bought);
      alreadyAtCart.totalPrice = parseFloat(infos.price) * alreadyAtCart.bought;
    }
  } else {
    virtualCart.push({
      ...infos,
      totalPrice: (
        parseFloat(await infos.products_without_tax) * inputItemQuantity.value
      ).toFixed(2),
      bought: inputItemQuantity.value,
    });
  }

  console.log(virtualCart);
  renderUtils.renderFinalInfo(virtualCart);
  renderUtils.renderCartList(virtualCart);
});

async function init() {
  if (!localStorage.getItem("login")) {
    window.location.href = "./login/login.html";
  }
  renderUtils.clear();
  let requestProducts = fetch("http://localhost/routes/products.php").then(
    (data) => {
      return data.json();
    }
  );

  console.log(await requestProducts);

  let products = await requestProducts;
  inputItemQuantity.value = 1;
  renderUtils.renderProductOptions(products);
  renderUtils.renderItemInfo(products[0]);
}

init();

const clearCart = () => {
  virtualCart = [];
  renderUtils.renderCartList(virtualCart);
  renderUtils.renderFinalInfo(virtualCart);
};

const buy = async () => {
  if (virtualCart.length < 1) {
    return alert("Por favor, adicione algum item antes de concluir a compra");
  }

  let cartPrice = virtualCart
    .reduce((price, item) => price + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  let cartTaxes = virtualCart
    .reduce(
      (price, item) =>
        price + parseFloat(item.tax_value) * parseFloat(item.bought),
      0
    )
    .toFixed(2);

  apiUtils.createOrder(cartPrice, cartTaxes);
};

function debug() {
  console.table(virtualCart);
  //[{"code":3,  "order_code": 10201, "product_code": 2, "amount": 10, "price": 100, "tax": 10}]
  let newList = [];
  virtualCart.forEach((item) => {
    newList.push({
      code: uid(),
      order_code: 1,
      product_code: item.code,
      amount: item.bought,
      price: item.withoutTax,
      tax: item.tax_value,
    });
  });

  let cartPrice = virtualCart
    .reduce((price, item) => price + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  let cartTaxes = virtualCart
    .reduce(
      (price, item) =>
        price + parseFloat(item.tax_value) * parseFloat(item.bought),
      0
    )
    .toFixed(2);

  console.table([cartPrice, cartTaxes]);
  console.log(JSON.stringify(newList));
}

function handleShortcut(event) {
  if (event.key === ";") {
    event.preventDefault();
    localStorage.removeItem("login");
    init();
  }
}
document.addEventListener("keydown", handleShortcut);
