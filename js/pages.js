function loadFragment(targetId, path) {
    return fetch(path)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                document.getElementById(targetId).innerHTML = data;
            });
}

function relativizeSharedLinks() {
    document.querySelectorAll("[data-relative-link]").forEach(function (link) {
        var href = link.getAttribute("href");
        if (!href || href.startsWith("../") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
            return;
        }
        link.setAttribute("href", "../" + href);
    });
}

function markActiveNavigation() {
    var currentPage = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(function (link) {
        if (link.dataset.nav === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function hydrateFooterYear() {
    var yearNode = document.getElementById("current-year");
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        loadFragment("header", "header.html"),
        loadFragment("footer", "footer.html")
    ]).then(function () {
        relativizeSharedLinks();
        markActiveNavigation();
        hydrateFooterYear();
    });
});
