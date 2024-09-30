import data from "../../build/articles.js";

// This is just so we centralize how we access built data from the articles in
// the assets folder. We import this data everywhere we need it and in case we
// change the build process, we can just change here later
export const articles = data;
