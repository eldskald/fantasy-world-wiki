/**
 * @jest-environment node
 */

import fs from "fs";
import process from "process";
import { jest, describe, beforeEach, expect, test } from "@jest/globals";
import settings from "../build/settings.js";
import { buildArticlesIndex } from "../scripts/build-articles-index.js";

const articlesPath = "somedir/";
const buildPath = "mock/file.js";

const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const readdirSyncSpy = jest.spyOn(fs, "readdirSync");
const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

const writeSpy = jest
    .spyOn(process.stdout, "write")
    .mockImplementation(() => {});
const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("buildArticlesIndex", () => {
    describe("when readdirSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation("");
            readdirSyncSpy.mockReturnValue(() => {
                throw "mock error";
            });
            writeFileSyncSpy.mockImplementation(() => {});
            buildArticlesIndex(articlesPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles index...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[31m Failed \x1b[0m \n\n",
            );
            expect(errorSpy).toHaveBeenCalled();
        });

        test("should exit with errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(1);
        });
    });

    describe("when readFileSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation(() => {
                throw "mock error";
            });
            readdirSyncSpy.mockReturnValue(["file.html"]);
            writeFileSyncSpy.mockImplementation(() => {});
            buildArticlesIndex(articlesPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles index...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[31m Failed \x1b[0m \n\n",
            );
            expect(errorSpy).toHaveBeenCalled();
        });

        test("should exit with errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(1);
        });
    });

    describe("when successful", () => {
        let result = { path: "", data: {} };
        let expectedData = "";

        beforeEach(() => {
            readFileSyncSpy
                .mockReturnValueOnce("<h1>title</h1>data")
                .mockReturnValueOnce("<h1>mock</h1>data")
                .mockReturnValueOnce("<h1>text</h1>data")
                .mockReturnValueOnce("<h1>crazy</h1>data");
            readdirSyncSpy.mockReturnValue([
                "file.html",
                "nope.txt",
                "other.html",
                "more.html",
                "last.html",
            ]);
            writeFileSyncSpy.mockImplementation((path, data) => {
                result.path = path;
                result.data = data;
            });
            expectedData = `<h1>${settings.labels.articlesIndex}</h1>
<h3>C</h3>
<ul>
<li>
<a toarticle="last">crazy</a>
</li>
</ul>
<h3>M</h3>
<ul>
<li>
<a toarticle="other">mock</a>
</li>
</ul>
<h3>T</h3>
<ul>
<li>
<a toarticle="more">text</a>
</li>
<li>
<a toarticle="file">title</a>
</li>
</ul>
`;
            buildArticlesIndex(articlesPath, buildPath);
        });

        test("should generate data correctly", () => {
            expect(result.data).toBe(expectedData);
        });

        test("should write data to the target file", () => {
            expect(result.path).toBe(buildPath);
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles index...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[32m Success \x1b[0m \n",
            );
        });

        test("should exit with no errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(0);
        });
    });
});
