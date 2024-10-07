import { beforeEach, describe, expect, test } from "@jest/globals";
import { changeSearchParam } from "../src/navigation/change-search-param.js";
import { moddedArticles as articles } from "./mocks/articles.js";
import fs from "fs";

describe("article on load", () => {
    beforeEach(async () => {
        document.body.innerHTML = fs.readFileSync("./index.html", {
            encoding: "utf8",
        });
        changeSearchParam("article", "article1");
        await import("./mocks/imports.js");
        await import("../src/main.js");
    });

    test("should load article on start", () => {
        const inner = document.getElementById("article-container-inner");
        const outer = document.getElementById("article-container-outer");
        const params = new URL(document.location.href).searchParams;
        expect(outer.getAttribute("data-hidden")).toBe("false");
        expect(inner.innerHTML).toBe(articles.article1);
        expect(params.get("article")).toBe("article1");
    });
});
