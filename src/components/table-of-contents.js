export class TableOfContents extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const headers = this.parentElement.querySelectorAll("h2, h3, h4");
        const tocHeader = document.createElement("h3");
        tocHeader.innerHTML = window.settings.labels.tableOfContents;
        this.appendChild(tocHeader);
        const list = document.createElement("ul");
        list.className = "font-sans text-xl";
        this.appendChild(list);
        let id = 0;
        headers.forEach((header) => {
            if (!header.id) header.id = id++;
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${header.id}`;
            a.innerHTML = header.innerHTML;
            if (header.tagName === "H3") {
                a.className = "ml-4";
            } else if (header.tagName === "H4") {
                a.className = "ml-8";
            }
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
}
