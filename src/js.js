const asideMenu = new Vue({
  el: "aside",
  data: {
    isDarkMode: null,
  },
  methods: {
    toggleColorMode(event) {
      event.type === "click" && document.activeElement?.blur?.();
      this.isDarkMode = !this.isDarkMode;
    },
  },
  watch: {
    isDarkMode(val) {
      return val
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
    },
  },
  mounted() {
    this.isDarkMode = !!window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
  },
});
