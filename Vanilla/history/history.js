const historyTable = document.getElementById("history_table");
const modal = document.getElementById("modalInfo");
const span = document.getElementsByClassName("close")[0];
const modalTable = document.getElementById("tableProductsHistory");

function createRow(info, user) {
  historyTable.innerHTML += `
  <tr>
     <td>
      ${info.code}
     </td>
     <td>
     R$${info.tax}
     </td>
     <td>
     R$${info.total}
     </td>
     <td>
     ${user.username}
     </td>
     <td>
     <button onclick="viewInfo(${info.code})">Clique aqui para ver os produtos</button>
     </td>
  </tr>
  `;
}

function clear() {
  historyTable.innerHTML = `
    <tr>
       <th>
        id
       </th>
       <th>
       Impostos
       </th>
       <th>
       Total pós-impostos
       </t>
       <th>
       Nome comprador
       </th>
       <th>
       Ações
       </th>
    </tr>
    `;
}

async function init() {
  if (!localStorage.getItem("login")) {
    window.location.pathname =
      "Ubuntu/root/estag-challange/Vanilla/login/login.html";
  }
  let request = fetch("http://localhost/routes/order.php").then((data) => {
    return data.json();
  });
  console.log(await request);

  let historyData = await request;

  if (!historyData) {
    alert("Não há compras feitas.");
  }
  const userId = JSON.parse(localStorage.getItem("login"));

  await historyData.forEach((element) => {
    if (element.user_code == userId.code) {
      createRow(element, userId);
    }
  });
}

init();

async function viewInfo(id) {
  let request = fetch(`http://localhost/routes/order.php/?code=${id}`).then(
    (data) => {
      return data.json();
    }
  );

  let historyData = await request;
  console.log(historyData);

  modal.style.display = "block";
  modalTable.innerHTML = `
  <tr>
                      <th>
                          Produto
                      </th>
                      <th>
                          Quantidade
                      </th>
                      <th>
                          Valor do(s) iten(s)
                      </th>
                  </tr>
  `;

  await historyData.forEach((obj) => {
    modalTable.innerHTML += `
    <tr style="{border: 1px dotted;}">
        <td>
        ${obj.product_name}
        </td>
        <td>
        x${obj.order_item_amount}
        </td>
        <td>
        R$${(obj.product_price * obj.order_item_amount).toFixed(2)}
        </td>
    </tr>
    
    `;
  });
  modalTable.innerHTML += `
  <tfoot style="{margin: 10px;}">
    <tr>
      <td>Valor total: R$${historyData[0].orders_total}</td>
      <td>Total de impostos: R$${historyData[0].order_tax}</td>
    </tr>
  </tfoot>
  `;
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function handleShortcut(event) {
  if (event.key === ";") {
    event.preventDefault();
    localStorage.removeItem("login");
    init();
  }
}
document.addEventListener("keydown", handleShortcut);
