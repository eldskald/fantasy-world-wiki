import { detectArticle, toArticle } from "./navigation/articles.js";
import { detectMap, toMap } from "./navigation/maps.js";
import { setAnchors } from "./components/anchor.js";
import { TableOfContents } from "./components/table-of-contents.js";

customElements.define("table-of-contents", TableOfContents);

window.toArticle = toArticle;
window.toMap = toMap;

document.getElementById("close-article-btn").innerHTML =
    window.imports.settings.labels.closeArticle;

detectArticle();
detectMap();
setAnchors();
