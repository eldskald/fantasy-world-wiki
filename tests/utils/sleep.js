export function sleep(time) {
    return new Promise((r) => setTimeout(r, time));
}
