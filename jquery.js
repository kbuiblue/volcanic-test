import $ from "jquery";
import {
    storedIndex,
    PAGE_LIMIT,
    sellingPointsPage,
    getSellingPointsPage,
    latestJobsPages,
    getLatestJobsPages,
} from "./js/index";
import { sellingPoints, latestJobs } from "./js/data";

$(function () {
    const tabs = $(".header-content a");
    const searchJobBtn = $(".search-form button");

    const heroCarousel = $(".hero-carousel");
    const heroCarouselList = $(".hero-carousel ul");

    tabs.on("click", function (e) {
        e.preventDefault();

        const sectionId = $(this).attr("href");

        window.location.hash = sectionId;
    });

    searchJobBtn.on("click", function (e) {
        e.preventDefault();
    });

    function renderInitialHeroCarousel() {
        const previousPageEl = createImageElement(
            "./svg/carousel-arrow-left.svg",
            "previous-page"
        );
        const nextPageEl = createImageElement(
            "./svg/carousel-arrow-right.svg",
            "next-page"
        );

        renderCarousel(sellingPointsPage);
        heroCarousel.append(previousPageEl);
        heroCarousel.append(nextPageEl);
    }

    function renderCarousel(carouselPage) {
        carouselPage.forEach((sellingPoint) => {
            const newSellingPointEl = $("<li></li>");
            const sellingPointTextEl = $("<p></p>");
            const sellingPointImage = createSellingPointImage();

            sellingPointTextEl.text(sellingPoint);
            newSellingPointEl.append(sellingPointTextEl);
            newSellingPointEl.append(sellingPointImage);
            heroCarouselList.append(newSellingPointEl);
        });
        heroCarouselList.addClass("slide-in");
    }

    function createImageElement(src, className) {
        const imageEl = $("<img></img>");
        imageEl.attr("src", src);
        imageEl.addClass(className);
        return imageEl;
    }

    function createSellingPointImage() {
        const imageContainerContainer = $("<div></div>");
        const sellingPointImage = $("<div></div>");

        imageContainerContainer.addClass("image-container");
        sellingPointImage.addClass("image");
        sellingPointImage.html(`
        <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4V24Z" fill="none"
                stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
            <path d="M24 24C24 29.5228 28.4772 34 34 34C39.5228 34 44 29.5228 44 24H24Z" fill="none"
                stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
            <path d="M24 24C24 18.4772 19.5228 14 14 14C8.47715 14 4 18.4772 4 24H24Z" fill="none"
                stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
            <path d="M24 24C18.4772 24 14 28.4772 14 34C14 39.5228 18.4772 44 24 44V24Z" fill="none"
                stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
        </svg>`);
        imageContainerContainer.append(sellingPointImage);
        return imageContainerContainer;
    }

    renderInitialHeroCarousel();

    const heroCarouselButtons = $(
        ".hero-carousel .previous-page, .hero-carousel .next-page"
    );
    const previousPage = $(".hero-carousel .previous-page");
    const nextPage = $(".hero-carousel .next-page");

    heroCarouselButtons.on("click", function (e) {
        const oldSellingPoints = $(".hero-carousel ul li");
        const storedIndex = localStorage.getItem("index")
            ? parseInt(localStorage.getItem("index"))
            : 0;
        let newIndex;

        if ($(this).hasClass("previous-page") && storedIndex > 0) {
            newIndex = storedIndex - 1;
            localStorage.setItem("index", newIndex);
            oldSellingPoints.addClass("slide-out");
            updateCarousel(newIndex, oldSellingPoints);
        } else if (
            $(this).hasClass("next-page") &&
            storedIndex + PAGE_LIMIT < sellingPoints.length
        ) {
            newIndex = storedIndex + 1;
            localStorage.setItem("index", newIndex);
            oldSellingPoints.addClass("slide-out");
            updateCarousel(newIndex, oldSellingPoints);
        }

        updateDisabledPageButtons(newIndex, PAGE_LIMIT, sellingPoints)
    });

    function updateCarousel(index, oldSellingPoints) {
        const newPage = getSellingPointsPage(index, PAGE_LIMIT, sellingPoints);
        
        oldSellingPoints.on("animationend", function() {
            oldSellingPoints.remove();

            renderCarousel(newPage);
        })
    }

    function updateDisabledPageButtons(newIndex, PAGE_LIMIT, sellingPoints) {
        if (newIndex === 0) {
            previousPage.addClass("disabled");
        } else {
            previousPage.removeClass("disabled");
        }
    
        if (newIndex + PAGE_LIMIT >= sellingPoints.length) {
            nextPage.addClass("disabled");
        } else {
            nextPage.removeClass("disabled");
        }
    }
});
