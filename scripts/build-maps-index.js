import fs from "fs";
import process from "process";
import settings from "../build/settings.js";

function getOrderedMaps(mapsPath) {
    let files = fs.readdirSync(mapsPath);
    files = files.filter((file) => file.split(".").at(-1) === "json");
    const maps = [];
    files.forEach((file) => {
        const data = JSON.parse(
            fs.readFileSync(mapsPath + file, { encoding: "utf8" }),
        );
        maps.push({
            link: file.slice(0, -5),
            title: data.name,
        });
    });
    maps.sort((a, b) => (a.title > b.title ? 1 : -1));
    return maps;
}

function setupMapsIndex(mapsPath) {
    let data = "";

    data += `<h1>${settings.labels.mapsIndex}</h1>\n`;

    const maps = getOrderedMaps(mapsPath);
    for (let i = 0; i < maps.length; i++) {
        if (i === 0) {
            data += `<h3>${maps[i].title[0].toUpperCase()}</h3>\n`;
            data += `<ul>\n`;
        } else if (
            maps[i].title[0].toUpperCase() !==
            maps[i - 1].title[0].toUpperCase()
        ) {
            data += `</ul>\n`;
            data += `<h3>${maps[i].title[0].toUpperCase()}</h3>\n`;
            data += `<ul>\n`;
        }
        data += `<li>\n`;
        data += `<a tomap="${maps[i].link}">${maps[i].title}</a>\n`;
        data += `</li>\n`;
    }
    data += `</ul>\n`;

    return data;
}

export function buildMapsIndex(mapsPath, buildPath) {
    process.stdout.write("Building maps index...");
    try {
        const data = setupMapsIndex(mapsPath);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
