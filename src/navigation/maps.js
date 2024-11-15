import { setAnchors } from "../components/anchor.js";
import { setMap } from "../components/map-container.js";

let current = "";

export async function detectMap() {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById("map-container");
    const query = params.get("map") || window.settings.defaultMap;

    if (query === current) return;

    current = query;
    container.innerHTML = `<p>${window.settings.labels.loading}</p>`;
    try {
        const res = await fetch(`${window.settings.paths.maps}${query}.json`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.statusText,
            };
        }
        setMap(await res.json());
        setAnchors(container.querySelectorAll("a"));
    } catch (err) {
        container.innerHTML = "";
        const inner = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        inner.className = "m-4";
        h3.innerHTML = err.status;
        p.innerHTML = err.message;
        inner.appendChild(h3);
        inner.appendChild(p);
        container.appendChild(inner);
    }
}
