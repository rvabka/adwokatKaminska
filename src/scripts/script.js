document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const servicesLink = document.getElementById("services");
  const dropdownMenu = document.querySelector(".nav__dropdown");
  const dropdownLink = document.querySelectorAll(".nav__dropdown-link");
  const arrow = document.querySelector(".nav__link-arrow");
  const navItems = document.querySelectorAll(".nav__link");

  if (window.innerWidth > 850) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 150) {
        nav.style.position = "fixed";
        nav.style.backgroundColor = "#f5f5f5";
        nav.style.borderRadius = "25px";
        nav.style.marginTop = "5px";
      } else {
        nav.style.position = "relative";
        nav.style.backgroundColor = "";
        nav.style.borderRadius = "";
        nav.style.marginTop = "0";
      }
    });
  }

  // Funkcja do zamykania menu
  function closeMenu() {
    nav.classList.remove("active");
    hamburger.classList.remove("open");
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target != servicesLink) {
        closeMenu();
      }
    });
  });

  dropdownLink.forEach((item) => {
    item.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Toggle całego menu nawigacyjnego
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    nav.classList.toggle("active");
  });

  // Toggle dropdown menu
  servicesLink.addEventListener("click", (event) => {
    const isWideScreen = window.innerWidth < 850;

    if (isWideScreen) {
      event.preventDefault();
      event.stopPropagation();
      dropdownMenu.classList.toggle("visible");
      if (dropdownMenu.classList.contains("visible")) {
        arrow.innerHTML = "&#9652;"; // Strzałka w górę
      } else {
        arrow.innerHTML = "&#9662;"; // Strzałka w dół
      }
    }
  });

  // Zamknij menu i dropdown, jeśli kliknięto poza nimi
  document.addEventListener("click", (event) => {
    if (
      !nav.contains(event.target) &&
      !hamburger.contains(event.target) &&
      nav.classList.contains("active")
    ) {
      closeMenu();
    }

    if (
      !dropdownMenu.contains(event.target) &&
      dropdownMenu.classList.contains("visible")
    ) {
      dropdownMenu.classList.remove("visible");
      arrow.innerHTML = "&#9662;"; // Strzałka w dół
    }
  });

  // Zapobiegaj zamykaniu menu przy kliknięciu wewnątrz nawigacji
  nav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Zapobiegaj zamykaniu dropdown przy kliknięciu wewnątrz dropdownu
  dropdownMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
  const footer = document.querySelector("footer");
  if (!(scrollToTopBtn === null)) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const footerTop = footer.offsetTop;
      const footerHeight = footer.offsetHeight;

      // Pokaż lub ukryj przycisk przewijania w górę
      if (scrollPosition > 200) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }

      // Sprawdzenie, czy przycisk jest w obrębie sekcji footer
      if (
        scrollPosition + windowHeight > footerTop &&
        scrollPosition < footerTop + footerHeight
      ) {
        scrollToTopBtn.style.backgroundColor = "#f5f5f5"; // Zmień kolor dla sekcji footer
        scrollToTopBtn.style.color = "#fcb900";
      } else {
        scrollToTopBtn.style.backgroundColor = ""; // Przywróć domyślny kolor
        scrollToTopBtn.style.color = "";
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
