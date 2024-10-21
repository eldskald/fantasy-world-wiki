export function changeSearchParam(state) {
    const url = new URL(document.location.href);
    url.hash = "";
    Object.keys(state).forEach((key) => {
        if (state[key]) {
            url.searchParams.set(key, state[key]);
        } else {
            url.searchParams.delete(key);
        }
    });
    window.history.pushState({}, "", url.href);
}
