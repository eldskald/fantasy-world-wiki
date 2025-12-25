export class PreviewContent extends HTMLElement {
    constructor() {
        super();
    }

    // This does nothing on the page, it's just a tag meant to be
    // detected by the preview popup so it can render its contents.

    connectedCallback() {
        this.parentElement.removeChild(this);
    }
}
