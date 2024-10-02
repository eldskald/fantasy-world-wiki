import { detectArticle, toArticle } from "./navigation/articles.js";
import { setAnchors } from "./components/anchor.js";
import { TableOfContents } from "./components/table-of-contents.js";

// This is to add the custom HTML elements to the document.
customElements.define("table-of-contents", TableOfContents);

// This is to allow HTML documents to call `toArticle`, since this is a module
// type script we can't just do things like `onclick="toArticle('article')"`
// because the script is deferred, so we put these functions on window where
// they will be accessible to buttons.
window.toArticle = toArticle;

// These final lines are just the loading when the page loads the first time.
detectArticle();
setAnchors();
