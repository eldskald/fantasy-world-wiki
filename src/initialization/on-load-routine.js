import { detectArticle } from "../navigation/articles.js";
import { detectMap } from "../navigation/maps.js";
import { detectMenu } from "../navigation/menu.js";
import { setAnchors } from "../components/anchor.js";
import { TableOfContents } from "../components/table-of-contents.js";
import { detectTheme } from "../components/theme-switcher.js";
import {
    showArticlePreview,
    hideArticlePreview,
} from "../components/article-preview.js";

function render() {
    detectArticle();
    detectMap();
    detectMenu();
    hideArticlePreview();
}

export function onLoadRoutine() {
    customElements.define("table-of-contents", TableOfContents);

    document.body.addEventListener("rerender", render);
    document.body.addEventListener("articlepreview", (ev) => {
        showArticlePreview(
            ev.detail.mouseX,
            ev.detail.mouseY,
            ev.detail.article,
        );
    });
    document.body.addEventListener("hidepreview", hideArticlePreview);

    addEventListener("popstate", render);

    detectTheme();
    render();
    setAnchors(document.querySelectorAll("a"));
}
