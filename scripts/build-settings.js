import fs from "fs";
import process from "process";

function readProjectSettings(settingsPath) {
    return JSON.parse(fs.readFileSync(settingsPath), { encoding: "utf8" });
}

export function buildSettings(settingsPath, buildPath) {
    process.stdout.write("Building settings...");
    try {
        const settings = readProjectSettings(settingsPath);
        settings.paths = {
            articles: (process.env.REPO_NAME || "") + "/assets/articles/",
        };
        const data = "export default " + JSON.stringify(settings);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
