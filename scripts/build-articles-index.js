import fs from "fs";
import process from "process";
import settings from "../build/settings.js";

function getArticleTitle(data, filename) {
    const start = data.search(/<h1>/g);
    const end = data.search(/<\/h1>/g);
    if (start === -1 || end === -1)
        throw new Error(`article ${filename} has no h1 element`);
    return data.substring(start + 4, end);
}

function getOrderedArticles(articlesPath) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    const articles = [];
    files.forEach((file) => {
        const data = fs.readFileSync(articlesPath + file, { encoding: "utf8" });
        articles.push({
            link: file.slice(0, -5),
            title: getArticleTitle(data, file),
        });
    });
    articles.sort((a, b) => (a.title > b.title ? 1 : -1));
    return articles;
}

function setupArticlesIndex(articlesPath) {
    let data = "";

    data += `<h1>${settings.labels.articlesIndex}</h1>\n`;

    const articles = getOrderedArticles(articlesPath);
    for (let i = 0; i < articles.length; i++) {
        if (i === 0) {
            data += `<h3>${articles[i].title[0].toUpperCase()}</h3>\n`;
            data += `<ul>\n`;
        } else if (
            articles[i].title[0].toUpperCase() !==
            articles[i - 1].title[0].toUpperCase()
        ) {
            data += `</ul>\n`;
            data += `<h3>${articles[i].title[0].toUpperCase()}</h3>\n`;
            data += `<ul>\n`;
        }
        data += `<li>\n`;
        data += `<a toarticle="${articles[i].link}">${articles[i].title}</a>\n`;
        data += `</li>\n`;
    }
    data += `</ul>\n`;

    return data;
}

export function buildArticlesIndex(articlesPath, buildPath) {
    process.stdout.write("Building articles index...");
    try {
        const data = setupArticlesIndex(articlesPath);
        fs.writeFileSync(buildPath, data);
        process.stdout.write("\x1b[32m Success \x1b[0m \n");
        process.exit(0);
    } catch (error) {
        process.stdout.write("\x1b[31m Failed \x1b[0m \n\n");
        console.error(error); // eslint-disable-line
        process.exit(1);
    }
}
