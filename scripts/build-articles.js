import fs from "fs";
import process from "process";

function readAssetsArticlesFiles(articlesPath) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    const articles = {};
    files.forEach((file) => {
        articles[file.slice(0, -5)] = fs.readFileSync(articlesPath + file, {
            encoding: "utf8",
        });
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
