document.querySelectorAll("#header").forEach((page) => {
  const btnOpen = page.querySelector("#btn-open");
  const btnClose = page.querySelector("#btn-close");
  const btnExit = page.querySelector("#btn-exit");
  const btnlogin = page.querySelector(".btn-login");
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
      page.classList.toggle("logged");
    });
  }

  if (btnlogin) {
    btnlogin.addEventListener("click", (e) => {
      page.classList.toggle("logged");
    });
  }
});
