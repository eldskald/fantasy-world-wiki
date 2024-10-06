import { beforeEach, describe, expect, test } from "@jest/globals";

describe("table of contents", () => {
    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="article-container"></div>
            <div id="map-container"></div>
            <h2>Don't search this one</h1>
            <div>
                <h1>Article title</h1>
                <p>some text for the intro</p>
                <table-of-contents></table-of-contents>
                <h2 id="first-section">First section</h2>
                <p>more text</p>
                <h3 id="some-subsection">Subsection</h3>
                <h4>Subsubsection</h4>
                <h5>Don't care at this point</h5>
                <h6>sure yes</h6>
                <h1 id="whynot">Why not</h1>
                <h2 id="tests">tests</h2>
            </div>
        `;
        await import("./mocks/imports.js");
        await import("../src/main.js");
    });

    test("Should search for headers and create links correctly", () => {
        const anchors = document.querySelectorAll("a");
        expect(anchors.length).toBe(6);
        expect(anchors[0].href).toBe("http://localhost/#first-section");
        expect(anchors[0].innerHTML).toBe("First section");
        expect(anchors[1].href).toBe("http://localhost/#some-subsection");
        expect(anchors[1].innerHTML).toBe("Subsection");
        expect(anchors[2].href).toBe("http://localhost/#0");
        expect(anchors[2].innerHTML).toBe("Subsubsection");
        expect(anchors[3].href).toBe("http://localhost/#1");
        expect(anchors[3].innerHTML).toBe("Don't care at this point");
        expect(anchors[4].href).toBe("http://localhost/#2");
        expect(anchors[4].innerHTML).toBe("sure yes");
        expect(anchors[5].href).toBe("http://localhost/#tests");
        expect(anchors[5].innerHTML).toBe("tests");
    });
});
