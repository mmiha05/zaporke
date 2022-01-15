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

    this.isDarkMode =
      isDarkMode !== null
        ? isDarkMode
        : !!window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
});

const phraseGenerator = new Vue({
  el: "#generator",
  data: {
    count: 4,
    insertRandomSpecial: false,
    result: "",
    isWebCryptoSupported:
      "crypto" in window && typeof window.crypto.getRandomValues === "function",
  },
  methods: {
    generate() {
      const generateRandomNumber = () => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0];
      };

      const result = [];

      for (let i = 0; i < this.count; i++) {
        result.push(WORDS_LIST[generateRandomNumber() % WORDS_LIST.length]);
      }

      if (this.insertRandomSpecial) {
        const randomSpecials = ["$", "#", "!"];
        const randomWordIndex = generateRandomNumber() % result.length;
        const word = result[randomWordIndex];

        const randomCharIndex = generateRandomNumber() % word.length;
        const chars = word.split("");
        chars.splice(
          randomCharIndex,
          0,
          randomSpecials[generateRandomNumber() % randomSpecials.length]
        );

        result[randomWordIndex] = chars.join("");
      }

      this.result = result.join("-");
    },
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
