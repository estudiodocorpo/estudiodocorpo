import firebase from "./firebase-app";
const auth = firebase.auth();

document.querySelectorAll("#header").forEach((page) => {
  const btnOpen = page.querySelector("#btn-open");
  const btnClose = page.querySelector("#btn-close");
  const btnExit = page.querySelector("#btn-exit");
  const links = page.querySelector(".item-links");

  if (btnOpen) {
    btnOpen.addEventListener("click", (e) => {
      page.classList.toggle("open-menu-header");
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", (e) => {
      page.classList.toggle("open-menu-header");
    });
  }

  if (links) {
    links.addEventListener("click", (e) => {
      page.classList.toggle("open-menu-header");
    });
  }

  if (btnExit) {
    btnExit.addEventListener("click", (e) => {
      sessionStorage.removeItem("addClassList");
      auth.signOut();
      window.location.href = "./";
    });
  }

  const logged = sessionStorage.getItem("addClassList");

  if (logged) {
    page.classList.add(`${logged}`);
  }
});
