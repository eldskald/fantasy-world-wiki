import { settings } from "./settings.js";
import search from "./search-data.js";

window.settings = settings;
window.search = {
    table: search,
    titles: Object.keys(search),
};
