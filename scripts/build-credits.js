import fs from "fs";
import process from "process";
import settings from "../build/settings.js";

export function buildCredits(creditsPath, buildPath) {
    if (!settings.enableCreditsPage) {
        process.stdout.write(
            "Credits page disabled on project-settings.json. Not building.",
        );
        return;
    }
    process.stdout.write("Building credits page...");
    try {
        const data = fs.readFileSync(creditsPath, { encoding: "utf8" });
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
