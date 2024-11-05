import fs from "fs";
import process from "process";

function getArticleTitle(data, filename) {
    const start = data.search(/<h1>/g);
    const end = data.search(/<\/h1>/g);
    if (start === -1 || end === -1)
        throw new Error(`article ${filename} has no h1 element`);
    return data.substring(start + 4, end);
}

function getArticles(articlesPath, table) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    files.forEach((file) => {
        const data = fs.readFileSync(articlesPath + file, { encoding: "utf8" });
        const link = file.slice(0, -5);
        const title = getArticleTitle(data, file);
        if (title in table) table[title].toarticle = link;
        else table[title] = { toarticle: link };
    });
}

function getMaps(mapsPath, table) {
    let files = fs.readdirSync(mapsPath);
    files = files.filter((file) => file.split(".").at(-1) === "json");
    files.forEach((file) => {
        const data = fs.readFileSync(mapsPath + file, { encoding: "utf8" });
        const link = file.slice(0, -5);
        const title = JSON.parse(data).name;
        if (title in table) table[title].tomap = link;
        else table[title] = { tomap: link };
    });
}

function setupData(articlesPath, mapsPath) {
    const table = {};
    getArticles(articlesPath, table);
    getMaps(mapsPath, table);
    return JSON.stringify(table);
}

export function buildSearch(articlesPath, mapsPath, buildPath) {
    process.stdout.write("Building search data...");
    try {
        const data = setupData(articlesPath, mapsPath);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
