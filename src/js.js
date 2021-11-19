let colorMode = "light";

const ELEMENTS = {
  colorModeToggler: document.getElementById("color-mode-toggler"),
};

init();

function init() {
  ELEMENTS.colorModeToggler.addEventListener("click", () => {
    toggleColorMode();
    document.activeElement && document.activeElement.blur();
  });
  ELEMENTS.colorModeToggler.addEventListener("keypress", toggleColorMode);

  detectColorModePreference();
  activateColorMode();
}

function detectColorModePreference() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    colorMode = "dark";
  }
}

function toggleColorMode() {
  colorMode = colorMode === "light" ? "dark" : "light";
  activateColorMode();
}

function activateColorMode() {
  if (colorMode === "light") {
    document.body.classList.remove("dark");
    ELEMENTS.colorModeToggler
      .querySelector("#dark-mode")
      .removeAttribute("style");
    ELEMENTS.colorModeToggler.querySelector("#light-mode").style.display =
      "none";
  } else {
    document.body.classList.add("dark");
    ELEMENTS.colorModeToggler
      .querySelector("#light-mode")
      .removeAttribute("style");
    ELEMENTS.colorModeToggler.querySelector("#dark-mode").style.display =
      "none";
  }
}
