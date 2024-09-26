function changeParam(url, param, value) {
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
}

export default function changeState(update) {
    const url = new URL(window.location.href);
    Object.keys(update).forEach((param) => {
        changeParam(url, param, update[param]);
    });
    window.history.pushState(null, "", url.toString());
}
