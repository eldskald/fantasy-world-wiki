/**
 * @jest-environment node
 */

import fs from "fs";
import process from "process";
import { jest, describe, beforeEach, expect, test } from "@jest/globals";
import settings from "../build/settings.js";
import { buildMapsIndex } from "../scripts/build-maps-index.js";

const mapsPath = "somedir/";
const buildPath = "mock/file.js";

const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const readdirSyncSpy = jest.spyOn(fs, "readdirSync");
const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

const writeSpy = jest
    .spyOn(process.stdout, "write")
    .mockImplementation(() => {});
const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("buildMapsIndex", () => {
    describe("when readdirSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation("");
            readdirSyncSpy.mockReturnValue(() => {
                throw "mock error";
            });
            writeFileSyncSpy.mockImplementation(() => {});
            buildMapsIndex(mapsPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building maps index...");
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
            readdirSyncSpy.mockReturnValue(["file.json"]);
            writeFileSyncSpy.mockImplementation(() => {});
            buildMapsIndex(mapsPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building maps index...");
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
                .mockReturnValueOnce('{"name": "mock"}')
                .mockReturnValueOnce('{"name": "some name"}')
                .mockReturnValueOnce('{"name": "yes"}')
                .mockReturnValueOnce('{"name": "no"}');
            readdirSyncSpy.mockReturnValue([
                "file.json",
                "nope.txt",
                "map.json",
                "cool.json",
                "last.json",
            ]);
            writeFileSyncSpy.mockImplementation((path, data) => {
                result.path = path;
                result.data = data;
            });
            expectedData = `<h1>${settings.labels.mapsIndex}</h1>
<h3>M</h3>
<ul>
<li>
<a tomap="file">mock</a>
</li>
</ul>
<h3>N</h3>
<ul>
<li>
<a tomap="last">no</a>
</li>
</ul>
<h3>S</h3>
<ul>
<li>
<a tomap="map">some name</a>
</li>
</ul>
<h3>Y</h3>
<ul>
<li>
<a tomap="cool">yes</a>
</li>
</ul>
`;
            buildMapsIndex(mapsPath, buildPath);
        });

        test("should generate data correctly", () => {
            expect(result.data).toBe(expectedData);
        });

        test("should write data to the target file", () => {
            expect(result.path).toBe(buildPath);
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building maps index...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[32m Success \x1b[0m \n",
            );
        });

        test("should exit with no errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(0);
        });
    });
});
