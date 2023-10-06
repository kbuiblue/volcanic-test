import $ from "jquery";
import globals from "./sass/_global.scss?inline";
import { sellingPoints } from "./js";

$(function () {
    const tabs = $(".header-content a");
    const searchJobBtn = $(".search-form button");

    const heroCarousel = $(".hero-carousel");
    const heroCarouselList = $(".hero-carousel ul");
    const carouselImages = $(".image svg");

    tabs.on("click", function (e) {
        e.preventDefault();

        const sectionId = $(this).attr("href");

        window.location.hash = sectionId;
    });

    searchJobBtn.on("click", function (e) {
        e.preventDefault();
    });

    function renderHeroCarousel() {
        const nextPageEl = document.createElement("img");
        const previousPageEl = document.createElement("img");

        previousPageEl.classList = "previous-page";
        previousPageEl.src = "./svg/carousel-arrow-left.svg";
        heroCarousel.append(previousPageEl);

        sellingPoints.forEach((sellingPoint) => {
            const newSellingPointEl = document.createElement("li");
            const sellingPointTextEl = document.createElement("p");
            const sellingPointImage = document.createElement("div");
            const imageContainerContainer = document.createElement("div");

            imageContainerContainer.className = "image-container";
            sellingPointImage.className = "image";
            sellingPointTextEl.innerText = sellingPoint;
            newSellingPointEl.append(sellingPointTextEl);
            heroCarouselList.append(newSellingPointEl);

            sellingPointImage.innerHTML = 
            `<svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4V24Z" fill="none"
                    stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
                <path d="M24 24C24 29.5228 28.4772 34 34 34C39.5228 34 44 29.5228 44 24H24Z" fill="none"
                    stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
                <path d="M24 24C24 18.4772 19.5228 14 14 14C8.47715 14 4 18.4772 4 24H24Z" fill="none"
                    stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
                <path d="M24 24C18.4772 24 14 28.4772 14 34C14 39.5228 18.4772 44 24 44V24Z" fill="none"
                    stroke="#ffffff" stroke-width="2" stroke-linejoin="round" />
            </svg>`;
            imageContainerContainer.append(sellingPointImage);
            newSellingPointEl.append(imageContainerContainer);
        });

        nextPageEl.classList = "next-page";
        nextPageEl.src = "./svg/carousel-arrow-right.svg";
        heroCarousel.append(nextPageEl);
    }

    renderHeroCarousel();
});
