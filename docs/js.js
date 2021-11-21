"use strict";
var asideMenu = new Vue({
    el: "aside",
    data: { isDarkMode: null },
    methods: {
      toggleColorMode: function toggleColorMode(a) {
        var b, c;
        "click" === a.type &&
          (null === (b = document.activeElement) ||
          void 0 === b ||
          null === (c = b.blur) ||
          void 0 === c
            ? void 0
            : c.call(b)),
          (this.isDarkMode = !this.isDarkMode);
        try {
          window.localStorage.setItem("dark-mode", this.isDarkMode ? 1 : 0);
        } catch (a) {}
      },
    },
    watch: {
      isDarkMode: function isDarkMode(a) {
        a
          ? document.body.classList.add("dark")
          : document.body.classList.remove("dark");
      },
    },
    mounted: function mounted() {
      var a = null;
      try {
        var b = window.localStorage.getItem("dark-mode");
        b && (a = !!+b);
      } catch (a) {}
      this.isDarkMode =
        null === a
          ? !!window.matchMedia("(prefers-color-scheme: dark)").matches
          : a;
    },
  }),
  phraseGenerator = new Vue({
    el: "#generator",
    data: { count: 4, insertDollar: !1, result: "" },
    methods: {
      generate: function generate() {
        for (
          var a = function () {
              var a = new Uint32Array(1);
              return window.crypto.getRandomValues(a), a[0];
            },
            b = [],
            c = 0;
          c < this.count;
          c++
        )
          b.push(WORDS_LIST[a() % WORDS_LIST.length]);
        if (this.insertDollar) {
          var d = a() % b.length,
            e = b[d],
            f = a() % e.length,
            g = e.split("");
          g.splice(f, 0, "$"), (b[d] = g.join(""));
        }
        this.result = b.join("-");
      },
    },
  });
function addLinksToSectionsAndArticles() {
  var a = function (a, b) {
    for (var c = document.querySelectorAll(a), d = 0; d < c.length; d++) {
      var e = document
          .getElementById("section-link-template")
          .content.cloneNode(!0),
        f = c[d].querySelector(b);
      if (!f) return;
      f.appendChild(e),
        (f.querySelector("".concat(b, " a")).href = "#".concat(f.id));
    }
  };
  a("section", "h2"), a("article", "h3");
}
addLinksToSectionsAndArticles();
