import "../sass/main.scss";
import "@fontsource/inter";
import "@fontsource-variable/inter";

import { sellingPoints, latestJobs } from "./data";

const DEFAULT_INDEX = 0;
export const PAGE_LIMIT = 5;

export const storedIndex = localStorage.getItem("index")
    ? localStorage.getItem("index")
    : DEFAULT_INDEX;

export function getLatestJobsPages(paginationLimit, targetArray) {
    const pages = [];

    for (let i = 0; i < targetArray.length; i += paginationLimit) {
        const page = targetArray.slice(i, i + paginationLimit);
        pages.push(page);
    }

    return pages;
}

export function getSellingPointsPage(index, paginationLimit, targetArray) {
    const displayPage = targetArray.slice(index, index + paginationLimit);
    return displayPage;
}

export const sellingPointsPage = getSellingPointsPage(
    storedIndex,
    PAGE_LIMIT,
    sellingPoints
);
export const latestJobsPages = getLatestJobsPages(PAGE_LIMIT, latestJobs);
