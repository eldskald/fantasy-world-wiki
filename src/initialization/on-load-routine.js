import { detectArticle } from "../navigation/articles.js";
import { detectMap } from "../navigation/maps.js";
import { detectMenu } from "../navigation/menu.js";
import { setAnchors } from "../components/anchor.js";
import { TableOfContents } from "../components/table-of-contents.js";
import { detectTheme } from "../components/theme-switcher.js";

function render() {
    detectArticle();
    detectMap();
    detectMenu();
}

export function onLoadRoutine() {
    customElements.define("table-of-contents", TableOfContents);

    document.body.addEventListener("rerender", render);

    addEventListener("popstate", render);

    detectTheme();
    render();
    setAnchors(document.querySelectorAll("a"));
}
