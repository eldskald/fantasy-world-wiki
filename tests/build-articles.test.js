/**
 * @jest-environment node
 */

import fs from "fs";
import process from "process";
import { jest, describe, beforeEach, expect, test } from "@jest/globals";
import { buildArticles } from "../scripts/build-articles.js";

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

describe("buildArticles", () => {
    describe("when readdirSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation("");
            readdirSyncSpy.mockReturnValue(() => {
                throw "mock error";
            });
            writeFileSyncSpy.mockImplementation(() => {});
            buildArticles(articlesPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles...");
            expect(writeSpy).toHaveBeenCalledWith("\x1b[31m Failed\n\n");
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
            buildArticles(articlesPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles...");
            expect(writeSpy).toHaveBeenCalledWith("\x1b[31m Failed\n\n");
            expect(errorSpy).toHaveBeenCalled();
        });

        test("should exit with errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(1);
        });
    });

    describe("when successful", () => {
        let result = { path: "", data: "" };
        let expectedData = "";

        beforeEach(() => {
            readFileSyncSpy.mockReturnValue("");
            readdirSyncSpy.mockReturnValue([
                "file.html",
                "nope.txt",
                "other.html",
            ]);
            writeFileSyncSpy.mockImplementation((path, data) => {
                result.path = path;
                result.data = data;
            });
            expectedData =
                "export default " + JSON.stringify({ file: "", other: "" });
            buildArticles(articlesPath, buildPath);
        });

        test("should generate data correctly", () => {
            expect(result.data).toBe(expectedData);
        });

        test("should write data to the target file", () => {
            expect(result.path).toBe(buildPath);
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles...");
            expect(writeSpy).toHaveBeenCalledWith("\x1b[32m Success\n");
        });

        test("should exit with no errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(0);
        });
    });
});
