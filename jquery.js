import $ from "jquery";

$(function () {
    const tabs = $("header-content a");

    tabs.on("click", function (e) {
        e.preventDefault();

        const sectionId = $(this).attr("href");

        window.location.hash = sectionId;
    });
});
