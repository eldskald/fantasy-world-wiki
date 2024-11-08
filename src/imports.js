import settings from "../build/settings.js";
import search from "../build/search-data.js";

window.settings = settings;
window.search = {
    table: search,
    titles: Object.keys(search),
};
