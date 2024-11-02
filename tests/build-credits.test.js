/**
 * @jest-environment node
 */

import fs from "fs";
import process from "process";
import {
    jest,
    describe,
    beforeEach,
    expect,
    test,
    afterEach,
} from "@jest/globals";
import { buildCredits } from "../scripts/build-credits.js";
import settings from "../build/settings.js";

jest.mock("../build/settings.js", { enableCreditsPage: true });

const creditsPath = "somedir/credits.html";
const buildPath = "mock/file.html";

const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

const writeSpy = jest
    .spyOn(process.stdout, "write")
    .mockImplementation(() => {});
const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("buildSettings", () => {
    describe("when credits are disabled on project settings", () => {
        beforeEach(() => {
            settings.enableCreditsPage = false;
            buildCredits(creditsPath, buildPath);
        });

        afterEach(() => {
            settings.enableCreditsPage = true;
        });

        test("should not read any file", () => {
            expect(readFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith(
                "Credits page disabled on project-settings.json. Not building.",
            );
        });
    });

    describe("when readFileSync throws an error", () => {
        beforeEach(() => {
            readFileSyncSpy.mockImplementation(() => {
                throw "mock error";
            });
            writeFileSyncSpy.mockImplementation(() => {});
            buildCredits(creditsPath, buildPath);
        });

        test("should not write data to any file", () => {
            expect(writeFileSyncSpy).not.toHaveBeenCalled();
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building credits page...");
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
        let result = { path: "", data: "" };
        let expectedData = "";

        beforeEach(() => {
            readFileSyncSpy.mockReturnValue("credits");
            writeFileSyncSpy.mockImplementation((path, data) => {
                result.path = path;
                result.data = data;
            });
            expectedData = "credits";
            buildCredits(creditsPath, buildPath);
        });

        test("should generate data correctly", () => {
            expect(result.data).toBe(expectedData);
        });

        test("should write data to the target file", () => {
            expect(result.path).toBe(buildPath);
        });

        test("should log the process correctly", () => {
            expect(writeSpy).toHaveBeenCalledWith("Building credits page...");
            expect(writeSpy).toHaveBeenCalledWith(
                "\x1b[32m Success \x1b[0m \n",
            );
        });

        test("should exit with no errors", () => {
            expect(exitSpy).toHaveBeenCalledWith(0);
        });
    });
});
