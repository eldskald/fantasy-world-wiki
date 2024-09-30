export function changeSearchParam(param, value) {
    const url = new URL(document.location.href);
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
    window.history.pushState(null, "", url.toString());
}
