const imagesPath = "./assets/images/";

function generateCurvedText(wrapper, anchor, radius, pathId) {
    const r = Math.abs(radius);
    let d = "";
    if (radius > 0) {
        d = `M30 ${r * 2} A${r} ${r} 0 0 1 ${r * 2 + 30} ${r * 2}`;
    } else {
        d = `M30 0 A${r} ${r} 0 0 0 ${r * 2 + 30} 0`;
    }
    anchor.classList.add("pointer-events-auto");
    anchor.innerHTML = `
        <text class="fill-primary">
            <textPath
                xlink:href="#${pathId}"
                startOffset="50%"
                text-anchor="middle"
            >
                ${anchor.innerHTML}
            </textPath>
        </text>
    `;
    wrapper.innerHTML = `
        <svg
            width="${r * 2 + 60}"
            height="${r * 2}"
        >
            <path id="${pathId}" fill="transparent" d="${d}">
            </path>
            ${anchor.outerHTML}
        </svg>
    `;
}

export function setMap(data) {
    const mainContainer = document.getElementById("main-container");
    const container = document.getElementById("map-container");
    container.innerHTML = "";
    const img = document.createElement("img");
    img.src = imagesPath + data.image;
    img.alt = data.name;
    img.className = "h-full w-full absolute my-0";
    img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        mainContainer.style = `aspect-ratio: ${ratio}`;
    };
    container.appendChild(img);
    data.links.forEach((link, index) => {
        // Generate the link
        const a = document.createElement("a");
        if (link.size === "large")
            a.className = `
                text-3xl lg:text-5xl svg-shadow font-fancy font-bold absolute
                no-underline hover:hover-svg-shadow focus:hover-svg-shadow
            `;
        else if (link.size === "medium")
            a.className = `
                text-2xl lg:text-3xl svg-shadow font-fancy font-bold absolute
                no-underline hover:hover-svg-shadow focus:hover-svg-shadow
            `;
        else if (link.size === "small")
            a.className = `
                text-lg lg:text-xl svg-shadow-sm font-sans font-bold absolute
                no-underline hover:hover-svg-shadow-sm focus:hover-svg-shadow-sm
            `;
        if (link.toarticle) a.setAttribute("toarticle", link.toarticle);
        if (link.tomap) a.setAttribute("tomap", link.tomap);
        a.innerHTML = link.name;

        // Generate the position and angle
        let style = `top: ${link.pos.y}; left: ${link.pos.x};`;
        style += " transform: translate(-50%, -50%);";
        if (link.rotation) {
            style = style.slice(0, -1);
            style += ` rotate(${link.rotation}deg);`;
        }

        // If the link is curved, generate the SVG and add the anchor to it
        // If not, add the anchor directly to the map
        if (link.radius) {
            const wrapper = document.createElement("div");
            wrapper.className = "pointer-events-none";
            generateCurvedText(
                wrapper,
                a,
                link.radius,
                `map-link-${index}-curve`,
            );
            wrapper.style = `position: absolute; ${style}`;
            container.appendChild(wrapper);
        } else {
            a.style = style;
            container.appendChild(a);
        }
    });
}

export function getMapContainer() {
    const container = document.createElement("div");
    container.id = "map-container";
    container.className = "h-full w-full";
    return container;
}
