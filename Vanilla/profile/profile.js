const header = document.getElementById("Header");
const profile = localStorage.getItem("login");
header.innerText = JSON.parse(profile).username;

const btn = document.getElementById("logout");

async function init() {
  if (!localStorage.getItem("login")) {
    let newLink = window.location.pathname;
    newLink = newLink.split("/");
    newLink = newLink.pop();
    newLink[newLink.length - 1] = "login/login.html";
    window.location.pathname = newLink.join("/");
  }
}

btn.onclick = () => {
  localStorage.removeItem("login");
  init();
};

init();
