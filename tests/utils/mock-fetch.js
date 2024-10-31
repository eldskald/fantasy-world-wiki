import { jest } from "@jest/globals";
import { articles } from "../mocks/articles.js";
import { maps } from "../mocks/maps.js";

export function mockFetch() {
    window.fetch = jest.fn((url) => {
        switch (url) {
            case "/assets/articles/article1.html":
                return Promise.resolve({
                    ok: true,
                    text: () => Promise.resolve(articles.article1.data),
                });
            case "/assets/articles/article2.html":
                return Promise.resolve({
                    ok: true,
                    text: () => Promise.resolve(articles.article2.data),
                });
            case "/assets/maps/map1.json":
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(maps.map1),
                });
            case "/assets/maps/map2.json":
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(maps.map2),
                });
            default:
                return Promise.resolve({
                    ok: false,
                    status: 404,
                    statusText: "File not found.",
                });
        }
    });
}
