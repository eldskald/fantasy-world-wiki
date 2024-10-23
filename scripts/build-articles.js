import fs from "fs";
import process from "process";

function getArticleTitle(data, filename) {
    const start = data.search(/<h1>/g);
    const end = data.search(/<\/h1>/g);
    if (start === -1 || end === -1)
        throw new Error(`article ${filename} has no h1 element`);
    return data.substring(start + 4, end);
}

function readAssetsArticlesFiles(articlesPath) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    const articles = {};
    files.forEach((file) => {
        const data = fs.readFileSync(articlesPath + file, { encoding: "utf8" });
        articles[file.slice(0, -5)] = {
            title: getArticleTitle(data, file),
            data,
        };
    });
    return articles;
}

export function buildArticles(articlesPath, buildPath) {
    process.stdout.write("Building articles...");
    try {
        const articles = readAssetsArticlesFiles(articlesPath);
        const data = "export default " + JSON.stringify(articles);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
