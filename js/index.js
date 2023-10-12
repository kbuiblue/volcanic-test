import "../sass/main.scss";
import "@fontsource/inter";
import "@fontsource-variable/inter";

export const PAGE_LIMIT = 5;

export function debounce(func, delay) {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}
