import { detectArticle } from "../navigation/articles.js";
import { detectMap } from "../navigation/maps.js";
import { setAnchors } from "../components/anchor.js";
import { TableOfContents } from "../components/table-of-contents.js";
import { detectTheme } from "../components/theme-switcher.js";

export function onLoadRoutine() {
    customElements.define("table-of-contents", TableOfContents);

    addEventListener("popstate", () => {
        detectArticle();
        detectMap();
        setAnchors();
    });

    detectTheme();
    detectArticle();
    detectMap();
    setAnchors();
}
