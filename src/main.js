import { detectArticle } from "./navigation/articles.js";
import { detectMap } from "./navigation/maps.js";
import { setAnchors } from "./components/anchor.js";
import { TableOfContents } from "./components/table-of-contents.js";
import { detectTheme } from "./components/theme-switcher.js";

customElements.define("table-of-contents", TableOfContents);

document.getElementById("close-article-btn").innerHTML =
    window.imports.settings.labels.closeArticle;

addEventListener("popstate", () => {
    detectArticle();
    detectMap();
    setAnchors();
});

detectTheme();
detectArticle();
detectMap();
setAnchors();
