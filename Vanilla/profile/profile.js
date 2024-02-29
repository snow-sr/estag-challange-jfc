const header = document.getElementById("Header");
const profile = localStorage.getItem("login");
header.innerText = JSON.parse(profile).username;

const btn = document.getElementById("logout");

async function init() {
  if (!localStorage.getItem("login")) {
    window.location.href = "http://localhost:5500/Vanilla/login/login.html";
  }
}

btn.onclick = () => {
  localStorage.removeItem("login");
  init();
};

init();
