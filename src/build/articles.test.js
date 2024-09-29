import fs from "fs";
import process from "process";
import { jest, describe, beforeEach, expect, test } from "@jest/globals";
import { readAssetsArticlesFiles, buildArticles } from "./articles.js";

const articlesPath = "somedir/";
const buildPath = "mock/file.js";

const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const readdirSyncSpy = jest.spyOn(fs, "readdirSync");
const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
const writeSpy = jest
    .spyOn(process.stdout, "write")
    .mockImplementation(() => {});
const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("readAssetsArticlesFiles", () => {
    let result;

    describe("when all files are html files", () => {
        const files = ["file1.html", "file2.html", "file3.html"];

        beforeEach(() => {
            readFileSyncSpy.mockReturnValue("");
            readdirSyncSpy.mockReturnValue(files);
            result = readAssetsArticlesFiles(articlesPath);
        });

        test("should read correct paths", () => {
            expect(readdirSyncSpy).toHaveBeenCalledWith(articlesPath);
            files.forEach((filename) => {
                expect(readFileSyncSpy).toHaveBeenCalledWith(
                    articlesPath + filename,
                    { encoding: "utf8" },
                );
            });
        });

        test("should return all files", () => {
            expect(result).toEqual([
                { name: "file1", content: "" },
                { name: "file2", content: "" },
                { name: "file3", content: "" },
            ]);
        });
    });

    describe("when there is one non-html file", () => {
        const files = ["file1.html", "file2.html", "file3.txt", "file4.html"];

        beforeEach(() => {
            jest.spyOn(fs, "readFileSync").mockReturnValue("");
            jest.spyOn(fs, "readdirSync").mockReturnValue(files);
            result = readAssetsArticlesFiles(articlesPath);
        });

        test("should read correct paths", () => {
            expect(readdirSyncSpy).toHaveBeenCalledWith(articlesPath);
            expect(readFileSyncSpy).toHaveBeenCalledWith(
                articlesPath + "file1.html",
                { encoding: "utf8" },
            );
            expect(readFileSyncSpy).toHaveBeenCalledWith(
                articlesPath + "file2.html",
                { encoding: "utf8" },
            );
            expect(readFileSyncSpy).toHaveBeenCalledWith(
                articlesPath + "file4.html",
                { encoding: "utf8" },
            );
        });

        test("should return only html files", () => {
            expect(result).toEqual([
                { name: "file1", content: "" },
                { name: "file2", content: "" },
                { name: "file4", content: "" },
            ]);
        });
    });
});

describe("buildArticles", () => {
    describe("when successful", () => {
        beforeEach(() => {
            readFileSyncSpy.mockReturnValue("");
            readdirSyncSpy.mockReturnValue(["file.html"]);
            writeFileSyncSpy.mockImplementation(() => {});
            buildArticles(articlesPath, buildPath);
        });

        test("should write data to the target file", () => {
            expect(writeFileSyncSpy).toHaveBeenCalledWith(
                buildPath,
                "export default " +
                    JSON.stringify([{ name: "file", content: "" }]),
            );
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building articles...");
            expect(writeSpy).toHaveBeenCalledWith("\x1b[32m Success\n");
        });
    });

    describe("when an error is thrown", () => {
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
            expect(errorSpy).toHaveBeenCalledWith("mock error");
        });
    });
});
