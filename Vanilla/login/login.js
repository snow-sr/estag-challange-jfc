const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const userUtils = {
  createSession: (key) => {
    localStorage.setItem("login", key);
    window.location.href = "../index.html";
  },
  verifyIfLogged: () => {
    if (localStorage.getItem("login")) {
      return true;
    } else {
      return false;
    }
  },
};

async function login() {
  let local = new FormData(loginForm);

  let login = fetch("http://localhost/routes/users.php", {
    body: local,
    method: "post",
  }).then((data) => {
    return data.json();
  });

  let data = await login;
  console.log(data);

  if (data.status === "ok") {
    // * change this to be more secure later
    userUtils.createSession(JSON.stringify(data.profile));
  } else {
    alert(data.msg);
  }
}

async function register() {
  let local = new FormData(registerForm);
  local.append("register", 1);

  let login = fetch("http://localhost/routes/users.php", {
    body: local,
    method: "post",
  }).then((data) => {
    return data.json();
  });

  let data = await login;

  if (data.status === "ok") {
    // * change this to be more secure later
    alert("Usuário criado! Agora faça login");
  } else {
    alert(data.msg);
  }
}

function init() {
  if (userUtils.verifyIfLogged()) {
    window.location.href = "../index.html";
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  login();
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  register();
});

init();
