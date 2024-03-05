const formCategory = document.getElementById("form_category");
const categoryRows = document.getElementById("category_rows");
const categoryForm = {
  code: document.getElementById("category_code"),
  name: document.getElementById("category_name"),
  tax: document.getElementById("category_tax"),
};

function createRow(category) {
  categoryRows.innerHTML += `<tr><td>${category.code}</td><td>${category.name}</td><td>${category.tax}</td><td><button onClick="remover(${category.code})">Remover</button></tr></tr>`;
}

function erase() {
  categoryForm.name.value = "";
  categoryForm.tax.value = "";
  categoryForm.code.value = "";
  categoryRows.innerHTML = `<tr>
  <th>Id</th>
  <th>Categoria</th>
  <th>Taxa</th>
  <th>Ações</th>
</tr>`;
}

async function remover(id) {
  let request = fetch(`http://localhost/routes/categories.php/?id=${id}`, {
    method: "delete",
  }).then((data) => {
    erase();
    init();
    return data;
  });
}

formCategory.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let form = new FormData(document.getElementById("form_category"));
  for (const value of form.entries()) {
    console.log(value);
  }
  let createCategory = fetch("http://localhost/routes/categories.php", {
    body: form,
    method: "post",
  });

  console.log(await createCategory);
  erase();
  init();
});

async function init() {
  if (!localStorage.getItem("login")) {
    window.location.href = "../login/login.html";
  }
  let request = fetch("http://localhost/routes/categories.php").then((data) => {
    return data.json();
  });

  console.log(await request);

  let categoriesData = await request;

  categoriesData.forEach((category) => {
    createRow(category);
  });
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
