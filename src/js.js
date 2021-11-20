const asideMenu = new Vue({
  el: "aside",
  data: {
    isDarkMode: null,
  },
  methods: {
    toggleColorMode(event) {
      event.type === "click" && document.activeElement?.blur?.();
      this.isDarkMode = !this.isDarkMode;

      try {
        window.localStorage.setItem("dark-mode", this.isDarkMode ? 1 : 0);
      } catch {}
    },
  },
  watch: {
    isDarkMode(val) {
      val
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
    },
  },
  mounted() {
    let isDarkMode = null;
    try {
      const storage = window.localStorage.getItem("dark-mode");
      if (storage) {
        isDarkMode = Boolean(Number(storage));
      }
    } catch {}

    console.log(isDarkMode);

    this.isDarkMode =
      isDarkMode !== null
        ? isDarkMode
        : !!window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
});

function addLinksToSectionsAndArticles() {
  const appender = (tag, titleTag) => {
    const containers = document.querySelectorAll(tag);
    for (let i = 0; i < containers.length; i++) {
      const node = document
        .getElementById("section-link-template")
        .content.cloneNode(true);

      const title = containers[i].querySelector(titleTag);

      if (!title) {
        return;
      }

      title.appendChild(node);

      title.querySelector(`${titleTag} a`).href = `#${title.id}`;
    }
  };

  appender("section", "h2");
  appender("article", "h3");
}

addLinksToSectionsAndArticles();
