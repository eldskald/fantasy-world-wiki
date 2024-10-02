export class TableOfContents extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const headers =
            this.parentElement.querySelectorAll("h2, h3, h4, h5, h6");
        const tocHeader = document.createElement("h3");
        tocHeader.innerHTML = "Table of Contents";
        this.appendChild(tocHeader);
        const list = document.createElement("ul");
        this.appendChild(list);
        let id = 0;
        headers.forEach((header) => {
            if (!header.id) header.id = id++;
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${header.id}`;
            a.innerHTML = header.innerHTML;
            a.className = "font-sans";
            if (header.tagName === "H3") {
                a.className += " ml-2";
            } else if (header.tagName === "H4") {
                a.className += " ml-4";
            } else if (header.tagName === "H5") {
                a.className += " ml-6";
            } else if (header.tagName === "H6") {
                a.className += " ml-8";
            }
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    disconnectedCallback() {
        this.innerHTML = "";
    }
}
