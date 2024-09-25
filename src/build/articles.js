import * as fs from "fs";

const articlesPath = "assets/articles/";
const buildTarget = "build/articles.js";

function readAssetsArticlesFiles() {
    console.log("Reading articles..."); // eslint-disable-line
    try {
        const files = fs
            .readdirSync(articlesPath)
            .filter((file) => file.split(".").at(-1) === "html");
        const articles = [];
        files.forEach((file) => {
            articles.push({
                name: file.slice(0, -5),
                content: fs.readFileSync(articlesPath + file, {
                    encoding: "utf8",
                }),
            });
        });
        console.log("Articles read successfully."); // eslint-disable-line
        return articles;
    } catch (error) {
        console.log(error); // eslint-disable-line
    }
}

function saveArticles(articles) {
    console.log("Building articles..."); // eslint-disable-line
    try {
        const data = "export default " + JSON.stringify(articles);
        fs.writeFileSync(buildTarget, data);
        console.log("Build successful."); // eslint-disable-line
    } catch (error) {
        console.log(error); // eslint-disable-line
    }
}

saveArticles(readAssetsArticlesFiles());
