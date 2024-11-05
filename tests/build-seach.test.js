/**
 * @jest-environment node
 */

import fs from "fs";
import process from "process";
import { jest, describe, beforeEach, expect, test } from "@jest/globals";
import { buildSearch } from "../scripts/build-search.js";

const articlesPath = "somedir/";
const mapsPath = "otherdir/";
const buildPath = "mock/file.js";

const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const readdirSyncSpy = jest.spyOn(fs, "readdirSync");
const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

const writeSpy = jest
    .spyOn(process.stdout, "write")
    .mockImplementation(() => {});
const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("buildSearch", () => {
    describe("when readdirSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation("");
            readdirSyncSpy.mockReturnValue(() => {
                throw "mock error";
            });
            writeFileSyncSpy.mockImplementation(() => {});
            buildSearch(articlesPath, mapsPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building search data...");
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
            buildSearch(articlesPath, mapsPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building search data...");
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
                .mockReturnValueOnce("<h1>text</h1>data")
                .mockReturnValueOnce('{"name": "mock"}')
                .mockReturnValueOnce('{"name": "title"}');
            readdirSyncSpy
                .mockReturnValueOnce(["file.html", "nope.txt", "other.html"])
                .mockReturnValueOnce([
                    "firstmap.json",
                    "nope.txt",
                    "lastmap.json",
                ]);
            writeFileSyncSpy.mockImplementation((path, data) => {
                result.path = path;
                result.data = data;
            });
            expectedData =
                '{"title":{"toarticle":"file","tomap":"lastmap"},"text":{"toarticle":"other"},"mock":{"tomap":"firstmap"}}';
            buildSearch(articlesPath, mapsPath, buildPath);
        });

        test("should generate data correctly", () => {
            expect(result.data).toBe(expectedData);
        });

        test("should write data to the target file", () => {
            expect(result.path).toBe(buildPath);
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building search data...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[32m Success \x1b[0m \n",
            );
        });

        test("should exit with no errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(0);
        });
    });
});
