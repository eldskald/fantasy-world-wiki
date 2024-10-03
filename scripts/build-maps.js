import fs from "fs";
import process from "process";

function readAssetsMapsFiles(mapsPath) {
    let files = fs.readdirSync(mapsPath);
    files = files.filter((file) => file.split(".").at(-1) === "json");
    const maps = {};
    files.forEach((file) => {
        maps[file.slice(0, -5)] = fs.readFileSync(mapsPath + file, {
            encoding: "utf8",
        });
    });
    return maps;
}

export function buildMaps(mapsPath, buildPath) {
    process.stdout.write("Building maps...");
    try {
        const maps = readAssetsMapsFiles(mapsPath);
        const data = "export default " + JSON.stringify(maps);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
