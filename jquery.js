import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import { PAGE_LIMIT, debounce } from "./js/index";
import { sellingPoints, latestJobs } from "./js/data";

const tabs = $(".header-content a");
const searchJobBtn = $(".search-form button");

const heroCarousel = $(".hero-carousel");
const heroCarouselList = $(".hero-carousel ul");

$(function () {
    tabs.on("click", function (e) {
        e.preventDefault();
        const sectionId = $(this).attr("href");
        window.location.hash = sectionId;
    });

    searchJobBtn.on("click", function (e) {
        e.preventDefault();
    });

    $(window).on(
        "scroll",
        debounce(function () {
            const targetSection = window.location.hash
                ? $(window.location.hash)
                : $("#home");
            const distanceThreshold = 200;

            const scrollTop = $(window).scrollTop();
            const sectionOffset = targetSection.offset().top;
            const distance = Math.abs(scrollTop - sectionOffset);

            if (distance > distanceThreshold) {
                const url = window.location.href.split("#")[0];
                history.replaceState(null, null, url);
            }
        }, 1000)
    );
});

$(function () {
    function renderInitialHeroCarousel() {
        const previousPageEl = createImageElement(
            "./svg/carousel-arrow-left.svg",
            "previous-page"
        );
        const nextPageEl = createImageElement(
            "./svg/carousel-arrow-right.svg",
            "next-page"
        );

        renderCarousel();
        heroCarousel.append(previousPageEl);
        heroCarousel.append(nextPageEl);
    }

    function createImageElement(src, className) {
        const imageEl = $("<img></img>");
        imageEl.attr("src", src);
        imageEl.addClass(className);
        return imageEl;
    }

    function renderCarousel() {
        sellingPoints.forEach((sellingPoint) => {
            const newSellingPointEl = $("<li></li>");
            const sellingPointTextEl = $("<p></p>");
            const sellingPointImage = createSellingPointImage();

            sellingPointTextEl.text(sellingPoint);
            newSellingPointEl.append(sellingPointTextEl);
            newSellingPointEl.append(sellingPointImage);
            heroCarouselList.append(newSellingPointEl);
        });
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

    function initializeHeroCarousel() {
        heroCarouselList.slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: PAGE_LIMIT,
            slidesToScroll: PAGE_LIMIT,
            prevArrow: $(".hero-carousel .previous-page"),
            nextArrow: $(".hero-carousel .next-page"),
            responsive: [
                {
                    breakpoint: 490,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                    },
                },
            ],
        });
    }

    initializeHeroCarousel();

    heroCarouselList.on("afterChange", function() {
        heroCarouselList.slick("getSlick").initDotEvents();
    })
});

$(function () {
    const jobCarouselList = $(".jobs-carousel");

    latestJobs.forEach((job) => {
        const newJobEl = $("<li></li>");
        const jobTitleEl = $("<h3></h3>");
        const jobSalaryLocationEl = $("<h4></h4>");
        const jobLocationEl = $("<span></span>");
        const jobHeadingsContainer = $("<div></div>");

        const jobDescriptionEl = $("<p></p>");
        const jobButtonContainer = $("<div></div>");
        const jobApplyButtonEl = $("<button></button>");

        const jobElementsArray = [
            jobHeadingsContainer,
            jobDescriptionEl,
            jobButtonContainer,
        ];

        jobTitleEl.text(job.title);
        jobLocationEl.text(job.location);
        jobLocationEl.addClass("job-location");

        jobSalaryLocationEl.text(`${job.salaryRange} | `);
        jobSalaryLocationEl.append(jobLocationEl);
        jobHeadingsContainer.append(jobTitleEl, jobSalaryLocationEl);
        jobHeadingsContainer.addClass("job-headings");

        jobDescriptionEl.text(`${job.description.substring(0, 150)}...`);
        jobApplyButtonEl.text("Apply");
        jobApplyButtonEl.addClass("secondary");

        jobButtonContainer.append(jobApplyButtonEl);
        jobButtonContainer.addClass("button-container");

        jobElementsArray.forEach((element) => {
            newJobEl.append(element);
        });

        jobCarouselList.append(newJobEl);
    });

    function initializeJobsCarousel() {
        jobCarouselList.slick({
            dots: true,
            infinite: false,
            speed: 300,
            prevArrow: false,
            nextArrow: false,
            slidesToShow: PAGE_LIMIT,
            slidesToScroll: PAGE_LIMIT,
            responsive: [
                {
                    breakpoint: 479,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                    },
                },
            ],
        });
    }

    initializeJobsCarousel();

    jobCarouselList.on("afterChange", function() {
        jobCarouselList.slick("getSlick").initDotEvents();
    })
});

$(function () {
    const header = $("header");
    const menuButton = $(".header-content nav .menu-button");
    const logoButton = $(".logo-container a")
    let menuOpen = false;

    menuButton.on("click", function () {
        menuOpen = menuOpen ? false : true;

        if(menuOpen) {
            header.addClass("open");
            menuButton.addClass("open");
        } else {
            header.removeClass("open");
            menuButton.removeClass("open");
        }
    })

    logoButton.on("click", function () {
        menuOpen = false;
        header.removeClass("open");
        menuButton.removeClass("open");
    })
})

// $(function () {
//     const latestInsightsList = $(".latest-insights .image-gallery");

//     latestInsightsList.forEach((li) => {
//         li.addEventListener("click", () => {
//             li.querySelector(".insight-content").addClass("show-content");
//         });
//     });
// });
