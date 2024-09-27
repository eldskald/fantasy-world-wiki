// This one checks all the anchors in the HTML with `toarticle` attributes
// and makes them change the article without reloading instead of their
// normal behavior. Also shows the link they'll send to when hovering
export function setLinks() {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
        const article = a.getAttribute("toarticle");
        if (article) {
            const url = new URL(window.location.href);
            url.searchParams.set("article", article);
            a.setAttribute("href", url.toString());
            a.setAttribute("onclick", `toArticle('${article}'); return false;`);
        }
    });
}
