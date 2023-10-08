import "../sass/main.scss";
import "@fontsource/inter";
import "@fontsource-variable/inter";

import { sellingPoints, latestJobs } from "./data";

export const PAGE_LIMIT = 5;

export function getLatestJobsPages(paginationLimit, targetArray) {
    const pages = [];

    for (let i = 0; i < targetArray.length; i += paginationLimit) {
        const page = targetArray.slice(i, i + paginationLimit);
        pages.push(page);
    }

    return pages;
}

export const latestJobsPages = getLatestJobsPages(PAGE_LIMIT, latestJobs);
